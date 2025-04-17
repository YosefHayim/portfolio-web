import { Button } from "@/Components/ui/button";
import profilePic from "/homepage-hero-image/linkedin-profile.png";

const Hero = () => {
  return (
    <div className="w-min-max flex flex-col items-center justify-between gap-5">
      <div className="flex flex-col items-start justify-center gap-5">
        <h2 className="w-2/3 pt-[10%] text-5xl">Crafting Digital Experiences through code</h2>
        <p className="text-gray-400">
          Full-stack developer specialized in building exceptional digital experiences that combine creativity with
          technical excellence.
        </p>
        <div className="flex gap-2">
          <Button className="bg-white text-black hover:bg-gray-100">View Projects</Button>
          <Button className="border border-[#374151] bg-transparent hover:bg-[#1f2937]">Contact Me</Button>
        </div>
      </div>
      <img src={profilePic} alt="Yosef hayim sabag" className="rounded-xl" />
    </div>
  );
};

export default Hero;
