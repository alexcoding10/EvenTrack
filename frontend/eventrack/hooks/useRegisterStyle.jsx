import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { useDesktopCalc } from "./useDesktopState";

// Función para obtener estilos responsivos

export const useRegisterStyles = () => {
    const isDesktop = useDesktopCalc();

    const stylesDesktop = StyleSheet.create({
              container: {
                flex: 1,
                backgroundColor: "#09021C",
                flexDirection: "row",
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
                fontSize: 100,
                textAlign: "center",
              },
              input: {
                minWidth: 230,
                width: 1000,
                height: 70,
                borderBottomColor: "#fff",
                borderBottomWidth: 1,
                paddingLeft: 10,
                color: "#fff",
                fontSize: 28,
              },
              iconInput: {
                borderColor: "#fff",
                borderBottomWidth: 1,
                height: 70,
                width: 30,
                justifyContent: "center",
                alignItems: "center",
              },
              formu: {
                flex: 1,
                // Uncomment the following styles as needed
                // borderWidth: 1,
                // borderColor: "#fff",
                // borderRadius: 24,
                // padding: 20,
                // backgroundColor: "rgba(51, 51, 51, 0.7)",
                // margin: 120,
                // marginBottom: 130,
                // justifyContent: "center",
              },
              containerMain: {
                flex: 1,
                justifyContent: "center",
              },
              containerLabel: {
                flex: 0.5,
                width: "100%",
                paddingHorizontal: 200,
                justifyContent: "flex-end",
                gap: 60,
                marginBottom: 100,
              },
              containerBtn: {
                flex: 0.5,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 30,
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
                minWidth: "50%",
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
    const stylesMobile = StyleSheet.create({
              container: {
                flex: 1,
                backgroundColor: "#09021C",
                flexDirection: "column",
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
                fontSize: 45,
                textAlign: "center",
              },
              input: {
                minWidth: "70%",
                width: "70%",
                height: 30,
                borderBottomColor: "#fff",
                borderBottomWidth: 1,
                paddingLeft: 10,
                color: "#fff",
                fontSize: 14,
              },
              iconInput: {
                borderColor: "#fff",
                borderBottomWidth: 1,
                height: 30,
                width: 30,
                justifyContent: "center",
                alignItems: "center",
              },
              formu: {
                flex: 1,
                // Uncomment the following styles as needed
                // borderWidth: 1,
                // borderColor: "#fff",
                // borderRadius: 24,
                // padding: 20,
                // backgroundColor: "rgba(51, 51, 51, 0.7)",
                // margin: 20,
                // marginBottom: 100,
                // justifyContent: "center",
              },
              containerMain: {
                flex: 0.5,
                justifyContent: "center",
              },
              containerLabel: {
                flex: 0.5,
                width: "100%",
                paddingHorizontal: 20,
                justifyContent: "space-evenly",
                gap: 0,
                marginBottom: 0,
              },
              containerBtn: {
                flex: 0.5,
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                gap: 0,
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
                minWidth: "50%",
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

    return isDesktop? stylesDesktop : stylesMobile;
};
