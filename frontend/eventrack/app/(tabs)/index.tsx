import React, { useState } from "react";
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
import { URL_API } from "@/util/db.config";

export default function HomeScreen() {
  // declaración de variables
  const [user, setUser] = useState({ email: "", password: "" });

  const handlerForm = (text: string, input: string) => {
    setUser((prevState) => ({
      ...prevState,
      [input]: text, // actualiza el campo específico según el nombre
    }));
  };

  const handleLogin = ()=>{
    fetch(URL_API + "/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', // Indicamos que estamos enviando JSON
      },
      body:JSON.stringify(user)
    })
    .then((res)=> res.json())  // parseo la respuesta
    .then((data)=>{
      // si la respuesta es ok se cageria el id del usuario y se guardaría en localhost
      // se enviaria a nueva pagina

      console.log({"respuesta": data})
    })
    .catch((err)=>{
      console.error('Error:', err);
    })
  }

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
    textBtn,
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
              placeholder="email"
              placeholderTextColor={"rgba(250,250,250,0.5)"}
              style={[input]}
              value={user.email}
              onChangeText={(text) => handlerForm(text, "email")}
            />
          </View>

          <View style={[labelFormu]}>
            <View style={iconInput}>
              <PasswordIcon />
            </View>
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={"rgba(250,250,250,0.5)"}
              style={[input]}
              value={user.password}
              onChangeText={(text) => handlerForm(text, "password")}
            />
          </View>
        </View>

        <View style={containerBtn}>
          <TouchableOpacity
            style={[btn, { backgroundColor: "#140633" }]}
            activeOpacity={0.7} // Cambia la opacidad al tocar
            accessible={true}
            accessibilityLabel="Log in"
            onPress={handleLogin}
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
