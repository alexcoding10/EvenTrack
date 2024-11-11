import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, Button, Text } from "react-native";
import QRCodeGenerator from "@/components/qrgenerator";
import { useGlobalStyle } from "@/hooks/useGlobalStyle";
import { useNavigation } from '@react-navigation/native';
import RenderQRCode from "@/components/qrgenerator";

const qrCreate = () => {
  const [data, setData] = useState<{ data: string, expires?: string }>({ data: "" });
  const [error, setError] = useState<string>(""); // State to hold error message
  const [qrCode, setQrCode] = useState<string>("");
  const navigation = useNavigation();

  
  const handlerForm = (text: string, input: string) => {
    console.log(`Updating ${input}: ${text}`);  // Log the input changes
    setData((prevState) => {
      if (input === "data") {
        return { ...prevState, data: text }; // Update 'data' field
      } else {
        return { ...prevState, expires: text }; // Update 'expires' field
      }
    });
  };

  const URL_API = "http://localhost:3030/api";

  const handleQRCode = () => {
    console.log("Checking form data:", JSON.stringify(data));  // Log data before API call

    if (!data.data) {
      setError("Data field is required.");
      return;
    }

    // If expires is not provided, it will default to an empty string or undefined
    fetch(`${URL_API}/qr/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((responseData) => {
        console.log({ respuesta: responseData });
        setQrCode(responseData.qrCode);
        setError(""); // Clear any previous error after success
      })
      .catch((err) => {
        setError("Failed to fetch");
        console.error(err);
      });
  };

  const { input, btn } = useGlobalStyle();

  return (
    <View style={{ padding: 20 }}>
      {error ? <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text> : null} {/* Show error message */}

      {/* Form to enter data */}
      <TextInput
        placeholder="Datos para QR"
        placeholderTextColor={"rgba(0,0,0,0.5)"}
        style={[input]}
        value={data.data}
        onChangeText={(text) => handlerForm(text, "data")}
      />
      <TextInput
        placeholder="Expiration Time (e.g., 1h)"
        placeholderTextColor={"rgba(0,0,0,0.5)"}
        style={[input]}
        value={data.expires}
        onChangeText={(text) => handlerForm(text, "expires")}
      />

      <TouchableOpacity
        style={[btn, { backgroundColor: "#140633" }]}
        activeOpacity={0.7}
        onPress={handleQRCode}
      >
        <Text style={{ color: "#fff" }}>Generate QR Code</Text>
      </TouchableOpacity>

      Conditional rendering: show QR code once data is valid
      {qrCode != "" && (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
          <RenderQRCode qrCode={qrCode} />
          <Button title="Close" onPress={() => setQrCode("")} />
        </View>
      )}

      {/* Navigation button to go to QR Scanner */}
      <Button
        title="Go to QR Scanner"
        onPress={() => navigation.navigate("QRScanner")}
      />
    </View>
  );
};

export default qrCreate;
