import { Link } from "react-router";

const NavigationButton: React.FC<{ pageName: string; to: string }> = ({ pageName, to }) => {
  return (
    <Link to={to} className="w-full text-gray-400 hover:text-white">
      {pageName}
    </Link>
  );
};

export default NavigationButton;
