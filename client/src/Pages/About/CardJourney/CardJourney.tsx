import { ReactNode } from "react";

const CardJourney: React.FC<{
  title: string;
  text: string;
  icon: ReactNode;
  years: string;
  colorIconHover: string;
  showLine?: boolean;
  children?: ReactNode;
}> = ({ title, text, icon, years, colorIconHover, showLine = true, children }) => {
  return (
    <div className="group relative w-full">
      <section className="relative z-10 w-full rounded-xl bg-gray-800">
        <div className="w-full flex-col items-center justify-start gap-2 p-5">
          <h3 className="w-full text-xl">{title}</h3>
          <div
            className={`absolute top-[-5%] left-[-4.5%] rounded-full bg-gray-700 p-2 delay-150 duration-300 ease-in-out group-hover:-translate-y-2 ${colorIconHover} group-hover:transition hover:scale-110`}
          >
            {icon}
            {children}
          </div>
          <p className="w-full text-transparent duration-300 ease-in-out group-hover:text-gray-400">{years}</p>
          <p className="text-gray-400">{text}</p>
        </div>
      </section>
      {showLine && <div className="h-0.5 w-2/3 translate-x-[-120px] rotate-90 bg-gray-600"></div>}
    </div>
  );
};

export default CardJourney;
