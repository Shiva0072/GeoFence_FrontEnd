import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Alert, Button } from "react-native";
import * as Location from "expo-location";
import MapView, { Circle, Marker } from "react-native-maps";

import getDist from "./getDist";

const MapComp = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [radius, setRadius] = useState(1000);
  const [region, setRegion] = useState({
    latitude: 26.730893,
    longitude: 83.364514,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    let loc = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        //set the region for map
        let latitude = location.coords.latitude;
        let longitude = location.coords.longitude;
        let latitudeDelta = 0.0922;
        let longitudeDelta = 0.0421;
        setRegion({ latitude, longitude, latitudeDelta, longitudeDelta });
      } catch (err) {
        console.log("Error in getting location : ", err);
        return;
      }
    };
    loc();
  }, []);

  useEffect(() => {
    if (route.params?.radius) setRadius(parseInt(route.params.radius));
  }, [route.params?.radius]);

  const newLoc = (e) => {
    let dist = getDist(e, location);
    // console.log("new dist : ", dist);
    let info;
    if (dist > radius) {
      info = "outside the fence";
    } else {
      info = "inside the fence";
    }
    console.log(info);
    Alert.alert("NOTE ", info);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Change Radius"
        color="#f194ff"
        onPress={() => navigation.navigate("setRadius")}
      />
      {/* {console.log("recieved new radius = ", route.params?.radius)} */}

      {/* {console.log("heree !")} */}
      <MapView region={region} style={styles.map} showsUserLocation={true}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          draggable
          onDragEnd={(e) => {
            newLoc(e.nativeEvent);
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 150,
  },
});
export default MapComp;
