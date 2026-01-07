import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FaWhatsapp } from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { Link } from 'react-router';

type ReturnVisitorDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ReturnVisitorDialog: React.FC<ReturnVisitorDialogProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 shadow-2xl">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#05df72]/10 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#00d9ff]/10 blur-3xl" />

              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 rounded-full p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                aria-label="Close dialog"
              >
                <IoClose size={20} />
              </button>

              <div className="relative flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#05df72]/10"
                >
                  <HiOutlineSparkles className="text-3xl text-[#05df72]" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-2 text-2xl font-bold text-[var(--text-primary)]"
                >
                  Welcome back!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6 text-[var(--text-secondary)]"
                >
                  Great to see you again. I noticed you've visited before - that
                  means you might be interested in what I do.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4"
                >
                  <p className="text-sm text-[var(--text-muted)] italic">
                    "I turn complex problems into elegant solutions. From
                    trading bots to AI-powered tools - if it can be automated, I
                    can build it."
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex w-full flex-col gap-3"
                >
                  <Link
                    to="https://wa.me/546187549"
                    target="_blank"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#05df72] px-6 py-3 font-semibold text-black transition-all hover:bg-[#04c566] hover:shadow-[0_0_20px_rgba(5,223,114,0.3)]"
                  >
                    <FaWhatsapp size={20} />
                    Let's Create Something Amazing
                  </Link>

                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl px-6 py-3 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
                  >
                    Maybe later
                  </button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-4 text-xs text-[var(--text-dim)]"
                >
                  This message won't appear again for 7 days
                </motion.p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReturnVisitorDialog;
