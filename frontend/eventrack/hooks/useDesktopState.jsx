// useIsDesktop.js
import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

export const useDesktopCalc = () => {
  const [isDesktop, setIsDesktop] = useState(Dimensions.get("window").width > 865);
  
  useEffect(() => {
    const updateDimensions = ({ window }) => {
      setIsDesktop(window.width > 865);
    };

    const subscription = Dimensions.addEventListener("change", updateDimensions);
    return () => subscription?.remove();
  }, []);

  return isDesktop;
};
