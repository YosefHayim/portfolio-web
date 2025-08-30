import { IoMdTrophy } from 'react-icons/io';
import CardJourney from '../CardJourney/CardJourney';
import { FaUserTie } from 'react-icons/fa';

const MyJourney = () => {
  return (
    <div>
      <h2 className="w-full pb-2 text-center text-2xl">My journey</h2>
      <div className="flex w-full flex-col items-center justify-center gap-8">
        <CardJourney
          icon={<FaUserTie size={20} className="text-[#05df72]" />}
          colorIconHover={`group-hover:text-[#05df72]`}
          years={`Feb 2025 - April 2025`}
          title={`Wotch Health Startup - Internship`}
          textChildren={
            <p className="text-gray-400">
              Built a real-time debugger, expanded E2E tests, and integrated
              external data in a fast-paced healthcare startup.
            </p>
          }
        ></CardJourney>
        <CardJourney
          icon={<IoMdTrophy size={20} className="text-[#fdc700]" />}
          colorIconHover={`group-hover:text-[#fdc700]`}
          years={`2024 July - 2025 Feb`}
          title={`Fullstack Bootcamp - IITC College`}
          textChildren={
            <p className="text-gray-400">
              <span className="font-bold text-[#fdc700] delay-150 duration-300 ease-in-out group-hover:text-[#fdc700]">
                Graduated with excellence
              </span>{' '}
              796-hour bootcamp program Full-Stack web development with HTML,
              CSS, JavaScript, React, Node.js, Express, MongoDB and SQL.
            </p>
          }
        ></CardJourney>
        <CardJourney
          icon={<IoMdTrophy size={20} className="text-[#fdc700]" />}
          colorIconHover={`group-hover:text-[#fdc700]`}
          years={`2018 Nov - 2021 July`}
          title={`Veteran Commander - IDF - 931st Battalion - Negevist`}
          textChildren={
            <div>
              <p className="text-gray-400">
                Served in the IDF as a combat soldier (Negevist) in the Nahal
                Brigade.
              </p>
              <p className="text-gray-400">
                Completed my training as one of the top{' '}
                <span className="font-bold text-[#fdc700] delay-150 duration-300 ease-in-out group-hover:font-bold group-hover:text-[#fdc700]">
                  ten
                </span>{' '}
                combat soldiers and was awarded{' '}
                <span className="font-bold text-[#fdc700] delay-150 duration-300 ease-in-out group-hover:text-[#fdc700] hover:text-[#fdc700]">
                  excellence twice
                </span>{' '}
                once during basic training and again in the Commanders’ Course.
              </p>
            </div>
          }
        >
          <p
            className={`absolute top-3 left-7 text-sm font-bold text-[#fdc700] delay-150 duration-300 ease-in-out group-hover:block md:hidden`}
          >
            2x
          </p>
        </CardJourney>
      </div>
    </div>
  );
};

export default MyJourney;
