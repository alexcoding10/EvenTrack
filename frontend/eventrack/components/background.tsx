import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import Svg, { Path, Defs, RadialGradient, Stop } from "react-native-svg";
import Constants from 'expo-constants';

export default function Background() {
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const statusBarHeight = Constants.statusBarHeight + 5;

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  // Función para renderizar el SVG basado en el ancho
  const renderSVG = () => {
    if (dimensions.width > 1) {
      return (
        <Svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox="0 0 600 950"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
        <Path fill="url(#a)" d="M0 0h1440v1024H0z" />
          <Defs>
            <RadialGradient
              id="a"
              cx={0}
              cy={0}
              r={1}
              gradientTransform="matrix(0 -1024 1356.23 0 720 1024)"
              gradientUnits="userSpaceOnUse"
            >
              <Stop />
              <Stop offset={0.57} stopColor="#040404" />
              <Stop offset={0.59} stopColor="#B46DFF" />
              <Stop offset={0.619} stopColor="#21055B" />
              <Stop offset={0.77} stopColor="#0E0227" />
              <Stop offset={1} stopColor="#09021C" />
            </RadialGradient>
          </Defs>
        </Svg>
      );
    } else {
      return (
        <Svg
          width={dimensions.width}
          height={dimensions.height}
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <Path fill="url(#a)" d="M0 0h440v956H0z" />
          <Defs>
            <RadialGradient
              id="a"
              cx={0}
              cy={0}
              r={1}
              gradientTransform="matrix(0 -699.5 533.402 0 220 699.5)"
              gradientUnits="userSpaceOnUse"
            >
              <Stop />
              <Stop offset={0.57} stopColor="#040404" />
              <Stop offset={0.59} stopColor="#B46DFF" />
              <Stop offset={0.619} stopColor="#21055B" />
              <Stop offset={0.77} stopColor="#0E0227" />
              <Stop offset={1} stopColor="#09021C" />
            </RadialGradient>
          </Defs>
        </Svg>
      );
    }
  };

  return (
    <View style={{ position: 'absolute', top: -statusBarHeight, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
      {renderSVG()}
    </View>
  );
}
