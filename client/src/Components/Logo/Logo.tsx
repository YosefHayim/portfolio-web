import { GoDash } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="relative h-8 w-10">
        <IoIosArrowForward size={24} className="absolute top-0 left-0" />
        <GoDash size={24} className="absolute right-0 bottom-0" />
      </div>
      <h1 className="text-2xl font-semibold">Yosef Sabag</h1>
    </div>
  );
};

export default Logo;
