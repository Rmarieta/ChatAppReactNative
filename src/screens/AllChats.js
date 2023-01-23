import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import ChatItem from "../components/ChatItem";
import HeaderHome from "../components/HeaderHome";
// import chat from "../../assets/data/chat.json";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { customListChatRooms } from "./AllChatsQueries";

const AllChats = () => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      const res = await API.graphql(
        graphqlOperation(customListChatRooms, { id: authUser.attributes.sub })
      );
      // console.log(
      //   "\nResponse :\n",
      //   res.data.getUser.ChatRooms.items[2].chatRoom.users.items,
      //   "\n"
      // );
      setChatRooms(res.data.getUser.ChatRooms.items);
    };
    fetchChatRooms();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.image}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          // data={chat}
          data={chatRooms}
          renderItem={({ item }) => <ChatItem item={item.chatRoom} />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<HeaderHome />}
        />
      </View>
    </ImageBackground>
  );
};

export default AllChats;

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
