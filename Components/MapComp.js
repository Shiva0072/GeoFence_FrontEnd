import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Alert, Button } from "react-native";
import * as Location from "expo-location";
import MapView, { Circle, Marker } from "react-native-maps";

const axios = require("axios");

import getDist from "./getDist";
import { createUser, newCenter, addCoordinate } from "../API_Calls/main";

const MapComp = ({ navigation, route }) => {
  const obtd_loc = JSON.parse(route.params.location);
  const [location, setLocation] = useState({
    latitude: obtd_loc.coords.latitude,
    longitude: obtd_loc.coords.longitude,
  });
  const [radius, setRadius] = useState(1000);
  const [nwBase, setNwBase] = useState(false);
  const [region, setRegion] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    let name = route.params?.userId;
    createUser(name, JSON.stringify(location));
  }, []);

  useEffect(() => {
    if (route.params?.radius) setRadius(parseInt(route.params.radius));
  }, [route.params?.radius]);

  const newLoc = (e) => {
    let dist = getDist(e, location);
    let info;
    if (dist > radius) {
      info = "outside the fence";
    } else {
      info = "inside the fence";
    }

    let obj = {
      latitude: e.coordinate.latitude,
      longitude: e.coordinate.longitude,
    };
    addCoordinate(route.params?.userId, JSON.stringify(obj));
    Alert.alert("NOTE ", info);
  };

  const myNewBase = () => {
    setNwBase(true);
  };

  const NewBaseFinish = (e) => {
    let latitude = e.coordinate.latitude;
    let longitude = e.coordinate.longitude;
    let latitudeDelta = 0.0922;
    let longitudeDelta = 0.0421;

    setRegion({ latitude, longitude, latitudeDelta, longitudeDelta });
    setLocation({ latitude: latitude, longitude: longitude });
    setNwBase(false);
    newCenter(route.params?.userId, JSON.stringify(location));
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Change Radius"
          color="#f194ff"
          onPress={() => navigation.navigate("setRadius")}
        />
        <Button title="Change Base" color="#87d929" onPress={myNewBase} />
      </View>

      <MapView region={region} style={styles.map} showsUserLocation={true}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          draggable
          onDragEnd={(e) => {
            nwBase ? NewBaseFinish(e.nativeEvent) : newLoc(e.nativeEvent);
          }}
        ></Marker>
        <Circle
          center={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          fillColor="#ddebd3"
          radius={radius}
        />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 2,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 120,
  },
});
export default MapComp;
