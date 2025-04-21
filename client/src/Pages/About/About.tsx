import ImageOfMyself from "@/Components/ImageOfMyself/ImageOfMyself";
import LoaderAnimation from "@/Components/LoaderAnimation/LoaderAnimation";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import { FaDownload, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router";
import MyJourney from "./MyJourney/MyJourney";

const About = () => {
  const [loadingCV, setLoadingCV] = useState(false);
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);

  useEffect(() => {
    document.title = "About";
  }, []);

  return (
    <div className="flex flex-col gap-10 p-5 pt-[10%]">
      <ImageOfMyself />
      <div className="flex flex-col items-start justify-center gap-4">
        <h1 className="text-3xl">About Me</h1>
        <p className="w-full">
          Hi there — the logo gives away my name. I’m a curious, developer who sees code as a form of art. This
          portfolio is my canvas — feel free to explore and get a sense of who I am and what I build.
        </p>
        <p className="font-light italic">I’m just trying to get better every day.</p>
        <div className="flex w-full items-center justify-start gap-4">
          <a href="/resume/yosef-hayim-full-stack-resume.pdf" download onClick={() => setLoadingCV((prev) => !prev)}>
            {loadingCV ? (
              <Button className="w-35 border border-none bg-transparent hover:bg-transparent">
                <LoaderAnimation state={loadingCV} setState={setLoadingCV} />
              </Button>
            ) : (
              <Button className="bg-white text-black transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-100">
                <FaDownload />
                Download CV
              </Button>
            )}
          </a>
          <Link
            to={`https://wa.me/${import.meta.env.VITE_MY_NUMBER}`}
            onClick={() => setLoadingWhatsApp((prev) => !prev)}
          >
            {loadingWhatsApp ? (
              <Button className="w-35 border border-none bg-transparent hover:bg-transparent">
                <LoaderAnimation state={loadingWhatsApp} setState={setLoadingWhatsApp} />
              </Button>
            ) : (
              <Button className="border border-[#374151] bg-transparent p-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#1f2937]">
                <FaWhatsapp color="#05df72" />
                Get In Touch
              </Button>
            )}
          </Link>
        </div>
      </div>
      <MyJourney />
    </div>
  );
};

export default About;
