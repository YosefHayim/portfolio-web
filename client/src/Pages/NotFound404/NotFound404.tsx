import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { SEO } from "@/Components/SEO/SEO";

const NotFound404 = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <>
      <SEO
        description="The page you're looking for doesn't exist. Redirecting to homepage."
        noindex
        title="404 - Page Not Found"
      />
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="relative">
          <span className="text-[150px] font-bold leading-none text-gray-800 md:text-[200px]">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[150px] font-bold leading-none text-transparent [-webkit-text-stroke:2px_#05df72] md:text-[200px]">
              404
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-white md:text-3xl">
          Page Not Found
        </h1>

        <p className="max-w-md text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-gray-500">
            Redirecting to homepage in{" "}
            <span className="font-mono text-[#05df72]">{countdown}</span>{" "}
            seconds...
          </p>

          <div className="flex gap-3">
            <Link
              className="rounded-lg border border-gray-700 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-gray-600 hover:bg-gray-800"
              to="/"
            >
              Go Home Now
            </Link>
            <button
              className="rounded-lg bg-[#05df72] px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[#04c765]"
              onClick={() => navigate(-1)}
              type="button"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound404;
