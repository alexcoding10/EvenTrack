import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

// Función para obtener estilos responsivos
export const useGlobalStyle = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const isDesktop = dimensions.width > 865;

  return StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#09021C",
        flexDirection: isDesktop ? "row" : "column",
      },
      background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
      },
      textLogo: {
        color: "#E9D4FF",
        fontSize: isDesktop ? 100 : 45,
        textAlign: "center",
      },
      input: {
        minWidth: isDesktop ? 230 : "70%",
        width: isDesktop ? 1000 : "70%", 
        height: isDesktop ? 70 : 30,
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        paddingLeft: 10,
        color: "#fff",
        fontSize : isDesktop ? 28 : 14,
      },
      iconInput: {
        borderColor: "#fff",
        borderBottomWidth: 1,
        height: isDesktop ? 70: 30,
        width: 30,
        justifyContent: "center",
        alignItems: "center",
      },
      formu: {
        flex: isDesktop ? 1 : 1,
        // borderWidth: isDesktop ? 1 : 1,
        // borderColor: "#fff",
        borderRadius: 24,
        padding: 20,
        backgroundColor: "rgba(51, 51, 51, 0.7)",
        margin: isDesktop ? 120 : 20,
        marginBottom: isDesktop ? 130 : 100,
        justifyContent: "center",
      },
      containerMain: {
        flex: isDesktop ? 1 : 0.5,
        justifyContent: "center",
      },
      containerLabel: {
        flex: 0.5,
        width: "100%",
        paddingHorizontal: isDesktop ? 200 : 20,
        justifyContent: isDesktop ? "flex-end" : "space-evenly",
        gap: isDesktop ? 60 : 0,
        marginBottom: isDesktop ? 100 : 0,
      },
      containerBtn: {
        flex: 0.5,
        flexDirection: "column",
        justifyContent: isDesktop ? "flex-start" : "space-evenly",
        alignItems: "center",
        gap: isDesktop ? 30 : 0,
      },
      labelFormu: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },
      box: {
        width: "100%",
        alignContent: "center",
      },
      btn: {
        minWidth: '50%',
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 24,
      },
      textBtn: {
        fontSize: 24,
      },
      statusBarBackground: {
        height: 44,
        backgroundColor: "#09021C",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
      },
      areaLogo: {
        flex: 1.3,
        justifyContent: "center",
      },
    });
  };