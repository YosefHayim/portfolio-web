import { IoMdTrophy } from "react-icons/io";
import CardJourney from "../CardJourney/CardJourney";
import { FaUserTie } from "react-icons/fa";

const MyJourney = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-18">
      <h2 className="text-2xl">My journey</h2>
      <CardJourney
        icon={<FaUserTie size={20} />}
        colorIconHover={`group-hover:text-[#05df72]`}
        years={`2025 - Active`}
        title={`Wotch Health Startup - Internship`}
        text={`Built a real-time debugging tool, improved E2E tests with Playwright, and integrated external data using EJS. Worked full stack in a fast-paced healthcare startup with hands-on SQL, cloud, and production experience.`}
      />
      <CardJourney
        icon={<IoMdTrophy size={20} />}
        colorIconHover={`group-hover:text-[#fdc700]`}
        years={`2024 - 2025`}
        title={`Fullstack Bootcamp - IITC College`}
        text={`Completed an intensive 796-hour bootcamp program Full-Stack web development with HTML, CSS, JavaScript, React,Node.js, Express, and databases such as MongoDB and NoSQL`}
      />
      <CardJourney
        icon={<IoMdTrophy size={20} />}
        colorIconHover={`group-hover:text-[#fdc700]`}
        years={`2018 - 2021`}
        showLine={false}
        title={`Infantry Commander - IDF - 931st Battalion - Negevist`}
        text={`I served in the IDF as a combat soldier (Negevist) in the Nahal Brigade. I completed my training as one of the top soldiers and was awarded excellence twice – once during basic training and again in the Commanders’ Course.`}
      >
        <p className={`#fdc700 absolute top-3 left-7 hidden group-hover:block`}>2x</p>
      </CardJourney>
    </div>
  );
};

export default MyJourney;
