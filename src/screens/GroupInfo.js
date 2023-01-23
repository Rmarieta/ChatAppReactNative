import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

import { API, Auth, graphqlOperation } from "aws-amplify";
import { onUpdateChatRoom } from "../graphql/subscriptions";
import { deleteUserChatRoom } from "../graphql/mutations";
import Contact from "../components/Contact";

const GroupInfo = () => {
  const [chatRoom, setChatRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();

  const chatroomID = route.params.id;

  const fetchChatRoom = async () => {
    setLoading(true);
    const result = await API.graphql(
      graphqlOperation(getChatRoom, { id: chatroomID })
    );
    setChatRoom(result.data?.getChatRoom);
    setLoading(false);
  };

  useEffect(() => {
    fetchChatRoom();

    // Subscribe to onUpdateChatRoom
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, {
        filter: { id: { eq: chatroomID } },
      })
    ).subscribe({
      next: ({ value }) => {
        setChatRoom((cr) => ({
          ...(cr || {}),
          ...value.data.onUpdateChatRoom,
        }));
      },
      error: (error) => console.warn(error),
    });

    // Stop receiving data updates from the subscription
    return () => subscription.unsubscribe();
  }, [chatroomID]);

  const removeChatRoomUser = async (chatRoomUser) => {
    await API.graphql(
      graphqlOperation(deleteUserChatRoom, {
        input: { _version: chatRoomUser._version, id: chatRoomUser.id },
      })
    );
  };

  const onDelete = (chatRoomUser) => {
    Alert.alert(
      "Removing the user",
      `Are you sure you want to remove ${chatRoomUser.user.name} from this group`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => removeChatRoomUser(chatRoomUser),
        },
      ]
    );
  };

  const users = chatRoom?.users?.items.filter((item) => !item._deleted);

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.image}
      imageStyle={styles.imageStyle}
    >
      {chatRoom === null ? (
        <View style={styles.loader}>
          <ActivityIndicator size={60} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Text style={styles.title}>{route.params.targetName}</Text>
            <View style={styles.row}>
              <Text style={styles.text}>{users.length} Participants</Text>
              <Pressable style={styles.button} onPress={() => {}}>
                <Text style={styles.text}>Invite Friends</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.section}>
            <FlatList
              data={users}
              renderItem={({ item }) => (
                <Contact item={item.user} onPress={() => onDelete(item)} />
              )}
              onRefresh={fetchChatRoom}
              refreshing={loading}
            />
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      updatedAt
      name
      users {
        items {
          id
          chatRoomId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          user {
            id
            name
            status
            image
          }
        }
        nextToken
        startedAt
      }
      createdAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
    }
  }
`;

export default GroupInfo;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderTopWidth: 2,
    borderTopColor: "#75aeb1",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#12232e",
    marginVertical: 10,
    paddingVertical: 10,
    marginHorizontal: 25,
    paddingLeft: 20,
    paddingRight: 10,
    borderRadius: 5,
  },
  topContainer: {
    borderBottomColor: "#12232e",
    borderBottomWidth: 4,
    paddingVertical: 10,
  },
  text: {
    color: "white",
    fontSize: 13,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
  button: {
    backgroundColor: "#71a6a9",
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    color: "white",
    fontSize: 28,
    marginLeft: 25,
    marginTop: 10,
  },
});
