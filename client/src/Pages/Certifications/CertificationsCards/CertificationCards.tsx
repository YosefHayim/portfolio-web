import { FaNodeJs, FaPython } from "react-icons/fa";
import CertificationCard from "../CertificationCard/CertificationCard";

const CertificationCards = () => {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-2">
      <CertificationCard
        icon={<FaNodeJs size={30} />}
        certificateTitle={"Node.js, Express, MongoDB & More: The Complete Bootcamp"}
        yearEarnedCertificate={"Feb 2025"}
        certificateLink={"https://www.udemy.com/certificate/UC-830343b5-2bb6-44ae-baf3-af70748ea84c/"}
      ></CertificationCard>
      <CertificationCard
        icon={<FaPython size={30} />}
        certificateTitle={"100 Days of Code: The Complete Python Pro Bootcamp"}
        yearEarnedCertificate={"Oct 2024"}
        certificateLink={
          "https://www.udemy.com/certificate/UC-65f92c9d-6851-4700-9ced-8cfa8d192b41/?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com"
        }
      ></CertificationCard>
      <CertificationCard
        icon={<FaPython size={30} />}
        certificateTitle={"The Complete Full-Stack Web Development Bootcamp"}
        yearEarnedCertificate={"Nov 2024"}
        certificateLink={
          "https://www.udemy.com/certificate/UC-2bc9ed93-536f-4dd1-9aeb-45821941d8bc/?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com"
        }
      ></CertificationCard>
    </div>
  );
};

export default CertificationCards;
