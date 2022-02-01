import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MapComp from "../Components/MapComp";
import RadiusComp from "../Components/RadiusComp";

const Stack = createNativeStackNavigator();
const HomeScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen name="Map" component={MapComp}></Stack.Screen>
        <Stack.Screen name="setRadius" component={RadiusComp}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeScreen;
