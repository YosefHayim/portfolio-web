import { FaGithub } from "react-icons/fa";
import { Link } from "react-router";

const GithubSocialButton = () => {
  return (
    <Link rel="GitHub" to="https://github.com/YosefHayim">
      <FaGithub className="bg-transparent text-gray-400 hover:text-white" size={25} />
    </Link>
  );
};

export default GithubSocialButton;
