import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import React from "react";
import { Auth } from "aws-amplify";
import IonIcons from "react-native-vector-icons/Ionicons";
import SettingsItem from "../components/SettingsItem";

const Settings = () => {
  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.image}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.container}>
        <SettingsItem name="star-outline" text="Starred Messages" />
        <SettingsItem name="laptop-outline" text="Linked Devices" />
        <SettingsItem name="key-outline" text="Account" />
        <SettingsItem name="lock-closed-outline" text="Privacy" />
        <SettingsItem name="notifications-outline" text="Notifications" />
        <SettingsItem name="notifications-outline" text="Help" />
        <Pressable onPress={() => Auth.signOut()} style={styles.logout}>
          <IonIcons name="log-out-outline" style={styles.icon} />
          <Text style={styles.text}>Log Out</Text>
          <IonIcons name="chevron-forward-outline" style={styles.icon} />
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderWidth: 0,
  },

  image: {
    flex: 1,
    width: null,
    height: null,
  },
  logout: {
    marginTop: 13,
    flexDirection: "row",
    paddingLeft: 5,
    marginHorizontal: 10,
    backgroundColor: "rgba(19, 36, 47, 0.85)",
    borderRadius: 5,
    height: 65,
  },
  text: {
    color: "white",
    fontSize: 20,
    marginLeft: 5,
    flex: 5,
    alignSelf: "center",
  },
  icon: {
    flex: 1,
    fontSize: 30,
    color: "white",
    alignSelf: "center",
    textAlign: "center",
  },
});
