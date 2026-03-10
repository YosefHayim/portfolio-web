import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router";
import { getCategoryConfig, type BlogPost } from "@/data/blog";

export const RelatedPostCard = ({ post }: { post: BlogPost }) => {
  const categoryConfig = getCategoryConfig(post.category);
  const formattedDate = format(new Date(post.publishedAt), "MMM d, yyyy");

  return (
    <Link to={`/blog/${post.slug}`}>
      <motion.article
        className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] transition-all duration-300 hover:border-[var(--border-hover)] hover:shadow-[0_0_30px_rgba(5,223,114,0.08)]"
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-60" />
          <div className="absolute top-3 right-3">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm ${categoryConfig.bgColor}`}
            >
              {categoryConfig.label}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-1.5">
              <Calendar size={12} />
              {formattedDate}
            </div>
            <span className="text-[var(--border-default)]">|</span>
            <div className="flex items-center gap-1.5">
              <Clock size={12} />
              {post.readingTime} min
            </div>
          </div>

          <h3 className="line-clamp-2 text-lg leading-tight font-medium text-[var(--text-primary)] transition-colors group-hover:text-[#05df72]">
            {post.title}
          </h3>

          <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
            {post.excerpt}
          </p>
        </div>
      </motion.article>
    </Link>
  );
};
