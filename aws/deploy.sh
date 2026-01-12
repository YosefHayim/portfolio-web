#!/bin/bash
# AWS Deployment Script for Portfolio Website
# Usage: ./deploy.sh [environment] [action]
# Example: ./deploy.sh production deploy

set -e

ENVIRONMENT=${1:-production}
ACTION=${2:-deploy}
STACK_NAME="portfolio-${ENVIRONMENT}"
AWS_REGION=${AWS_REGION:-us-east-1}

echo "🚀 Portfolio Deployment Script"
echo "Environment: $ENVIRONMENT"
echo "Action: $ACTION"
echo "Region: $AWS_REGION"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check required tools
check_requirements() {
    log_info "Checking requirements..."

    if ! command -v aws &> /dev/null; then
        log_error "AWS CLI is not installed"
        exit 1
    fi

    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed"
        exit 1
    fi

    if ! aws sts get-caller-identity &> /dev/null; then
        log_error "AWS credentials not configured"
        exit 1
    fi

    log_info "All requirements met ✓"
}

# Deploy CloudFormation stack
deploy_infrastructure() {
    log_info "Deploying CloudFormation stack..."

    aws cloudformation deploy \
        --template-file aws/cloudformation.yaml \
        --stack-name "$STACK_NAME" \
        --region "$AWS_REGION" \
        --capabilities CAPABILITY_IAM \
        --parameter-overrides \
            Environment="$ENVIRONMENT" \
            OpenAIAPIKey="${OPENAI_API_KEY}" \
            EmailUser="${EMAIL_USER:-}" \
            EmailPass="${EMAIL_PASS:-}" \
        --no-fail-on-empty-changeset

    log_info "Infrastructure deployed ✓"
}

# Get stack outputs
get_stack_outputs() {
    FRONTEND_BUCKET=$(aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --region "$AWS_REGION" \
        --query "Stacks[0].Outputs[?OutputKey=='FrontendBucketName'].OutputValue" \
        --output text)

    ECR_URI=$(aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --region "$AWS_REGION" \
        --query "Stacks[0].Outputs[?OutputKey=='ECRRepositoryUri'].OutputValue" \
        --output text)

    CLOUDFRONT_DIST_ID=$(aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --region "$AWS_REGION" \
        --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionId'].OutputValue" \
        --output text)

    WEBSITE_URL=$(aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --region "$AWS_REGION" \
        --query "Stacks[0].Outputs[?OutputKey=='WebsiteURL'].OutputValue" \
        --output text)

    log_info "Frontend Bucket: $FRONTEND_BUCKET"
    log_info "ECR URI: $ECR_URI"
    log_info "CloudFront Distribution: $CLOUDFRONT_DIST_ID"
    log_info "Website URL: $WEBSITE_URL"
}

# Build and push Docker image
build_and_push_api() {
    log_info "Building API Docker image..."

    # Login to ECR
    aws ecr get-login-password --region "$AWS_REGION" | \
        docker login --username AWS --password-stdin "$ECR_URI"

    # Build image
    docker build -t portfolio-api:latest ./server

    # Tag and push
    docker tag portfolio-api:latest "$ECR_URI:latest"
    docker tag portfolio-api:latest "$ECR_URI:$(git rev-parse --short HEAD)"

    docker push "$ECR_URI:latest"
    docker push "$ECR_URI:$(git rev-parse --short HEAD)"

    log_info "API image pushed to ECR ✓"
}

# Build and deploy frontend
deploy_frontend() {
    log_info "Building frontend..."

    cd client
    pnpm install

    # Set API URL for production build
    VITE_API_URL="$WEBSITE_URL" pnpm build

    log_info "Uploading to S3..."

    # Sync dist folder to S3 with cache headers
    aws s3 sync dist/ "s3://$FRONTEND_BUCKET/" \
        --delete \
        --cache-control "max-age=31536000" \
        --exclude "index.html" \
        --exclude "*.json"

    # Upload index.html and JSON files without cache
    aws s3 cp dist/index.html "s3://$FRONTEND_BUCKET/index.html" \
        --cache-control "no-cache, no-store, must-revalidate"

    # Upload any JSON files (like site.webmanifest)
    find dist -name "*.json" -exec aws s3 cp {} "s3://$FRONTEND_BUCKET/{}" \
        --cache-control "max-age=3600" \;

    cd ..
    log_info "Frontend deployed to S3 ✓"
}

# Update ECS service
update_ecs_service() {
    log_info "Updating ECS service..."

    aws ecs update-service \
        --cluster "portfolio-cluster-${ENVIRONMENT}" \
        --service "portfolio-api-${ENVIRONMENT}" \
        --force-new-deployment \
        --region "$AWS_REGION" \
        > /dev/null

    log_info "ECS service update triggered ✓"
}

# Invalidate CloudFront cache
invalidate_cloudfront() {
    log_info "Invalidating CloudFront cache..."

    aws cloudfront create-invalidation \
        --distribution-id "$CLOUDFRONT_DIST_ID" \
        --paths "/*" \
        --region "$AWS_REGION" \
        > /dev/null

    log_info "CloudFront invalidation started ✓"
}

# Main deployment
main() {
    check_requirements

    case $ACTION in
        "deploy")
            deploy_infrastructure
            get_stack_outputs
            build_and_push_api
            deploy_frontend
            update_ecs_service
            invalidate_cloudfront
            ;;
        "frontend-only")
            get_stack_outputs
            deploy_frontend
            invalidate_cloudfront
            ;;
        "api-only")
            get_stack_outputs
            build_and_push_api
            update_ecs_service
            ;;
        "infrastructure")
            deploy_infrastructure
            get_stack_outputs
            ;;
        *)
            log_error "Unknown action: $ACTION"
            echo "Usage: $0 [environment] [deploy|frontend-only|api-only|infrastructure]"
            exit 1
            ;;
    esac

    echo ""
    log_info "🎉 Deployment complete!"
    log_info "Website URL: $WEBSITE_URL"
}

main
