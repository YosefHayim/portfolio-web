import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ExternalLink,
  FileText,
  FolderGit2,
  Github,
  GitCommitHorizontal,
  Mail,
  Smartphone,
  Star,
} from "lucide-react";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { useState, type ReactNode } from "react";
import { AnimatedPage } from "@/Components/AnimatedPage/AnimatedPage";
import { SEO } from "@/Components/SEO/SEO";
import {
  coreTechStack,
  experienceItems,
  featuredOffGitHubProjects,
  recruiterProfile,
} from "@/content/profile";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/Components/ui/tooltip";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { useGitHubStats } from "@/hooks/useGitHubStats";
import { cn } from "@/lib/utils";
import { getTechIcon } from "@/utils/techIcons";

const sectionTitleClass =
  "text-2xl font-semibold tracking-tight  md:text-3xl";

const SOCIAL_ICON_SIZE = 14;

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });
};

const SectionBlock = ({
  id,
  title,
  description,
  className,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <section className={cn("w-full max-w-6xl scroll-mt-28", className)} id={id}>
      <header className="space-y-2 pb-3">
        <h2 className={sectionTitleClass}>{title}</h2>
        {description && (
          <p className="max-w-3xl text-sm text-[var(--text-secondary)] md:text-base">
            {description}
          </p>
        )}
      </header>
      {children}
    </section>
  );
};

const TechIconChip = ({ tech }: { tech: string }) => {
  const icon = getTechIcon(tech);
  const fallbackLabel = tech
    .split(/[\s-/]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          aria-label={tech}
          className="inline-flex size-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-void)]/50 text-[var(--text-secondary)]"
        >
          {icon ?? <span className="text-[10px] font-semibold">{fallbackLabel || "?"}</span>}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={8}>
        {tech}
      </TooltipContent>
    </Tooltip>
  );
};

const LogoBadge = ({ src, alt, monogram, icon }: {
  src?: string;
  alt: string;
  monogram?: string;
  icon: ReactNode;
}) => {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <span className="inline-flex size-8 items-center justify-center overflow-hidden rounded-full border border-[var(--border-subtle)] bg-[var(--bg-void)]/40">
      {showImage ? (
        <img
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
          src={src}
        />
      ) : (
        <span className="inline-flex items-center justify-center text-[10px] font-semibold ">
          {monogram || icon}
        </span>
      )}
    </span>
  );
};

const OnePagePortfolio = () => {
  const { stats } = useGitHubStats();
  const {
    projects,
    isLoading: isProjectsLoading,
    error: projectsError,
    refetch,
  } = useGitHubProjects(recruiterProfile.githubUsername);
  const contactEmail = recruiterProfile.contactEmail || "yosefisabag@gmail.com";
  const stackedTechLoop = [
    ...coreTechStack,
    ...coreTechStack,
    ...coreTechStack,
    ...coreTechStack,
    ...coreTechStack,
    ...coreTechStack,
    ...coreTechStack,
    ...coreTechStack,
  ];

  const heroStats = [
    {
      icon: <FolderGit2 size={14} className="text-[#7ff7af]" />,
      label: "Repositories",
      tooltip: "Total public repositories on GitHub",
      value: stats?.totalRepos ?? "--",
    },
    {
      icon: <Star size={14} className="text-[#7ff7af]" />,
      label: "Stars",
      tooltip: "Total stars across public repositories",
      value: stats?.totalStars ?? "--",
    },
    {
      icon: <GitCommitHorizontal size={14} className="text-[#7ff7af]" />,
      label: "Commits",
      tooltip: "Total public GitHub commits",
      value: stats?.totalCommits ?? "--",
    },
  ] as const;

  const socialLinks = [
    {
      label: "LinkedIn",
      href: recruiterProfile.linkedinUrl,
      icon: <FaLinkedinIn size={SOCIAL_ICON_SIZE} className="text-[#0A66C2]" />,
    },
    {
      label: "GitHub",
      href: `https://github.com/${recruiterProfile.githubUsername}`,
      icon: <FaGithub size={SOCIAL_ICON_SIZE} className="text-[#f1f5f9]" />,
    },
    {
      label: "WhatsApp",
      href: recruiterProfile.whatsappUrl,
      icon: <FaWhatsapp size={SOCIAL_ICON_SIZE} className="text-[#25D366]" />,
    },
    {
      label: "CV",
      href: recruiterProfile.resumeUrl,
      icon: <FileText size={SOCIAL_ICON_SIZE} className="text-[#7ff7af]" />,
    },
    {
      label: "Email",
      href: `mailto:${contactEmail}`,
      icon: <Mail size={SOCIAL_ICON_SIZE} className="text-[#f7c76b]" />,
    },
  ] as const;

  return (
    <>
      <SEO
        description="Joseph Sabag, AI Software Engineer. Fast recruiter overview with core projects, stack, and direct contact."
        keywords={[
          "Joseph Sabag",
          "AI Software Engineer",
          "Recruiter Portfolio",
          "React",
          "Node.js",
          "TypeScript",
          "GitHub Projects",
        ]}
        title="Portfolio"
        url="/"
      />

      <AnimatedPage className="flex w-full flex-col items-center gap-6 px-2 py-4 md:gap-8 md:px-3 md:py-6">
        <section
          className="w-full max-w-6xl rounded-3xl p-2"
          id="home"
        >
          <div className="grid gap-2 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div className="flex flex-col gap-2 rounded-2xl p-2">
              <h1 className="max-w-3xl text-2xl leading-tight font-semibold  md:text-4xl">
                {recruiterProfile.name}
              </h1>
              <p className="inline-flex items-center gap-2 text-sm font-medium text-[#9fdab6] md:text-base">
                <BriefcaseBusiness size={15} />
                {recruiterProfile.role}
              </p>
              <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
                {recruiterProfile.shortBio}
              </p>

              <div className="grid gap-2 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <Tooltip key={stat.label}>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2">
                        <div
                          aria-label={stat.label}
                          className="inline-flex items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-void)]/40 p-2"
                          role="img"
                        >
                          {stat.icon}
                        </div>
                        <p className="text-xl font-semibold ">
                          {stat.value}
                        </p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={8}>
                      {stat.label}: {stat.tooltip}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <a
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] p-2 text-xs font-medium  transition hover:border-[#05df72]/50 hover:bg-[#05df72]/10"
                    href={social.href}
                    key={social.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="inline-flex items-center justify-center rounded-full bg-[var(--bg-void)]/40 p-2">
                      {social.icon}
                    </span>
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-2" id="contact">
              <div className="mx-auto h-full w-full max-w-[340px] lg:max-w-none">
                <img
                  alt="Joseph Sabag"
                  className="h-full max-h-[460px] w-full rounded-2xl object-contain p-0"
                  src="/images-of-me/hero-image.svg"
                />
              </div>
            </div>
          </div>

        </section>

        <SectionBlock id="stack" title="Tech Stack">
          <div className="stack-marquee w-full">
            <div className="stack-marquee-track">
              {stackedTechLoop.map((tech, index) => (
                <TechIconChip key={`left-${tech}-${index}`} tech={tech} />
              ))}
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="experience" title="Experience">
          <div className="grid gap-2 md:grid-cols-2">
            {experienceItems.map((item) => (
              <article
                className="flex flex-col gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2"
                key={item.id}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex items-center gap-2">
                    <LogoBadge
                      alt={`${item.company} logo`}
                      icon={<Building2 size={14} />}
                      monogram={item.logoMonogram}
                      src={item.logoUrl}
                    />
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold ">
                        {item.companyUrl ? (
                          <a
                            className="inline-flex items-center gap-2 hover:text-[#7ff7af]"
                            href={item.companyUrl}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <span className="truncate">{item.company}</span>
                          </a>
                        ) : (
                          <span className="truncate">{item.company}</span>
                        )}
                      </h3>
                      <p className="text-xs ">{item.role}</p>
                    </div>
                  </div>
                  <p className="inline-flex shrink-0 items-center gap-2 text-xs ">
                    <CalendarDays size={12} />
                    {item.dateRange}
                  </p>
                </div>
                <ul className="grid gap-2 text-sm text-[var(--text-secondary)]">
                  {item.bullets.map((bullet) => (
                    <li className="line-clamp-3" key={`${item.id}-${bullet}`}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="mobile-projects" title="Mobile Projects">
          <div className="grid gap-2 md:grid-cols-2">
            {featuredOffGitHubProjects.map((project) => (
              <motion.article
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2"
                initial={{ opacity: 0, y: 12 }}
                key={project.id}
                transition={{ duration: 0.24 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex w-full items-start justify-between gap-2">
                    <div className="min-w-0 flex items-center gap-2">
                      <LogoBadge
                        alt={`${project.name} logo`}
                        icon={<Smartphone size={14} />}
                        monogram={project.logoMonogram}
                        src={project.logoUrl}
                      />
                      <h3 className="text-lg font-semibold ">
                        {project.url ? (
                          <a
                            className="inline-flex items-center gap-2 hover:text-[#7ff7af]"
                            href={project.url}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <span className="truncate">{project.name}</span>
                          </a>
                        ) : (
                          <span className="truncate">{project.name}</span>
                        )}
                      </h3>
                      <p className="inline-flex items-center gap-2 text-xs">
                        <CalendarDays size={12} />
                        {project.dateRange}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {!project.url && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] p-2 text-xs ">
                          {project.status}
                        </span>
                      )}
                      {project.url && (
                        <a
                          className="inline-flex items-center gap-2 rounded-md border border-[var(--border-subtle)] p-2 text-xs  hover:border-[#05df72]/50"
                          href={project.url}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <ExternalLink size={14} />
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <p className="line-clamp-3 text-sm text-[var(--text-secondary)]">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <TechIconChip key={`${project.id}-${tech}`} tech={tech} />
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="projects" title="Featured Projects">
          {isProjectsLoading && (
            <p className="text-sm ">Loading GitHub projects...</p>
          )}

          {projectsError && (
            <div className=" flex flex-wrap items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2 text-sm ">
              <span>Using cached fallback data right now.</span>
              <button
                className="rounded-md border border-[var(--border-subtle)] p-2  hover:border-[#05df72]/50"
                onClick={refetch}
                type="button"
              >
                Retry
              </button>
            </div>
          )}

          <div className="grid gap-2 md:grid-cols-2">
            {projects.map((project) => (
              <motion.article
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2"
                initial={{ opacity: 0, y: 12 }}
                key={project.id}
                transition={{ duration: 0.24 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className=" flex items-start justify-between gap-2">
                  <div className="flex w-full items-start justify-between gap-2">
                    <div className="min-w-0 flex items-center gap-2">
                      <h3 className="text-lg font-semibold ">
                        <a
                          className="inline-flex items-center gap-2 hover:text-[#7ff7af]"
                          href={project.repoUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <Github size={16} />
                          <span className="truncate">{project.name}</span>
                        </a>
                      </h3>
                      <p className=" inline-flex items-center gap-2 text-xs">
                        <CalendarDays size={12} />
                        Updated {formatDate(project.updatedAt)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {project.stars > 0 && <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] p-2 text-xs  text-green-500">
                        <Star size={12} color="#05df72" />
                        {project.stars}
                      </span>}
                      <a
                        className="inline-flex items-center gap-2 rounded-md border border-[var(--border-subtle)] p-2 text-xs  hover:border-[#05df72]/50"
                        href={project.deployedUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <ExternalLink size={14} />
                        Live
                      </a>
                    </div>
                  </div>
                </div>

                <p className=" line-clamp-3 text-sm text-[var(--text-secondary)]">
                  {project.description}
                </p>

                <div className=" flex flex-wrap gap-2">
                  {project.techStack.slice(0, 6).map((tech) => (
                    <TechIconChip key={`${project.id}-${tech}`} tech={tech} />
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </SectionBlock>
      </AnimatedPage>
    </>
  );
};

export default OnePagePortfolio;
