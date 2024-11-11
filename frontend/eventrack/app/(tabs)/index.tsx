import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import QRCreate from "./qrCreate";
import QRScanner from "./qrScanner";

const Stack = createStackNavigator();

const App = () => {

    return (
      <Stack.Navigator>
        <Stack.Screen name="QRCreate" component={QRCreate} />
        <Stack.Screen name="QRScanner" component={QRScanner} />
      </Stack.Navigator>
    );

};

export default App;
