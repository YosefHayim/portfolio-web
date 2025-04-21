import { useEffect } from "react";
import Hero from "./Hero/Hero";
import WhoAmI from "./WhoAmI/WhoAmI";

const Homepage = () => {
  useEffect(() => {
    document.title = "Homepage";
  });
  return (
    <div className="flex flex-col gap-10 p-5">
      <Hero />
      <WhoAmI />
    </div>
  );
};

export default Homepage;
