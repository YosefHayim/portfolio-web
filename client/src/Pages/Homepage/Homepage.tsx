import Hero from "./Hero/Hero";
import WhoAmI from "./WhoAmI/WhoAmI";

const Homepage = () => {
  return (
    <div className="flex flex-col gap-10">
      <Hero />
      <WhoAmI />
    </div>
  );
};

export default Homepage;
