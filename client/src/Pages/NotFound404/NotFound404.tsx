import { useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router";

const NotFound404 = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "404";

    const timeout = setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="p-2">
      <GoDotFill size={28} className="text-red-400" />
      <p>This is 404 error page.</p>
    </div>
  );
};

export default NotFound404;
