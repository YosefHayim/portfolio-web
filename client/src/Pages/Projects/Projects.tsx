import ProjectCard from "./ProjectCard/ProjectCard";
import { SiUdemy } from "react-icons/si";
import udemyScreenshot from "/screenshots/udemy.png";
import momToolScreenshot from "/screenshots/MomTool.png";
import Collaborators from "./ProjectCard/Collaborators/Collaborators";
import ProjectsHeader from "./ProjectsHeader/ProjectsHeader";
import { BsFileEarmarkPdfFill } from "react-icons/bs";

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
      <ProjectCard
        techStackForProject={[
          "React",
          "Tailwind",
          "Axios",
          "TanStack Query",
          "Socket.IO",
          "Playwright",
          "Husky",
          "Node.js",
          "Express",
          "Multer",
          "Sharp",
          "Tesseract.js(OCR)",
          "OpenAI API",
          "Morgan",
        ]}
        childrenProjectIcon={<BsFileEarmarkPdfFill size={30} className="rounded-sm bg-white p-1 text-black" />}
        projectName="OCR Parse AI"
        projectImg={momToolScreenshot}
        deployedUrl="https://pdf-extractor-data-helping-mom-fronted.onrender.com/"
      >
        <div className="flex w-full flex-col items-center justify-start gap-2">
          <p className="w-full text-gray-400">
            Built an AI-powered OCR tool to help my mom extract structured data from messy PDF invoices.
          </p>
          <ol className="list-decimal text-gray-400">
            <li>Converted PDFs to images using Sharp</li>
            <li>Ran OCR with Tesseract.js</li>
            <li>Parsed invoice data via OpenAI</li>
          </ol>
        </div>
      </ProjectCard>
    </div>
  );
};

export default Projects;
