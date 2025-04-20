import { VscGithubAction } from "react-icons/vsc";
import TechRow from "../TechRow/TechRow";

const devopsTech = [{ name: "GitHub Actions", icon: <VscGithubAction size={20} /> }];

const Devops = () => {
  return (
    <div>
      <h2 className="pb-2 text-center">DevOps</h2>
      <div className="flex flex-wrap items-center justify-start gap-2 rounded-sm bg-gray-800 p-4">
        {devopsTech.map((tech) => (
          <TechRow techName={tech.name}>{tech.icon}</TechRow>
        ))}
      </div>
    </div>
  );
};

export default Devops;
