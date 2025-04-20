import { Link } from "react-router";

const ProjectImg: React.FC<{ path: string; to: string }> = ({ path = "https://placehold.co/450x200", to }) => {
  return (
    <Link to={to}>
      <div className="relative w-full opacity-50 duration-300 ease-in-out hover:opacity-100">
        <img src={path} alt="" className="w-full rounded-t-lg" />
      </div>
    </Link>
  );
};

export default ProjectImg;
