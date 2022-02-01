import React, { useState } from "react";
import { Button, SafeAreaView, TextInput } from "react-native";

const RadiusComp = ({ navigation, route }) => {
  const [radius, setRadius] = useState(500);

  return (
    <SafeAreaView>
      <TextInput
        value={radius}
        placeholder="Enter new Radius"
        style={{ height: 100, padding: 10, backgroundColor: "lightgray" }}
        onChangeText={setRadius}
      />
      <Button
        title="Done"
        onPress={() => {
          navigation.navigate({
            name: "Map",
            params: { radius: radius },
            merge: true,
          });
        }}
      />
    </SafeAreaView>
  );
};

export default RadiusComp;
