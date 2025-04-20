import ProjectCard from "./ProjectCard/ProjectCard";
import { SiUdemy } from "react-icons/si";
import udemyScreenshot from "/screenshots/udemy.png";
import momToolScreenshot from "/screenshots/MomTool.png";
import stockMarketScreenShot from "/screenshots/past-projects-with-chatgpt.png";
import Collaborators from "./ProjectCard/Collaborators/Collaborators";

import ProjectsHeader from "./ProjectsHeader/ProjectsHeader";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { RiStockLine } from "react-icons/ri";

const Projects = () => {
  return (
    <div className="flex w-full flex-col gap-10 p-5 pt-[10%]">
      <ProjectsHeader />
      <ProjectCard
        visitRepoUrl="https://github.com/YosefHayim/Udemy-Clone-Ron-Ben-IITC-2025"
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
        visitRepoUrl="https://github.com/YosefHayim/OCR-Parse-AI"
        techStackForProject={[
          "React",
          "Tailwind",
          "Axios",
          "TanStack Query",
          "Socket.io",
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
      <ProjectCard
        projectImg={stockMarketScreenShot}
        visitRepoUrl="https://github.com/YosefHayim/p-w-gpt"
        deployedUrl="https://github.com/YosefHayim"
        projectName="Past Projects With GPT"
        techStackForProject={["None"]}
        childrenProjectIcon={<RiStockLine size={30} className="rounded-sm bg-white p-1 text-black" />}
      >
        <div className="group relative flex flex-col items-start justify-start gap-2">
          <p className="w-full text-gray-400">
            Started by using ChatGPT prompts to build Telegram bots and automate day trading with finance APIs—no coding
            background.
          </p>
          <p className="w-full text-gray-400">
            just pure <span className="group-hover:text-white">curiosity.</span> That hacked learning approach sparked
            my full-stack dev journey.
          </p>
        </div>
      </ProjectCard>
    </div>
  );
};

export default Projects;
