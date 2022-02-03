import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "./WelcomeScreen";
import MapComp from "../Components/MapComp";
import RadiusComp from "../Components/RadiusComp";

const Stack = createNativeStackNavigator();
const HomeScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen}></Stack.Screen>
        <Stack.Screen name="Map" component={MapComp}></Stack.Screen>
        <Stack.Screen name="setRadius" component={RadiusComp}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeScreen;
