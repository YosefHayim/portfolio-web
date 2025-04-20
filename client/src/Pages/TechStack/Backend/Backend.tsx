import { FaNodeJs } from "react-icons/fa";
import { SiExpress, SiJsonwebtokens, SiLetsencrypt, SiMongoose, SiPaypal } from "react-icons/si";
import TechRow from "../TechRow/TechRow";

const backendTech = [
  { name: "Node.js", icon: <FaNodeJs size={20} /> },
  { name: "Express", icon: <SiExpress size={20} /> },
  { name: "JWT", icon: <SiJsonwebtokens size={20} /> },
  { name: "Bcrypt", icon: <SiLetsencrypt size={20} /> },
  { name: "Mongoose", icon: <SiMongoose size={20} /> },
  { name: "Paypal API Sandbox", icon: <SiPaypal size={20} /> },
];

const Backend = () => {
  return (
    <div className="flex flex-wrap items-center justify-start gap-2 rounded-sm bg-gray-800 p-4">
      {backendTech.map((tech) => (
        <TechRow techName={tech.name} key={tech.name}>
          {tech.icon}
        </TechRow>
      ))}
    </div>
  );
};

export default Backend;
