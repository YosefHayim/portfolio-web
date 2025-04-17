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
        <div className="flex w-full items-center">
          <IoIosArrowForward />
          <h3>WhoiAm?</h3>
        </div>
        <li className="w-full items-center justify-start gap-1 p-2">
          <p className="text-gray-400">Full-stack developer blending clean code with creative problem-solving.</p>
        </li>
        <li className="w-full items-center justify-start gap-1 p-2">
          <div className="flex w-full items-center">
            <IoIosArrowForward />
            <h3>Stack</h3>
          </div>
          <p className="text-gray-400">React, Node.js, TypeScript, PostgreSQL, Playwright, Kafka.</p>
        </li>
        <li className="w-full items-center justify-start gap-1 p-2">
          <div className="flex w-full items-center">
            <IoIosArrowForward />
            <h3>Focus</h3>
          </div>
          <p className="text-gray-400">Building real-time apps, scalable APIs, and testable systems.</p>
        </li>
        <li className="w-full items-center justify-start gap-1 p-2">
          <div className="flex w-full items-center">
            <IoIosArrowForward />
            <h3>Passion</h3>
          </div>
          <p className="text-gray-400">Automating workflows, shipping fast, and learning endlessly.</p>
        </li>
        <li className="w-full items-center justify-start gap-1 p-2">
          <div className="flex w-full items-center">
            <IoIosArrowForward />
            <h3>Motto</h3>
          </div>
          <p className="text-gray-400">Trying to get better everyday.</p>
        </li>
      </ul>
    </div>
  );
};

export default WhoAmI;
