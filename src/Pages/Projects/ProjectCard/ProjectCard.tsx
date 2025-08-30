import type { ReactNode } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router';
import CustomProjectLogo from '../CustomProjectLogo/CustomProjectLogo';
import ProjectImg from '../ProjectImg/ProjectImg';
import TechOfProject from './TechOfProject/TechOfProject';

const ProjectCard: React.FC<{
  projectImg: string;
  projectName: string;
  visitRepoUrl: string;
  deployedUrl: string;
  techStackForProject: string[];
  childrenProjectIcon: ReactNode;
  children?: ReactNode;
}> = ({
  techStackForProject,
  projectImg,
  children,
  childrenProjectIcon,
  projectName,
  deployedUrl,
  visitRepoUrl,
}) => {
  return (
    <div className="flex h-[650px] flex-col overflow-auto rounded-lg bg-gray-800">
      <ProjectImg path={projectImg} to={deployedUrl} />
      <div className="flex flex-col items-start justify-start gap-4 rounded-b-lg bg-gray-700 p-5">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center justify-start gap-2">
            <CustomProjectLogo>{childrenProjectIcon}</CustomProjectLogo>
            <h2 className="text-2xl">{projectName}</h2>
          </div>
          <Link
            className="w text-gray-400 hover:text-white"
            target="_blank"
            to={visitRepoUrl}
          >
            <FiExternalLink size={25} />
          </Link>
        </div>
        {children}
        <div className="flex flex-col items-start justify-start gap-2">
          <b>Tech Stack</b>
          <TechOfProject techStackForProject={techStackForProject} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
