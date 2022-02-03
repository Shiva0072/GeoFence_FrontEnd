import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Alert,
  Linking,
  AppState,
  Platform,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { startActivityAsync, ActivityAction } from "expo-intent-launcher";
import * as Location from "expo-location";

const WelcomeScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [permStatus, setPermStatus] = useState(false);
  const [location, setLocation] = useState("");
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  useEffect(async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
        let location = await Location.getCurrentPositionAsync({});
        console.log("Permission granted and all is well now OBJECT : ");
        setPermStatus(true);
        setLocation(JSON.stringify(location));
      } else {
        console.log("Jumped here");
        await _handleLocationPermission();
      }
    } catch (err) {
      console.log("Error in getting location ", err);
    }
  }, []);
  const _handleAppStateChange = async (nextAppState) => {
    try {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active" &&
        !permStatus
      ) {
        // findLocation(); //causing infinite loop
        let { status } = await Location.requestForegroundPermissionsAsync();
        // console.log("Status of Permission: ", status);
        if (status == "granted") {
          let location = await Location.getCurrentPositionAsync({});
          console.log("Permission granted and all is welw OBJECT : ");
          setPermStatus(true);
          setLocation(JSON.stringify(location));
        } else {
          console.log("Jumped here");
          await _handleLocationPermission();
        }
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState : ", appState.current);
    } catch (err) {
      console.log("error in appstate : ", err);
    }
  };

  const _handleLocationPermission = () => {
    try {
      if (!permStatus) {
        Alert.alert(
          "Location Mandatory",
          "Please allow location to use the App",
          [
            {
              text: "Open Settings",
              onPress: () => goToSettings(),
              style: "cancel",
            },
            {
              text: "No",
              onPress: () => {
                console.log(
                  "Permission not allowed by the user. Let do recursion"
                );
                setPermStatus(false);
                _handleLocationPermission();
              },
            },
          ]
        );
      }
    } catch (err) {
      console.log("something wrong : ", err);
    }
  };

  const goToSettings = () => {
    if (Platform.OS == "ios") {
      // Linking for iOS
      Linking.openURL("app-settings:");
    } else {
      startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={styles.container}
        source={require("../assets/FenceMe.jpg")}
        resizeMode="cover"
      >
        <TextInput
          value={name}
          placeholder="Please Enter your Name"
          style={styles.input}
          onChangeText={setName}
        />
        <View>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate("Map", {
                userId: name,
                location: location,
              });
            }}
            activeOpacity={0.7}
            underlayColor="white"
            style={styles.btnContainer}
          >
            <View style={styles.button}>
              <Text style={styles.text}>GeoFence Me</Text>
              <Ionicons name="chevron-forward" size={24} color="black" />
            </View>
          </TouchableHighlight>
        </View>
        <Text
          style={{ position: "absolute", bottom: 20, left: 18, fontSize: 14 }}
        >
          credits: unsplash
        </Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  btnContainer: {
    backgroundColor: "pink",
    width: 300,
    justifyContent: "space-around",
    padding: 20,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "#d86b93",
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    height: 100,
    width: "80%",
    padding: 10,
    backgroundColor: "lightgray",
    marginBottom: 12,
    borderRadius: 20,
    borderColor: "#A9A9A9",
    borderWidth: 5,
  },
  text: {
    fontSize: 22,
    fontWeight: "600",
  },
});

export default WelcomeScreen;
