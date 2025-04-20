import Backend from "./Backend/Backend";
import Databases from "./Databases/Databases";
import Devops from "./Devops/Devops";
import Fronted from "./Fronted/Fronted";
import Languages from "./Languages/Languages";

const TechStack = () => {
  return (
    <div className="flex w-full flex-col gap-10 p-5 pt-[10%]">
      <h1 className="text-2xl">Technical Experience</h1>
      <Languages />
      <Fronted />
      <Backend />
      <Databases />
      <Devops />
    </div>
  );
};

export default TechStack;
