import CustomProjectLogo from "./CustomProjectLogo/CustomProjectLogo";
import udemySvg from "/svgs/udemy.svg";

const Projects = () => {
  return (
    <div className="flex w-full flex-col gap-10 p-5 pt-[10%]">
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="text-3xl">Featured Projects</h1>
        <p className="w-full text-center">
          Explore my latest work and personal projects showcasing various technologies and solutions.
        </p>
      </div>
      <section className="rounded-lg bg-gray-800">
        <div>
          <img src="https://placehold.co/450x200" alt="" className="rounded-t-lg" />
        </div>
        <div className="flex flex-col items-start justify-start gap-4 rounded-b-lg bg-gray-700 p-5">
          <div className="flex w-full items-center justify-start gap-2">
            <CustomProjectLogo>
              <img src={udemySvg} alt="" />
            </CustomProjectLogo>
            <h2 className="text-2xl">Udemy platform clone</h2>
          </div>
          <p className="text-gray-400">
            lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
          </p>
          <div className="flex w-full flex-wrap items-center justify-start gap-2">
            <span className="rounded-full bg-gray-600 px-3 py-1">React</span>
            <span className="rounded-full bg-gray-600 px-3 py-1">Node.js</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
