import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ChatItem = ({ item }) => {
  return (
    <Pressable style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {item.user.name}
          </Text>
          <Text style={styles.date}>
            {dayjs(item.lastMessage.time).fromNow(true)}
          </Text>
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
    height: 100,
    backgroundColor: "rgba(2,12,25,0.85)",
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
    flex: 2,
    fontSize: 15,
  },
  date: {
    color: "#75aeb1",
    flex: 1,
    textAlign: "right",
    fontSize: 14,
    marginRight: 5,
  },
  msg: {
    color: "#cccccc",
    height: 50,
    backgroundColor: "rgba(117, 174, 177, 0.15)",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
});
