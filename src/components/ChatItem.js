import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const ChatItem = ({ item }) => {
  return (
    <Pressable style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {item.user.name}
          </Text>
          <Text style={styles.date}>{item.lastMessage.time}</Text>
        </View>

        <Text numberOfLines={2} style={styles.msg}>
          {item.lastMessage.text}
        </Text>
      </View>
      <View style={styles.imgContainer}>
        <Image source={item.user.image} style={styles.image} />
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
    borderBottomWidth: 2,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  imgContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
    color: "#fff",
    flex: 5,
    fontSize: 15,
  },
  date: {
    color: "#75aeb1",
    flex: 1,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
  },
  msg: {
    color: "#cccccc",
  },
});
