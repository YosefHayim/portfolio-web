import { Button } from "@/Components/ui/button";

const Projects = () => {
  return (
    <div className="flex w-full flex-col gap-10 p-5 pt-[10%]">
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="text-3xl">Featured Projects</h1>
        <p className="w-full text-center">
          Explore my latest work and personal projects showcasing various technologies and solutions.
        </p>
      </div>
      <section id="projects" className="w-full">
        <div className="flex w-full items-center justify-around">
          <Button className="border border-[#374151] bg-transparent hover:bg-[#1f2937]">All</Button>
          <Button className="border border-[#374151] bg-transparent hover:bg-[#1f2937]">Full Stack</Button>
          <Button className="border border-[#374151] bg-transparent hover:bg-[#1f2937]">Backend</Button>
          <Button className="border border-[#374151] bg-transparent hover:bg-[#1f2937]">Frontend</Button>
        </div>
      </section>
      <section className="rounded-xl bg-gray-800">
        <div>
          <img src="" alt="" />
        </div>
      </section>
    </div>
  );
};

export default Projects;
