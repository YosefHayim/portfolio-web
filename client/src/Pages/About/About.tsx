import ImageOfMyself from "@/Components/ImageOfMyself/ImageOfMyself";
import { Button } from "@/Components/ui/button";
import { FaDownload, FaWhatsapp } from "react-icons/fa";

const About = () => {
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
          <a href="/resume/yosef-hayim-full-stack-resume.pdf" download>
            <Button className="bg-white text-black hover:bg-gray-100">
              <FaDownload />
              Download CV
            </Button>
          </a>
          <Button className="border border-[#374151] bg-transparent p-2 hover:bg-[#1f2937]">
            <FaWhatsapp />
            Get In Touch
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <h2 className="text-2xl">My journey</h2>
      </div>
    </div>
  );
};

export default About;
