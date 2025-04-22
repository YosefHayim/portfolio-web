import { Link } from "react-router";

const ProjectImg: React.FC<{ path: string; to: string }> = ({ path = "https://placehold.co/450x200", to }) => {
  const handleClick = () => {
    if (to === "not-deployed") {
      alert("This project is not deployed yet.");
      to = "/projects";
      return;
    }
  };

  return (
    <Link to={to} className="group relative w-full" onClick={handleClick}>
      <div className="relative w-full opacity-50 duration-300 ease-in-out hover:opacity-100">
        <img src={path} alt="Screenshot of the project created" className="w-full rounded-t-lg" />
      </div>
    </Link>
  );
};

export default ProjectImg;
