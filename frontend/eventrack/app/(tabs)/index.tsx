import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import PasswordIcon from "@/components/passwordIcon";
import EmailIcon from "@/components/emailIcon";
import Background from "@/components/background";
import { useGlobalStyle } from "@/hooks/useGlobalStyle";

export default function HomeScreen() {
  const {
    container,
    containerBtn,
    containerMain,
    formu,
    textLogo,
    containerLabel,
    labelFormu,
    iconInput,
    input,
    btn,
    textBtn
  } = useGlobalStyle();

  return (
    <View style={container}>
      <StatusBar style="light" backgroundColor="#09021C" />
      <Background />
      <View style={containerMain}>
        <Text style={[textLogo]}>EvenTrack</Text>
      </View>

      <View style={formu}>
        <View style={[containerLabel]}>
          <View style={[labelFormu]}>
            <View style={iconInput}>
              <EmailIcon />
            </View>
            <TextInput
              placeholder="username"
              placeholderTextColor={"rgba(250,250,250,0.5)"}
              style={[input]}
              underlineColorAndroid='transparent'
              onFocus={(e:any) => e.target.style.outline = 'none'} // Para la web
            />
          </View>

          <View style={[labelFormu]}>
            <View style={iconInput}>
              <PasswordIcon />
            </View>
            <TextInput
              placeholder="password"
              secureTextEntry={true}
              placeholderTextColor={"rgba(250,250,250,0.5)"}
              style={[input]}
              underlineColorAndroid='transparent'
              onFocus={(e:any) => e.target.style.outline = 'none'}
            />
          </View>
        </View>

        <View style={containerBtn}>
          <TouchableOpacity
            style={[btn, { backgroundColor: "#140633" }]}
            activeOpacity={0.7} // Cambia la opacidad al tocar
            accessible={true}
            accessibilityLabel="Log in"
          >
            <Text style={[textBtn, { color: "#AE75FF" }]}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[btn, { backgroundColor: "#333" }]}
            activeOpacity={0.7} // Cambia la opacidad al tocar
            accessible={true}
            accessibilityLabel="Sign Up"
          >
            <Text style={[textBtn, { color: "#FFF" }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Estilos generales (aquí podrías incluir tus estilos específicos)
const styles = StyleSheet.create({
  box: {
    width: "100%",
  },
  statusBarBackground: {
    height: 44, // Altura estándar de la barra de estado en iOS
    backgroundColor: "#09021C", // Color de fondo deseado
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});
