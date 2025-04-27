import { useEffect } from "react";
import Backend from "./Backend/Backend";
import Databases from "./Databases/Databases";
import Devops from "./Devops/Devops";
import Fronted from "./Fronted/Fronted";
import Languages from "./Languages/Languages";
import Skills from "./Skills/Skills";

const TechStack = () => {
  useEffect(() => {
    document.title = "Technology Stack";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  return (
    <div className="flex w-full flex-col gap-10 p-5 pt-[15%] font-(family-name:--code-font) md:pt-[5%]">
      <h1 className="text-2xl">Technical Experience</h1>
      <Languages />
      <Fronted />
      <Backend />
      <Databases />
      <Devops />
      <Skills />
    </div>
  );
};

export default TechStack;
