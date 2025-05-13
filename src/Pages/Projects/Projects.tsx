import ProjectCard from "./ProjectCard/ProjectCard";
import { SiAlwaysdata, SiBinance, SiUdemy } from "react-icons/si";
import udemyScreenshot from "/screenshots/udemy.png";
import momToolScreenshot from "/screenshots/MomTool.png";
import amazonScreenshot from "/screenshots/amazon.png";
import ebayScreenshot from "/screenshots/ebay.png";
import interactiveBrokersScreenshot from "/screenshots/interactive-brokers.png";
import timScreenshot from "/screenshots/tim-trailer.png";
import binanceScreenshot from "/screenshots/binance.png";
import harABituahScreenshot from "/screenshots/har-a-bituah.png";
import Collaborators from "./ProjectCard/Collaborators/Collaborators";
import ProjectsHeader from "./ProjectsHeader/ProjectsHeader";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { FaAmazon, FaEbay } from "react-icons/fa";
import { RiStockLine } from "react-icons/ri";
import { GiPopcorn } from "react-icons/gi";
import { useEffect } from "react";

const Projects = () => {
  useEffect(() => {
    document.title = "Projects";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  return (
    <div className="flex w-full flex-col gap-10 p-5 pt-[15%] md:pt-[5%]">
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
        visitRepoUrl="https://github.com/YosefHayim/iitc-b/tree/main/full-stack-2024/october-2024/14-10-2024/sukot-assigment"
        deployedUrl="https://iitc-b-frontend-vanilla-tim-trailers.onrender.com/"
        projectName="Tim Trailers"
        projectImg={timScreenshot}
        techStackForProject={["JavaScript, TMDB API"]}
        childrenProjectIcon={<GiPopcorn size={30} className="rounded-sm bg-white p-1 text-red-700" />}
      >
        <div className="flex w-full flex-col items-center justify-start gap-2">
          <p className="w-full text-gray-400">
            Tim Trailers is a quirky, vanilla HTML/CSS movie trailer site where you join Tim—a popcorn prophet with a
            love for laughs—on a cinematic ride through curated picks, cozy vibes, and festival flair.
          </p>
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
          <ul className="text-gray-400">
            <h3 className="pb-1 font-bold">Flow of the project is:</h3>
            <li>Converted PDFs to images using Sharp</li>
            <li>Ran OCR with Tesseract.js</li>
            <li>Parsed invoice data via OpenAI</li>
          </ul>
        </div>
      </ProjectCard>
      <ProjectCard
        projectImg={amazonScreenshot}
        visitRepoUrl="https://github.com/YosefHayim/p-w-gpt/tree/main/Python/09.08.2024%20-%20Amazon%20ASIN%20Collector%20%2B%20normal%20captcha"
        deployedUrl="not-deployed"
        projectName="Amazon ASIN Scraper W/CAPTCHA"
        techStackForProject={["Selenium", "2Captcha API"]}
        childrenProjectIcon={<FaAmazon size={30} className="rounded-sm bg-white p-1 text-black" />}
      >
        <div className="group relative flex flex-col items-start justify-start gap-2">
          <p className="w-full text-gray-400">
            Python bot using Selenium to grab ASINs from Amazon, bypass CAPTCHAs with 2Captcha, switch ZIP codes, and
            export to CSV.
          </p>
        </div>
      </ProjectCard>
      <ProjectCard
        projectImg={ebayScreenshot}
        visitRepoUrl="https://github.com/YosefHayim/p-w-gpt/tree/main/Python/11.08.2024%20-%20eBay%20Titles%20Collector"
        deployedUrl="not-deployed"
        projectName="eBay Sellers Title Scraper"
        techStackForProject={["Selenium"]}
        childrenProjectIcon={<FaEbay size={30} className="rounded-sm bg-white p-1 text-black" />}
      >
        <div className="group relative flex flex-col items-start justify-start gap-2">
          <p className="w-full text-gray-400">
            Python bot that scrapes product titles across pages and saves them to CSV.
          </p>
        </div>
      </ProjectCard>
      <ProjectCard
        projectImg={harABituahScreenshot}
        visitRepoUrl="https://github.com/YosefHayim/p-w-gpt/tree/main/Python/19.02.2024%20-%20HarABituh-data%20read%20and%20extraction%20with%20manual%20captcha%20automation"
        deployedUrl="not-deployed"
        projectName="HarABituah Government Scraper"
        techStackForProject={["Selenium"]}
        childrenProjectIcon={<SiAlwaysdata size={30} className="rounded-sm bg-white p-1 text-black" />}
      >
        <div className="group relative flex flex-col items-start justify-start gap-2">
          <p className="w-full text-gray-400">
            At an insurance company in Holon, I spotted a manual process slowing things down. With zero coding
            background, I used ChatGPT to guide me in building a Python automation that extracted and processed customer
            files—saving time and cutting costs for the business.{" "}
          </p>
        </div>
      </ProjectCard>
      <ProjectCard
        projectImg={interactiveBrokersScreenshot}
        visitRepoUrl="https://github.com/YosefHayim/p-w-gpt/tree/main/Python/19.11.2023%20-%20Interactive%20broker%20API%20trading%20bots"
        deployedUrl="not-deployed"
        projectName="Stocks Trading Bots"
        techStackForProject={["Selenium", "Interactive Brokers API", "Telegram API"]}
        childrenProjectIcon={<RiStockLine size={30} className="rounded-sm bg-white p-1 text-black" />}
      >
        <div className="group relative flex flex-col items-start justify-start gap-2">
          <p className="w-full text-gray-400">
            Started with zero coding—used ChatGPT to build modular Python bots running MACD, RSI, SMA, and Wyckoff
            strategies. Fully automated for live trading via Interactive Brokers API.
          </p>
        </div>
      </ProjectCard>
      <ProjectCard
        projectImg={binanceScreenshot}
        visitRepoUrl="https://github.com/YosefHayim/p-w-gpt/tree/main/Python/10.28.2023%20-%20Binance%20API%20trading%20bots"
        deployedUrl="not-deployed"
        projectName="Crypto Trading Bots"
        techStackForProject={["Selenium", "Binance API", "Telegram API"]}
        childrenProjectIcon={<SiBinance size={30} className="rounded-sm bg-white p-1 text-black" />}
      >
        <div className="group relative flex flex-col items-start justify-start gap-2">
          <p className="w-full text-gray-400">
            With no coding background, I built Python bots using ChatGPT to automate trading on Binance. Strategies
            included RSI, MACD, and SMA—fully hands-off and data-driven.
          </p>
        </div>
      </ProjectCard>
    </div>
  );
};

export default Projects;
