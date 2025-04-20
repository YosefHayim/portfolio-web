import { ReactNode } from "react";
import CustomProjectLogo from "../CustomProjectLogo/CustomProjectLogo";
import ProjectImg from "../ProjectImg/ProjectImg";
import TechOfProject from "./TechOfProject/TechOfProject";

const ProjectCard: React.FC<{
  techStackForProject: string[];
  children: ReactNode;
  projectImg: string;
  projectName: string;
  childrenProjectIcon: ReactNode;
  deployedUrl: string;
}> = ({ techStackForProject, projectImg, children, childrenProjectIcon, projectName, deployedUrl }) => {
  return (
    <section className="rounded-lg bg-gray-800">
      <ProjectImg path={projectImg} to={deployedUrl} />
      <div className="flex flex-col items-start justify-start gap-4 rounded-b-lg bg-gray-700 p-5">
        <div className="flex w-full items-center justify-start gap-2">
          <CustomProjectLogo>{childrenProjectIcon}</CustomProjectLogo>
          <h2 className="text-2xl">{projectName}</h2>
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
