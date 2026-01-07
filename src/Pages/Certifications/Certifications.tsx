import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp } from 'lucide-react';
import { AnimatedPage } from '@/Components/AnimatedPage/AnimatedPage';
import CertificationCards from './CertificationsCards/CertificationCards';
import { staggerContainer, staggerItem } from '@/animations/variants';

const Certifications = () => {
  useEffect(() => {
    document.title = 'Certifications';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <AnimatedPage className="flex w-full flex-col items-center px-4 pb-20">
      <motion.header
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mb-12 pt-32 text-center"
      >
        <motion.div
          variants={staggerItem}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#05df72]/20 to-[#00d9ff]/20 shadow-lg shadow-[#05df72]/10"
        >
          <Award className="h-8 w-8 text-[#05df72]" />
        </motion.div>

        <motion.h1
          variants={staggerItem}
          className="mb-4 text-4xl font-medium tracking-tight text-[var(--text-primary)] md:text-5xl"
        >
          Certifications
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="mx-auto max-w-lg text-lg text-[var(--text-secondary)]"
        >
          Professional certifications and courses completed to enhance technical
          expertise and stay current with industry standards
        </motion.p>

        <motion.div
          variants={staggerItem}
          className="mt-6 flex items-center justify-center gap-2 text-sm text-[var(--text-muted)]"
        >
          <TrendingUp size={16} className="text-[#05df72]" />
          <span>Continuous learning • Constant growth</span>
        </motion.div>
      </motion.header>

      <CertificationCards />
    </AnimatedPage>
  );
};

export default Certifications;
