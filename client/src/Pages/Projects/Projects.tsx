import ProjectCard from "./ProjectCard/ProjectCard";
import { SiUdemy } from "react-icons/si";
import udemyScreenshot from "/screenshots/udemy.png";
import Collaborators from "./ProjectCard/Collaborators/Collaborators";
import ProjectsHeader from "./ProjectsHeader/ProjectsHeader";

const Projects = () => {
  return (
    <div className="flex w-full flex-col gap-10 p-5 pt-[10%]">
      <ProjectsHeader />
      <ProjectCard
        deployedUrl="https://udemy-clone-ron-and-ben-front.onrender.com/"
        projectName="Udemy Clone"
        projectImg={udemyScreenshot}
        techStackForProject={["React", "Node.js", "TypeScript", "Express", "MongoDB", "Tailwind", "Redux"]}
        childrenProjectIcon={<SiUdemy size={30} className="rounded-sm bg-white p-1 text-purple-500" />}
      >
        <div className="flex w-full flex-col items-center justify-start gap-2">
          <p className="w-full text-gray-400">
            This project is a full-featured Udemy clone, built as the final capstone for our course at IITC to showcase
            everything we’ve learned.
          </p>
          <Collaborators
            collaboratorToProject={[
              { name: "Ron Sherling", githubProfileLink: "https://github.com/ron959" },
              { name: "Ben Klinski", githubProfileLink: "https://github.com/Ben-Kilinski" },
            ]}
          />
        </div>
      </ProjectCard>
    </div>
  );
};

export default Projects;
