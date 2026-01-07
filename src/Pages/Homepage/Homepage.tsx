import { AnimatedPage } from '@/Components/AnimatedPage/AnimatedPage';
import Hero from './Hero/Hero';
import PassionSection from './PassionSection/PassionSection';
import WhoAmI from './WhoAmI/WhoAmI';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Homepage = () => {
  useEffect(() => {
    document.title = 'Joseph Sabag | AI Software Engineer';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <AnimatedPage className="flex w-full flex-col items-center gap-2 px-4 pb-20">
      <Hero />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl py-8"
      >
        <img
          src="/images-of-me/hero-image.svg"
          alt="Joseph Sabag illustration"
          className="h-auto w-full"
          width={768}
          height={500}
        />
      </motion.div>
      <PassionSection />
      <WhoAmI />
    </AnimatedPage>
  );
};

export default Homepage;
