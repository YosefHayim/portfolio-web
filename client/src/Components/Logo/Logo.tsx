import { GoDash } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";

const Logo = () => {
  return (
    <div className="flex w-full items-center justify-start gap-2">
      <div>
        <IoIosArrowForward size={20} />
        <GoDash size={20} />
      </div>
      <h1 className="text-xl">Yosef Sabag</h1>
    </div>
  );
};

export default Logo;
