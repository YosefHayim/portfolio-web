import { ReactNode } from "react";
import CustomProjectLogo from "../CustomProjectLogo/CustomProjectLogo";
import ProjectImg from "../ProjectImg/ProjectImg";
import TechOfProject from "./TechOfProject/TechOfProject";
import { Link } from "react-router";
import { FiExternalLink } from "react-icons/fi";

const ProjectCard: React.FC<{
  projectImg: string;
  projectName: string;
  visitRepoUrl: string;
  deployedUrl: string;
  techStackForProject: string[];
  childrenProjectIcon: ReactNode;
  children?: ReactNode;
}> = ({ techStackForProject, projectImg, children, childrenProjectIcon, projectName, deployedUrl, visitRepoUrl }) => {
  return (
    <section className="rounded-lg bg-gray-800">
      <ProjectImg path={projectImg} to={deployedUrl} />
      <div className="flex flex-col items-start justify-start gap-4 rounded-b-lg bg-gray-700 p-5">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center justify-start gap-2">
            <CustomProjectLogo>{childrenProjectIcon}</CustomProjectLogo>
            <h2 className="text-2xl">{projectName}</h2>
          </div>
          <Link to={visitRepoUrl} className="w text-gray-400 hover:text-white" target="_blank">
            <FiExternalLink size={25} />
          </Link>
        </div>
        {children}
        <div className="flex flex-col items-start justify-start gap-2">
          <b>Tech Stack</b>
          <TechOfProject techStackForProject={techStackForProject} />
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;
