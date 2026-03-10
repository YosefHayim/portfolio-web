import { Link } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const ProjectImg: React.FC<{ path: string; to: string }> = ({
  path = "https://placehold.co/450x200",
  to,
}) => {
  useScrollToTop();

  const handleClick = () => {
    if (to === "projects") {
      alert("This project is not deployed yet.");
      return;
    }
  };

  return (
    <Link
      className="group relative w-full"
      onClick={handleClick}
      to={to === "projects" ? "/projects" : to}
    >
      <div className="relative w-full opacity-50 duration-300 ease-in-out hover:opacity-100">
        {/** biome-ignore lint/performance/noImgElement: <explanation> */}
        <img
          alt="Screenshot of the project created"
          className="w-full rounded-t-lg"
          height={100}
          src={path}
          width={100}
        />
      </div>
    </Link>
  );
};

export default ProjectImg;
