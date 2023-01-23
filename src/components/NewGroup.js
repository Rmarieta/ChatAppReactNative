import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const NewGroup = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("New Group")}
        style={styles.logout}
      >
        <IonIcons name="people-outline" style={styles.icon} />
        <Text style={styles.text}>New Group</Text>
        <IonIcons name="chevron-forward-outline" style={styles.icon} />
      </Pressable>
    </View>
  );
};

export default NewGroup;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 4,
    borderColor: "#122430",
  },
  logout: {
    flexDirection: "row",
    paddingLeft: 5,
    marginHorizontal: 25,
    marginVertical: 20,

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
