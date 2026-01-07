import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
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
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 bottom-0 left-0 z-50 sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:w-[90%] sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2"
          >
            <div className="group relative overflow-hidden rounded-t-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl sm:rounded-2xl">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#05df72]/5 via-transparent to-[#00d9ff]/5" />

              <motion.button
                type="button"
                onClick={onClose}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--bg-surface)] text-[var(--text-muted)] transition-all hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                aria-label="Close dialog"
              >
                <X size={16} />
              </motion.button>

              <div className="flex flex-col lg:flex-row">
                <div className="relative hidden h-64 overflow-hidden lg:block lg:h-auto lg:w-48">
                  <img
                    src="/images-of-me/hero-image.svg"
                    alt="Joseph Sabag"
                    className="h-full w-full object-cover object-center"
                    width={192}
                    height={256}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--bg-card)]" />
                </div>

                <div className="relative flex-1 space-y-5 p-6 sm:p-8">
                  <div className="flex items-center justify-center lg:hidden">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="w-24"
                    >
                      <img
                        src="/images-of-me/hero-image.svg"
                        alt="Joseph Sabag"
                        className="h-auto w-full"
                        width={96}
                        height={96}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2 text-center"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles size={14} className="text-[#05df72]" />
                      <p className="text-xs font-bold tracking-widest text-[#05df72] uppercase">
                        Welcome Back
                      </p>
                      <Sparkles size={14} className="text-[#05df72]" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                      Let's Build Something
                    </h2>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/50 p-4"
                  >
                    <p className="text-center text-sm leading-relaxed text-[var(--text-muted)]">
                      From{' '}
                      <span className="font-medium text-[#00d9ff]">
                        AI-powered tools
                      </span>{' '}
                      to{' '}
                      <span className="font-medium text-[#05df72]">
                        automation systems
                      </span>{' '}
                      — if it can be built, I can build it.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-3"
                  >
                    <Link
                      to="https://wa.me/546187549"
                      target="_blank"
                      onClick={onClose}
                      className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-[#05df72] px-6 py-3.5 font-semibold text-black transition-all hover:bg-[#04c566] hover:shadow-[0_0_30px_rgba(5,223,114,0.4)]"
                    >
                      <FaWhatsapp size={20} />
                      <span>Start a Conversation</span>
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover/btn:translate-x-1"
                      />
                    </Link>

                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full rounded-xl border border-[var(--border-subtle)] bg-transparent px-6 py-3 text-sm text-[var(--text-muted)] transition-all hover:border-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                    >
                      Maybe later
                    </button>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-[10px] text-[var(--text-dim)]"
                  >
                    This message won't appear again for 7 days
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReturnVisitorDialog;
