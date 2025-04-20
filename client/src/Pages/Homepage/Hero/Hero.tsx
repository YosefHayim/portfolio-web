import { Button } from "@/Components/ui/button";
import ImageOfMyself from "@/Components/ImageOfMyself/ImageOfMyself";

const Hero = () => {
  return (
    <div className="w-min-max flex flex-col items-center justify-between gap-5">
      <div className="flex flex-col items-start justify-center gap-5">
        <h2 className="w-full pt-[10%] text-center text-3xl">Crafting Digital Experiences through code</h2>
        <p className="text-gray-400">
          Full-stack developer specialized in building exceptional digital experiences that combine creativity with
          technical excellence.
        </p>
        <div className="flex gap-2">
          <Button className="bg-white text-black hover:bg-gray-100">View Projects</Button>
          <Button className="border border-[#374151] bg-transparent hover:bg-[#1f2937]">Contact Me</Button>
        </div>
      </div>
      <ImageOfMyself />
    </div>
  );
};

export default Hero;
