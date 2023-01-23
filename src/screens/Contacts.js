import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import Contact from "../components/Contact";
// import users from "../../assets/data/chat.json";
import { createChatRoom, createUserChatRoom } from "../graphql/mutations";
import { useNavigation } from "@react-navigation/native";
import { getCommonChatRoomWithUserId } from "../services/chatRoomService";

import { API, graphqlOperation, Auth } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import NewGroup from "../components/NewGroup";

const Contacts = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const res = await API.graphql(
        graphqlOperation(listUsers, {
          filter: { id: { ne: authUser.attributes.sub } },
        })
      );

      setUsers(res.data?.listUsers?.items);
    };
    fetchData();
  }, []);

  const newPrivateChatRoom = async (item) => {
    // check if there is already a chatroom
    const existingChatRooms = await getCommonChatRoomWithUserId(item.id);
    if (existingChatRooms) {
      navigation.navigate("Chat", {
        id: existingChatRooms.chatRoom.id,
        name: item.name,
      });
      return;
    }

    // create a new chatroom
    const newChatRoomRes = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    );

    if (!newChatRoomRes.data?.createChatRoom) {
      console.log("Error creating the chatroom");
    }

    const newChatRoom = newChatRoomRes.data?.createChatRoom;

    // add clicked contact to the chatroom (if not creating group)
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: {
          chatRoomId: newChatRoom.id,
          userId: item.id,
        },
      })
    );

    // add auth user to the chatroom
    const authUser = await Auth.currentAuthenticatedUser();
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: {
          chatRoomId: newChatRoom.id,
          userId: authUser.attributes.sub,
        },
      })
    );

    // navigate to chatroom
    navigation.navigate("Chat", { id: newChatRoom.id, name: item.name });
  };

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.image}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.container}>
        <NewGroup />
        <FlatList
          style={styles.flatList}
          data={users}
          renderItem={({ item }) => (
            <Contact item={item} onPress={() => newPrivateChatRoom(item)} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ImageBackground>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
  flatList: {
    marginTop: 0,
  },
});
