import { IoMdTrophy } from "react-icons/io";
import CardJourney from "../CardJourney/CardJourney";

const MyJourney = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-18">
      <h2 className="text-2xl">My journey</h2>
      <CardJourney
        icon={<IoMdTrophy size={20} />}
        colorIconHover={`#fdc700`}
        years={`2024 - 2025`}
        title={`Fullstack Bootcamp - IITC College`}
        text={`Completed an intensive 796-hour bootcamp program Full-Stack web development with HTML, CSS, JavaScript, React,
        Node.js, Express, and databases such as MongoDB and NoSQL`}
      ></CardJourney>
      <CardJourney
        icon={<IoMdTrophy size={20} />}
        colorIconHover={`#fdc700`}
        years={`2018 - 2021`}
        title={`Infantry Commander - IDF - 931st Battalion - Negevist`}
        text={`Served as a combat Negevist and completed training as an outstanding soldier in the Nahal
      Brigade recruitment cycle. Recognized for excellence in training and leadership during the IDF
      Commanders’ Course, where I developed strong leadership and problem-solving skills`}
      >
        <p className={`#fdc700 absolute top-3 left-7 hidden group-hover:block`}>2x</p>
      </CardJourney>
    </div>
  );
};

export default MyJourney;
