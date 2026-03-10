import { Github, Linkedin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { FaDiscord, FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";

export type IconItem = {
  label: string;
  icon: React.ReactNode;
  hoverColor?: string;
  href?: string;
};

const ICON_SIZE = 18;
const WHATSAPP_NUMBER = "546187549";

const socials: IconItem[] = [
  {
    label: "GitHub",
    href: "https://github.com/YosefHayim",
    icon: <Github size={ICON_SIZE} />,
    hoverColor: "group-hover:text-white",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yosef-hayim-sabag/",
    icon: <Linkedin size={ICON_SIZE} />,
    hoverColor: "group-hover:text-[#0A66C2]",
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: <FaWhatsapp size={ICON_SIZE} />,
    hoverColor: "group-hover:text-[#05df72]",
  },
  {
    label: "Discord",
    href: "https://discord.com/users/josephsabag",
    icon: <FaDiscord size={ICON_SIZE} />,
    hoverColor: "group-hover:text-[#5865F2]",
  },
  {
    label: "Contact",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: <MessageCircle size={ICON_SIZE} />,
    hoverColor: "group-hover:text-[#00d9ff]",
  },
];

type SocialIconsProps = {
  className?: string;
  showLabels?: boolean;
  variant?: "default" | "minimal";
  items?: IconItem[];
  forceShowLabels?: boolean;
};

export function SocialIcons({
  className,
  showLabels = false,
  variant = "default",
  items,
  forceShowLabels = false,
}: SocialIconsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const displayItems = items ?? socials;

  const containerStyles =
    variant === "default"
      ? "gap-0.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-1.5 py-1.5"
      : "gap-2";

  return (
    <div
      className={cn(
        "relative flex w-fit items-center",
        containerStyles,
        className,
      )}
    >
      {variant === "default" && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent" />
      )}

      {displayItems.map((item, index) => {
        const isActive = hoveredIndex === index;
        const labelVisible = forceShowLabels || (showLabels && isActive);

        const inner = (
          <>
            <span
              className={cn(
                "absolute inset-1 rounded-lg bg-white/[0.08] transition-all duration-300 ease-out",
                isActive ? "scale-100 opacity-100" : "scale-90 opacity-0",
              )}
            />
            <span
              className={cn(
                "relative z-10 transition-all duration-300 ease-out",
                isActive ? "scale-110" : "",
                isActive ? "" : "text-[var(--text-muted)]",
                item.hoverColor,
              )}
            >
              {item.icon}
            </span>
            <span
              className={cn(
                "absolute bottom-1.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-out",
                isActive ? "w-3 opacity-100" : "w-0 opacity-0",
              )}
            />
            {(showLabels || forceShowLabels) && (
              <span
                className={cn(
                  "absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg bg-[var(--text-primary)] px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-[var(--bg-void)] transition-all duration-300 ease-out",
                  labelVisible
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-1 opacity-0",
                )}
              >
                {item.label}
                <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-[var(--text-primary)]" />
              </span>
            )}
          </>
        );

        return item.href ? (
          <a
            aria-label={item.label}
            className="group relative flex items-center justify-center rounded-xl transition-colors duration-200"
            href={item.href}
            key={item.label}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            rel="noopener noreferrer"
            style={{ width: 40, height: 40 }}
            target="_blank"
          >
            {inner}
          </a>
        ) : (
          <span
            aria-label={item.label}
            className="group relative flex cursor-default items-center justify-center rounded-xl transition-colors duration-200"
            key={item.label}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ width: 40, height: 40 }}
          >
            {inner}
          </span>
        );
      })}
    </div>
  );
}
