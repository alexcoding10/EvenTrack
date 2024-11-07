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
import { useLogingStyle } from "@/hooks/useLogingStyle";
import { useRegisterStyles } from "@/hooks/useRegisterStyle";
// Define the LoginScreen component
export const LoginScreen = () => {
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
  } = useRegisterStyles(); // Hook for global styles

  return (
    <View style={container}>
      <StatusBar style="light" backgroundColor="#09021C" />
      <Background />
      
      {/* Logo Section */}
      <View style={containerMain}>
        <Text style={textLogo}>EvenTrack</Text>
      </View>

      {/* Form Section */}
      <View style={formu}>
        <View style={containerLabel}>
          
          {/* Username Field */}
          <View style={labelFormu}>
            <View style={iconInput}>
              <EmailIcon />
            </View>
            <TextInput
              placeholder="username"
              placeholderTextColor={"rgba(250,250,250,0.5)"}
              style={input}
              underlineColorAndroid="transparent"
            />
          </View>

          {/* Password Field */}
          <View style={labelFormu}>
            <View style={iconInput}>
              <PasswordIcon />
            </View>
            <TextInput
              placeholder="password"
              secureTextEntry={true}
              placeholderTextColor={"rgba(250,250,250,0.5)"}
              style={input}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>

        {/* Button Section */}
        <View style={containerBtn}>
          <TouchableOpacity
            style={[btn, { backgroundColor: "#140633" }]}
            activeOpacity={0.7}
            accessible={true}
            accessibilityLabel="Log in"
          >
            <Text style={[textBtn, { color: "#AE75FF" }]}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[btn, { backgroundColor: "#333" }]}
            activeOpacity={0.7}
            accessible={true}
            accessibilityLabel="Sign Up"
          >
            <Text style={[textBtn, { color: "#FFF" }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Additional screen-specific styles (optional, since you're using global styles)
const styles = StyleSheet.create({
  // Add any specific styles here if needed
});

export default LoginScreen;
