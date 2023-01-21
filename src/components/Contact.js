import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { createChatRoom, createUserChatRoom } from "../graphql/mutations";
import { useNavigation } from "@react-navigation/native";

const Contact = ({ item }) => {
  const navigation = useNavigation();

  const newChatRoom = async () => {
    // check if there is already a chatroom

    // create a new chatroom
    const newChatRoomRes = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    );

    if (!newChatRoomRes.data?.createChatRoom) {
      console.log("Error creating the chatroom");
    }

    const newChatRoom = newChatRoomRes.data?.createChatRoom;

    // add clicked contact to the chatroom
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
    <Pressable onPress={newChatRoom} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.left}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.statContainer}>
            <Text numberOfLines={2} style={styles.status}>
              {item.status}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.imgContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
    </Pressable>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 25,
    marginHorizontal: 0,
    height: 100,
    backgroundColor: "rgba(2,12,25,0.75)",
    borderColor: "#13242f",
    borderBottomWidth: 4,
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  imgContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
  content: {
    flex: 1,
  },
  left: {
    flex: 1,
    marginTop: 10,
    paddingVertical: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: "rgba(117, 174, 177, 0.15)",
    borderRadius: 5,
  },
  name: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
    flex: 1,
  },
  status: {
    color: "#75aeb1",
    fontSize: 15,
    textAlign: "left",
    alignSelf: "flex-end",
  },
  statContainer: {
    marginRight: 10,
    marginLeft: 15,
  },
});
