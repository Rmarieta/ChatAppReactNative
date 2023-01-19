import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const ChatItem = () => {
  return (
    <Pressable style={styles.container}>
      <Image source={require("../../assets/user.jpg")} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            Raphael Marietan
          </Text>
          <Text style={styles.subTitle}>today</Text>
        </View>

        <Text numberOfLines={2} style={styles.subTitle}>
          What happened ?
        </Text>
      </View>
    </Pressable>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginHorizontal: 0,
    height: 90,
    backgroundColor: "rgba(2,12,25,0.75)",
    borderColor: "#75aeb1",
    borderBottomWidth: 1,
    paddingTop: 14,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  content: {
    flex: 1,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgray",
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  name: {
    flex: 1,
    fontWeight: "bold",
    color: "#fff",
  },
  subTitle: {
    color: "#cccccc",
  },
});
