import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

import { Button } from "../ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router";

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
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-4 bottom-4 left-4 z-50 sm:top-1/2 sm:right-auto sm:bottom-auto sm:left-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2"
          >
            <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
              <div className="flex flex-col sm:flex-row">
                <div className="hidden shrink-0 sm:block sm:w-44">
                  <img
                    src="/images-of-me/hero-image.svg"
                    alt="Joseph Sabag"
                    width={176}
                    height={280}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1 p-6 sm:p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-5 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <p className="text-xs font-medium tracking-wider text-[#05df72] uppercase">
                        You're back
                      </p>
                      <h2 className="text-xl leading-tight font-semibold tracking-tight text-[var(--text-primary)] sm:text-2xl">
                        I don't wait for opportunities.{" "}
                        <span className="text-[var(--text-muted)]">
                          I create them.
                        </span>
                      </h2>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      aria-label="Close dialog"
                    >
                      <X size={14} />
                    </Button>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6 text-sm leading-relaxed text-[var(--text-secondary)]"
                  >
                    That t-shirt you see? I wore it to a job fair — no resume,
                    no pitch. Just a QR code linking to my work.{" "}
                    <span className="text-[var(--text-primary)]">
                      Left with three offers.
                    </span>
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-3"
                  >
                    <Link
                      to="https://wa.me/546187549"
                      target="_blank"
                      onClick={onClose}
                      className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#05df72] px-5 py-3 font-medium text-black transition-all hover:bg-[#04c566]"
                    >
                      <FaWhatsapp size={18} />
                      <span>Let's talk</span>
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>

                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full rounded-xl py-2.5 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
                    >
                      Maybe later
                    </button>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-5 text-center text-[10px] text-[var(--text-dim)]"
                  >
                    Won't bug you again for 7 days
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
