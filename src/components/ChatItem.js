import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ChatItem = ({ item }) => {
  const navigation = useNavigation();

  console.log("\nCHAT :\n", item, "\n");
  const user = item.users.items[0].user;
  console.log("\nUSERS :\n", user, "\n");

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Chat", { id: item.id, name: user?.name })
      }
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {user?.name}
          </Text>
          <Text style={styles.date}>
            {dayjs(item.lastMessage?.createdAt).fromNow(true)}
          </Text>
        </View>

        <Text numberOfLines={2} style={styles.msg}>
          {item.lastMessage?.text}
        </Text>
      </View>
      <View style={styles.imgContainer}>
        <Image source={{ uri: user?.image }} style={styles.image} />
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
    borderColor: "#13242f",
    borderBottomWidth: 4,
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
