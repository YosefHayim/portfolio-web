import ProjectCard from "./ProjectCard/ProjectCard";
import { SiUdemy } from "react-icons/si";
import udemyScreenshot from "/screenshots/udemy.png";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router";
import GithubSocialButton from "@/Components/GithubSocialButton/GithubSocialButton";

const Projects = () => {
  return (
    <div className="flex w-full flex-col gap-10 p-5 pt-[10%]">
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="text-3xl">Featured Projects</h1>
        <p className="w-full text-center">
          Explore my latest work and personal projects showcasing various technologies and solutions.
        </p>
      </div>
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
          <div className="w-full">
            <b>Collaborators:</b>
            <ul className="list-dist flex flex-col items-start justify-start gap-2 text-gray-400">
              <li className="justify-stat flex items-start gap-4">
                <GithubSocialButton to="https://github.com/ron959" />
                <p>Ron sherling</p>
              </li>
              <li className="justify-stat flex items-start gap-4">
                <GithubSocialButton to="https://github.com/Ben-Kilinski" />
                <p>Ben Klinski</p>
              </li>
            </ul>
          </div>
        </div>
      </ProjectCard>
    </div>
  );
};

export default Projects;
