import { Link } from "react-router";

const NavigationButton: React.FC<{ pageName: string; to: string }> = ({ pageName, to }) => {
  return (
    <Link
      to={to}
      className="w-full text-gray-400 transition delay-150 duration-300 ease-in-out hover:text-white md:text-center"
    >
      {pageName}
    </Link>
  );
};

export default NavigationButton;
