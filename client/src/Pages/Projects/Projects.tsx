import ProjectCard from "./ProjectCard/ProjectCard";

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
        techStackForProject={[
          "Node.js",
          "TypeScript",
          "Express",
          "MongoDB",
          "React",
          "Vite",
          "Tailwind CSS",
          "Redux Toolkit",
        ]}
      >
        <p className="text-gray-400">
          This project is a full-featured Udemy clone, built as the final capstone for our course at IITC to showcase
          everything we’ve learned.
        </p>
      </ProjectCard>
    </div>
  );
};

export default Projects;
