import { useEffect } from 'react';
import { AnimatedPage } from '@/Components/AnimatedPage/AnimatedPage';
import Hero from './Hero/Hero';
import PassionSection from './PassionSection/PassionSection';
import WhoAmI from './WhoAmI/WhoAmI';

const Homepage = () => {
  useEffect(() => {
    document.title = 'Joseph Sabag | Full-Stack Developer';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <AnimatedPage className="flex w-full flex-col items-center gap-20 px-4 pb-20">
      <Hero />
      <PassionSection />
      <WhoAmI />
    </AnimatedPage>
  );
};

export default Homepage;
