import { FaGithub } from "react-icons/fa";
import { Link } from "react-router";

const GithubSocialButton: React.FC<{ to: string }> = ({ to = "https://github.com/YosefHayim" }) => {
  return (
    <Link rel="GitHub" to={to}>
      <FaGithub className="bg-transparent text-gray-400 hover:text-white" size={25} />
    </Link>
  );
};

export default GithubSocialButton;
