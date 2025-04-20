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
      />
    </div>
  );
};

export default Projects;
