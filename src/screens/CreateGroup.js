import {
  StyleSheet,
  TextInput,
  View,
  ImageBackground,
  FlatList,
  Pressable,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import Contact from "../components/Contact";
import { useNavigation } from "@react-navigation/native";
import { createChatRoom, createUserChatRoom } from "../graphql/mutations";

const CreateGroup = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const navigation = useNavigation();

  const onAddContact = (id) => {
    setSelectedUserIds((userIds) => {
      if (userIds.includes(id)) {
        // remove it
        return [...userIds].filter((uid) => uid !== id);
      } else {
        return [...userIds, id];
      }
    });
  };

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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            if (!name || selectedUserIds.length < 1) return;
            onCreateGroup();
          }}
          style={[
            styles.create,
            {
              backgroundColor:
                !name || selectedUserIds.length < 1 ? "gray" : "#75aeb1",
            },
          ]}
        >
          <Text style={styles.text}>CREATE</Text>
        </Pressable>
      ),
    });
  }, [name, selectedUserIds]);

  const onCreateGroup = async () => {
    // create a new chatroom
    const newChatRoomRes = await API.graphql(
      graphqlOperation(createChatRoom, { input: { name } })
    );

    if (!newChatRoomRes.data?.createChatRoom) {
      console.log("Error creating the chatroom");
    }

    const newChatRoom = newChatRoomRes.data?.createChatRoom;

    // add selected contacts to the chatroom, creating array of Promise
    await Promise.all(
      selectedUserIds.map((userId) =>
        API.graphql(
          graphqlOperation(createUserChatRoom, {
            input: {
              chatRoomId: newChatRoom.id,
              userId,
            },
          })
        )
      )
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

    // reset states
    setSelectedUserIds([]);
    setName("");

    // navigate to chatroom
    navigation.navigate("Chat", { id: newChatRoom.id, name: name });
  };

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.image}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name your group..."
            value={name}
            placeholderTextColor={"white"}
            selectionColor={"white"}
            onChangeText={setName}
            style={styles.input}
          />
          <View style={styles.row}>
            <Text style={styles.select}>Select members :</Text>
            <Pressable
              style={[
                styles.create,
                {
                  backgroundColor:
                    selectedUserIds.length < 1 ? "gray" : "#75aeb1",
                },
              ]}
              onPress={() => setSelectedUserIds([])}
            >
              <Text style={styles.text}>CLEAR</Text>
            </Pressable>
          </View>
        </View>

        <FlatList
          style={styles.flatList}
          data={users}
          renderItem={({ item }) => (
            <Contact
              item={item}
              onPress={() => onAddContact(item.id)}
              isSelected={selectedUserIds.includes(item.id)}
              selectable={true}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ImageBackground>
  );
};

export default CreateGroup;

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
  inputContainer: {
    borderBottomColor: "#122430",
    borderBottomWidth: 4,
  },
  input: {
    backgroundColor: "#122430",
    marginHorizontal: 50,
    marginVertical: 20,
    color: "white",
    paddingVertical: 12,
    fontSize: 17,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  create: {
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  text: {
    color: "white",
  },
  select: {
    color: "white",
    fontSize: 22,
  },
  row: {
    flexDirection: "row",
    marginHorizontal: 25,
    justifyContent: "space-between",
    marginBottom: 18,
  },
});
