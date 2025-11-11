import { useEffect } from 'react';
import Hero from './Hero/Hero';
import WhoAmI from './WhoAmI/WhoAmI';
import HeroThreeD from './HeroThreeD';

const Homepage = () => {
  useEffect(() => {
    document.title = 'Homepage';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  return (
    <>
      {/* 3D Hero Background */}
      <HeroThreeD />

      {/* Original 2D content with adjusted z-index for layering */}
      <div className="relative z-10 flex w-full flex-col gap-10 p-5 pt-[15%] md:pt-[5%]">
        <Hero />
        <WhoAmI />
      </div>
    </>
  );
};

export default Homepage;
