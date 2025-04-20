import { ReactNode } from "react";
import CustomProjectLogo from "../CustomProjectLogo/CustomProjectLogo";
import ProjectImg from "../ProjectImg/ProjectImg";
import TechOfProject from "./TechOfProject/TechOfProject";
import udemySvg from "/svgs/udemy.svg";

const ProjectCard: React.FC<{ techStackForProject: string[]; children: ReactNode; projectImg: string }> = ({
  techStackForProject,
  projectImg,
  children,
}) => {
  return (
    <section className="rounded-lg bg-gray-800">
      <ProjectImg path={projectImg} />
      <div className="flex flex-col items-start justify-start gap-4 rounded-b-lg bg-gray-700 p-5">
        <div className="flex w-full items-center justify-start gap-2">
          <CustomProjectLogo>
            <img src={udemySvg} alt="" />
          </CustomProjectLogo>
          <h2 className="text-2xl">Udemy platform clone</h2>
        </div>
        {children}

        <TechOfProject techStackForProject={techStackForProject} />
      </div>
    </section>
  );
};

export default ProjectCard;
