import { useEffect } from "react";

const NotFound404 = () => {
  useEffect(() => {
    document.title = "404";
  }, []);
  return <div></div>;
};

export default NotFound404;
