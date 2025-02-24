import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./src/components/BottomTabNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
