import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Auth, API, graphqlOperation } from "aws-amplify";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { onUpdateChatRoom } from "../graphql/subscriptions";

const ChatItem = ({ item }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [chatRoom, setChatRoom] = useState(item);

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const userItem = chatRoom.users.items.find(
        (elem) => elem.user.id !== authUser.attributes.sub
      );
      setUser(userItem?.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, { filter: { id: { eq: item.id } } })
    ).subscribe({
      next: ({ value }) => {
        setChatRoom((c) => ({ ...(c || {}), ...value.data.onUpdateChatRoom }));
      },
      error: (error) => console.warn(error),
    });

    return () => subscription.unsubscribe();
  }, [item.id]);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Chat", {
          id: chatRoom.id,
          name: chatRoom.name || user?.name,
        })
      }
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {chatRoom.name || user?.name}
          </Text>
          {chatRoom.LastMessage && (
            <Text numberOfLines={1} style={styles.date}>
              {dayjs(chatRoom.LastMessage?.createdAt).fromNow(true)}
            </Text>
          )}
        </View>
        {chatRoom.LastMessage ? (
          <Text numberOfLines={2} style={styles.msg}>
            {chatRoom.LastMessage?.text}
          </Text>
        ) : (
          <Text numberOfLines={2} style={[styles.msg, { fontStyle: "italic" }]}>
            No message yet.
          </Text>
        )}
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
    height: 120,
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
    fontSize: 13,
  },
  date: {
    color: "#75aeb1",
    flex: 1,
    textAlign: "right",
    fontSize: 12,
    marginRight: 5,
  },
  msg: {
    fontSize: 12,
    color: "#cccccc",
    height: 60,
    backgroundColor: "rgba(117, 174, 177, 0.15)",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
});
