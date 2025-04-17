import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

const LinkedinSocialButton = () => {
  return (
    <Link rel="Linkedin" to="https://www.linkedin.com/in/yosef-hayim-sabag/">
      <FaLinkedin className="bg-transparent text-gray-400 hover:text-white" size={25} />
    </Link>
  );
};

export default LinkedinSocialButton;
