import ImageOfMyself from "@/Components/ImageOfMyself/ImageOfMyself";
import LoaderAnimation from "@/Components/LoaderAnimation/LoaderAnimation";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import { FaDownload, FaWhatsapp } from "react-icons/fa";
import { IoMdTrophy } from "react-icons/io";
import { Link } from "react-router";
import CardJourney from "./CardJourney/CardJourney";

const About = () => {
  const [loadingCV, setLoadingCV] = useState(false);
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);

  return (
    <div className="flex flex-col gap-10 p-5 pt-[10%]">
      <ImageOfMyself />
      <div className="items-star flex flex-col justify-center gap-5">
        <h1 className="text-3xl">About Me</h1>
        <p className="w-full text-gray-400">
          Hi, my name is Yosef Saabag. I’m a curious and driven full stack developer who loves building things that make
          sense. I dive deep when things aren’t clear, ask the right questions, and always push to figure things out. I
          care about clean structure, thoughtful design, and learning from every project.
        </p>
        <div className="flex w-full items-center justify-start gap-2">
          <a href="/resume/yosef-hayim-full-stack-resume.pdf" download onClick={() => setLoadingCV((prev) => !prev)}>
            {loadingCV ? (
              <Button className="w-35 border border-none bg-transparent hover:bg-transparent">
                <LoaderAnimation state={loadingCV} setState={setLoadingCV} />
              </Button>
            ) : (
              <Button className="bg-white text-black hover:bg-gray-100">
                <FaDownload />
                Download CV
              </Button>
            )}
          </a>
          <Link to="https://wa.me/546187549" onClick={() => setLoadingWhatsApp((prev) => !prev)}>
            {loadingWhatsApp ? (
              <Button className="w-35 border border-none bg-transparent hover:bg-transparent">
                <LoaderAnimation state={loadingWhatsApp} setState={setLoadingWhatsApp} />
              </Button>
            ) : (
              <Button className="border border-[#374151] bg-transparent p-2 hover:bg-[#1f2937]">
                <FaWhatsapp />
                Get In Touch
              </Button>
            )}
          </Link>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <h2 className="text-2xl">My journey</h2>
        <div>
          <CardJourney
            icon={<IoMdTrophy size={20} />}
            years={`2024 - 2025`}
            title={`Fullstack Bootcamp - IITC College`}
            text={`Completed an intensive 796-hour bootcamp program Full-Stack web development with HTML, CSS, JavaScript, React,
            Node.js, Express, and databases such as MongoDB and NoSQL`}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
