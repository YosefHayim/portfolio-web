import { ReactNode } from "react";

const CardJourney: React.FC<{ title: string; text: string; icon: ReactNode; years: string }> = ({
  title,
  text,
  icon,
  years,
}) => {
  return (
    <div>
      <section className="relative z-10 flex w-full flex-col items-center justify-start gap-2 rounded-xl bg-gray-800 p-3">
        <h3 className="w-full text-xl">{title}</h3>
        <div className="absolute top-[-10%] left-[-5%] rounded-full bg-gray-700 p-2">{icon}</div>
        <p className="w-full text-gray-400">{years}</p>
        <p className="text-gray-400">{text}</p>
      </section>
    </div>
  );
};

export default CardJourney;
