import { FaReact, FaJs } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript, SiAxios, SiShadcnui, SiReactrouter, SiReactquery, SiRedux, SiMui } from "react-icons/si";
import TechRow from "../TechRow/TechRow";

const TechStack = [
  { name: "React", icon: <FaReact size={20} /> },
  { name: "TypeScript", icon: <SiTypescript size={20} /> },
  { name: "Tailwind", icon: <RiTailwindCssFill size={20} /> },
  { name: "JavaScript", icon: <FaJs size={20} /> },
  { name: "Axios", icon: <SiAxios size={20} /> },
  { name: "Shadcn UI", icon: <SiShadcnui size={20} /> },
  { name: "React Router", icon: <SiReactrouter size={20} /> },
  { name: "React Query", icon: <SiReactquery size={20} /> },
  { name: "Redux", icon: <SiRedux size={20} /> },
  { name: "Mui", icon: <SiMui size={20} /> },
];

const Fronted = () => {
  return (
    <div className="flex flex-wrap items-center justify-start gap-2 rounded-sm bg-gray-800 p-4">
      {TechStack.map((tech, index) => (
        <TechRow key={index} techName={tech.name}>
          {tech.icon}
        </TechRow>
      ))}
    </div>
  );
};

export default Fronted;
