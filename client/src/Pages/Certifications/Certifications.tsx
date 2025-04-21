import CertificationHeader from "./CertificationHeader/CertificationHeader";
import CertificationCards from "./CertificationsCards/CertificationCards";

const Certifications = () => {
  return (
    <div className="flex flex-col gap-10 p-5">
      <CertificationHeader />
      <CertificationCards />
    </div>
  );
};

export default Certifications;
