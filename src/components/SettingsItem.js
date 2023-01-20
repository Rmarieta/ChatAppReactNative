import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

import IonIcons from "react-native-vector-icons/Ionicons";

const SettingsItem = ({ name, text }) => {
  return (
    <Pressable style={styles.logout}>
      <IonIcons name={name} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
      <IonIcons name="chevron-forward-outline" style={styles.icon} />
    </Pressable>
  );
};

export default SettingsItem;

const styles = StyleSheet.create({
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
