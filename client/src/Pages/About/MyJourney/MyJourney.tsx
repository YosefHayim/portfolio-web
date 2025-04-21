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
        textChildren={
          <p className="text-gray-400">
            Built a real-time debugging tool, improved E2E tests with Playwright, and integrated external data using
            EJS. Worked full stack in a fast-paced healthcare startup with hands-on SQL, cloud, and production
            experience.
          </p>
        }
      ></CardJourney>
      <CardJourney
        icon={<IoMdTrophy size={20} />}
        colorIconHover={`group-hover:text-[#fdc700]`}
        years={`2024 - 2025`}
        title={`Fullstack Bootcamp - IITC College`}
        textChildren={
          <p className="text-gray-400">
            <span className="font-bold delay-150 duration-300 ease-in-out group-hover:text-[#fdc700]">
              Graduated with excellence 796-hour
            </span>{" "}
            bootcamp program Full-Stack web development with HTML, CSS, JavaScript, React,Node.js, Express, and
            databases such as MongoDB and NoSQL
          </p>
        }
      ></CardJourney>
      <CardJourney
        icon={<IoMdTrophy size={20} />}
        colorIconHover={`group-hover:text-[#fdc700]`}
        years={`2018 - 2021`}
        showLine={false}
        title={`Veteran Commander - IDF - 931st Battalion - Negevist`}
        textChildren={
          <div>
            <p className="text-gray-400">I served in the IDF as a combat soldier (Negevist) in the Nahal Brigade.</p>
            <p className="text-gray-400">
              I completed my training as one of the top{" "}
              <span className="group-hover:font-bold group-hover:text-[#fdc700]">ten</span> soldiers and was awarded{" "}
              <span className="font-bold delay-150 duration-300 ease-in-out group-hover:text-[#fdc700]">
                excellence twice
              </span>{" "}
              – once during basic training and again in the Commanders’ Course.
            </p>
          </div>
        }
      >
        <p className={`#fdc700 absolute top-3 left-7 hidden text-sm font-bold group-hover:block`}>2x</p>
      </CardJourney>
    </div>
  );
};

export default MyJourney;
