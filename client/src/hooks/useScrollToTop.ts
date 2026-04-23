import { useEffect } from "react";

export const useScrollToTop = (): void => {
 useEffect(() => {
 window.scrollTo({ top: 0, behavior: "smooth" });
 }, []);
};
