import { ReactNode } from "react";

const CardJourney: React.FC<{
  title: string;
  textChildren: ReactNode;
  icon: ReactNode;
  years: string;
  colorIconHover: string;
  children?: ReactNode;
}> = ({ title, icon, years, colorIconHover, children, textChildren }) => {
  return (
    <div className="group relative w-full">
      <section className="relative z-10 w-full rounded-xl bg-gray-800">
        <div className="w-full flex-col items-center justify-start gap-2 p-5">
          <p className="w-full text-transparent duration-300 ease-in-out group-hover:text-white">{years}</p>
          <h3 className="w-full text-sm">{title}</h3>
          <div
            className={`absolute top-[-15px] left-[-20px] rounded-full bg-gray-700 p-2 delay-150 duration-300 ease-in-out group-hover:-translate-y-2 ${colorIconHover} group-hover:transition hover:scale-110`}
          >
            {icon}
            {children}
          </div>
          {textChildren}
        </div>
      </section>
    </div>
  );
};

export default CardJourney;
