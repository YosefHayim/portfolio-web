#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_FILE="${1:-"$ROOT_DIR/server/.env"}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing env file: $ENV_FILE"
  echo "Copy server/.env.example to server/.env and fill values."
  exit 1
fi

# shellcheck disable=SC1090
source "$ENV_FILE"

required=(
  AWS_REGION
  DOMAIN_ROOT
  API_SUBDOMAIN
  HOSTED_ZONE_ID
  INSTANCE_NAME
  INSTANCE_TYPE
  ARCH
  SUBNET_ID
  KEY_NAME
)

for key in "${required[@]}"; do
  if [[ -z "${!key:-}" ]]; then
    echo "Missing required env: $key"
    exit 1
  fi
done

AWS_ARGS=(--region "$AWS_REGION")
if [[ -n "${AWS_PROFILE:-}" ]]; then
  AWS_ARGS+=(--profile "$AWS_PROFILE")
fi

if [[ -z "${AMI_ID:-}" ]]; then
  if [[ "$ARCH" == "arm64" ]]; then
    ami_param="/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-arm64"
  else
    ami_param="/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64"
  fi
  AMI_ID="$(aws "${AWS_ARGS[@]}" ssm get-parameter \
    --name "$ami_param" \
    --query 'Parameter.Value' \
    --output text)"
fi

SG_ID="${SECURITY_GROUP_ID:-}"
if [[ -z "$SG_ID" ]]; then
  if [[ -z "${VPC_ID:-}" ]]; then
    echo "SECURITY_GROUP_ID or VPC_ID must be provided."
    exit 1
  fi
  SG_ID="$(aws "${AWS_ARGS[@]}" ec2 create-security-group \
    --group-name "${INSTANCE_NAME}-sg" \
    --description "Security group for ${INSTANCE_NAME}" \
    --vpc-id "$VPC_ID" \
    --query 'GroupId' \
    --output text)"

  aws "${AWS_ARGS[@]}" ec2 authorize-security-group-ingress \
    --group-id "$SG_ID" \
    --ip-permissions \
    "IpProtocol=tcp,FromPort=22,ToPort=22,IpRanges=[{CidrIp=${SSH_CIDR:-0.0.0.0/0},Description=SSH}]" \
    "IpProtocol=tcp,FromPort=80,ToPort=80,IpRanges=[{CidrIp=0.0.0.0/0,Description=HTTP}]" \
    "IpProtocol=tcp,FromPort=443,ToPort=443,IpRanges=[{CidrIp=0.0.0.0/0,Description=HTTPS}]"
fi

INSTANCE_ID="$(aws "${AWS_ARGS[@]}" ec2 run-instances \
  --image-id "$AMI_ID" \
  --instance-type "$INSTANCE_TYPE" \
  --key-name "$KEY_NAME" \
  --subnet-id "$SUBNET_ID" \
  --security-group-ids "$SG_ID" \
  --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=${INSTANCE_NAME}}]" \
  --query 'Instances[0].InstanceId' \
  --output text)"

aws "${AWS_ARGS[@]}" ec2 wait instance-running --instance-ids "$INSTANCE_ID"

ALLOCATION_ID="$(aws "${AWS_ARGS[@]}" ec2 allocate-address \
  --domain vpc \
  --query 'AllocationId' \
  --output text)"

aws "${AWS_ARGS[@]}" ec2 associate-address \
  --instance-id "$INSTANCE_ID" \
  --allocation-id "$ALLOCATION_ID" >/dev/null

PUBLIC_IP="$(aws "${AWS_ARGS[@]}" ec2 describe-addresses \
  --allocation-ids "$ALLOCATION_ID" \
  --query 'Addresses[0].PublicIp' \
  --output text)"

change_batch_file="$(mktemp)"
cat >"$change_batch_file" <<JSON
{
  "Comment": "Portfolio DNS -> EC2 Elastic IP",
  "Changes": [
    {
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "${DOMAIN_ROOT}",
        "Type": "A",
        "TTL": 60,
        "ResourceRecords": [{ "Value": "${PUBLIC_IP}" }]
      }
    },
    {
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "www.${DOMAIN_ROOT}",
        "Type": "A",
        "TTL": 60,
        "ResourceRecords": [{ "Value": "${PUBLIC_IP}" }]
      }
    },
    {
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "${API_SUBDOMAIN}",
        "Type": "A",
        "TTL": 60,
        "ResourceRecords": [{ "Value": "${PUBLIC_IP}" }]
      }
    }
  ]
}
JSON

aws "${AWS_ARGS[@]}" route53 change-resource-record-sets \
  --hosted-zone-id "$HOSTED_ZONE_ID" \
  --change-batch "file://$change_batch_file" >/dev/null

rm -f "$change_batch_file"

PUBLIC_DNS="$(aws "${AWS_ARGS[@]}" ec2 describe-instances \
  --instance-ids "$INSTANCE_ID" \
  --query 'Reservations[0].Instances[0].PublicDnsName' \
  --output text)"

cat <<OUT

Provisioned:
  Instance ID:     $INSTANCE_ID
  Security Group:  $SG_ID
  Elastic IP:      $PUBLIC_IP
  Public DNS:      $PUBLIC_DNS

Next:
  1) ssh -i <key>.pem ec2-user@$PUBLIC_IP
  2) Run bootstrap script from this repo:
     bash infra/aws/bootstrap-instance.sh server/.env
OUT
