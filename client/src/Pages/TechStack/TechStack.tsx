import { useEffect } from "react";
import Backend from "./Backend/Backend";
import Databases from "./Databases/Databases";
import Devops from "./Devops/Devops";
import Fronted from "./Fronted/Fronted";
import Languages from "./Languages/Languages";

const TechStack = () => {
  useEffect(() => {
    document.title = "Technology Stack";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  return (
    <div className="flex w-full flex-col gap-10 p-5 pt-[15%] md:pt-[5%]">
      <h1 className="font-code text-2xl">Technical Experience</h1>
      <Languages />
      <Fronted />
      <Backend />
      <Databases />
      <Devops />
    </div>
  );
};

export default TechStack;
