import { FaNodeJs, FaPython } from "react-icons/fa";
import CertificationCard from "../CertificationCard/CertificationCard";

const CertificationCards = () => {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-2">
      <CertificationCard
        icon={<FaPython size={30} />}
        certificateTitle={"100 Days of Code: The Complete Python Pro Bootcamp"}
        yearEarnedCertificate={"Oct 2024"}
        cretificateLink={"Nov 2024"}
      ></CertificationCard>
      <CertificationCard
        icon={<FaNodeJs size={30} />}
        certificateTitle={"Node.js, Express, MongoDB & More: The Complete Bootcamp"}
        yearEarnedCertificate={"Feb 2025"}
        cretificateLink={""}
      ></CertificationCard>
      <CertificationCard
        icon={<FaPython size={30} />}
        certificateTitle={"The Complete Full-Stack Web Development Bootcamp"}
        yearEarnedCertificate={""}
        cretificateLink={""}
      ></CertificationCard>
    </div>
  );
};

export default CertificationCards;
