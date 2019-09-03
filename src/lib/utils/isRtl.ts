import { useCallback, useState } from "react";

export const useIsLtr = () => {
  const [isLtr, setIsLtr] = useState(true);
  const ref: any = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setIsLtr((node ? getComputedStyle(node).direction : "ltr") !== "rtl");
    }
  }, []);
  return [isLtr, ref];
};
