import { ReactNode } from "react";
import { Link } from "react-router";

const CertificationCard: React.FC<{
  icon: ReactNode;
  certificateTitle: string;
  yearEarnedCertificate: string;
  certificateLink: string;
}> = ({ icon, yearEarnedCertificate, certificateTitle, certificateLink }) => {
  return (
    <div className="flex w-full flex-col items-start justify-start rounded-sm bg-gray-800 p-2 text-sm">
      <div className="flex w-full items-start justify-center">
        <p>{icon}</p>
        <p>{certificateTitle}</p>
        <p>{yearEarnedCertificate}</p>
      </div>
      <Link to={certificateLink} className="flex items-center">
        View Certificate
      </Link>
    </div>
  );
};

export default CertificationCard;
