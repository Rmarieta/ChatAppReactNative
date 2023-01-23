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

  const [loading, setLoading] = useState(false);

  const fetchChatRooms = async () => {
    setLoading(true);
    const authUser = await Auth.currentAuthenticatedUser();

    const res = await API.graphql(
      graphqlOperation(customListChatRooms, { id: authUser.attributes.sub })
    );

    // sort the chat rooms on the frontend
    const rooms = res.data.getUser.ChatRooms.items;
    const sortedRooms = rooms.sort(
      (r1, r2) =>
        new Date(r2.chatRoom.updatedAt) - new Date(r1.chatRoom.updatedAt)
    );

    setChatRooms(sortedRooms);
    setLoading(false);
  };

  useEffect(() => {
    fetchChatRooms();

    // console.log("\n\nSTART\n\n:");
    // for (let index = 0; index < 3; index++) {
    //   console.log("\nChatroom : ", chatRooms[index].chatRoom);
    //   console.log(
    //     "\nLast message : ",
    //     chatRooms[index].chatRoom.LastMessage.text
    //   );
    //   console.log(
    //     "\nUsers involved in the message : ",
    //     chatRooms[index].chatRoom.users.items[0].user.name,
    //     ", ",
    //     chatRooms[index].chatRoom.users.items[1].user.name
    //   );
    // }
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
          refreshing={loading}
          onRefresh={fetchChatRooms}
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
