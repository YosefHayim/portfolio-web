import { GoDotFill } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";

const WhoAmI = () => {
  return (
    <div className="flex w-full flex-col items-start justify-start rounded-xl bg-gray-800">
      <div className="flex items-center justify-start p-1">
        <GoDotFill size={28} className="text-red-400" />
        <GoDotFill size={28} className="text-yellow-400" />
        <GoDotFill size={28} className="text-green-400" />
      </div>
      <ul>
        <div className="flex w-full flex-col items-start">
          <li className="group relative w-full items-center justify-start gap-1 p-2">
            <div className="flex items-center">
              <IoIosArrowForward />
              <h3>WhoiAm?</h3>
            </div>
            <p className="text-gray-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Full-stack developer blending clean code with creative problem-solving.
            </p>
          </li>
        </div>
        <li className="group relative w-full items-center justify-start gap-1 p-2">
          <div className="flex w-full items-center">
            <IoIosArrowForward />
            <h3>Stack</h3>
          </div>
          <p className="text-gray-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            React, Node.js, TypeScript, PostgreSQL, Playwright, Kafka.
          </p>
        </li>
        <li className="group relative w-full items-center justify-start gap-1 p-2">
          <div className="flex w-full items-center">
            <IoIosArrowForward />
            <h3>Focus</h3>
          </div>
          <p className="text-gray-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Building real-time apps, scalable APIs, and testable systems.
          </p>
        </li>
        <li className="group relative w-full items-center justify-start gap-1 p-2">
          <div className="flex w-full items-center">
            <IoIosArrowForward />
            <h3>Passion</h3>
          </div>
          <p className="text-gray-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Automating workflows, shipping fast, and learning endlessly.
          </p>
        </li>
        <li className="group relative w-full items-center justify-start gap-1 p-2">
          <div className="flex w-full items-center">
            <IoIosArrowForward />
            <h3>Motto</h3>
          </div>
          <p className="text-gray-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Trying to get better <span className="font-bold underline hover:text-green-400">everyday.</span>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default WhoAmI;
