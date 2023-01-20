import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
} from "react-native";
import React from "react";
import Contact from "../components/Contact";

const chat = [
  {
    id: "1",
    user: {
      id: "u2",
      status: "Disponible",
      image: require("../../assets/users/user.jpg"),
      name: "Raphaël",
    },
  },
  {
    id: "2",
    user: {
      id: "u3",
      status:
        "Lorem Ipsum that is the first thing in the world that actually meant something.",
      image: require("../../assets/users/pasc.png"),
      name: "Pascalia",
    },
  },
  {
    id: "3",
    user: {
      id: "u4",
      status: "En vadrouille",
      image: require("../../assets/users/ma.png"),
      name: "Mam",
    },
  },
  {
    id: "4",
    user: {
      id: "u5",
      status: "A la montagne",
      image: require("../../assets/users/nath.png"),
      name: "Nathan",
    },
  },
  {
    id: "5",
    user: {
      id: "u6",
      status: "Au travail",
      image: require("../../assets/users/pap.png"),
      name: "Pap",
    },
  },
  {
    id: "6",
    user: {
      id: "u7",
      status: "Disponible",
      image: require("../../assets/users/lionel.png"),
      name: "Lionel",
    },
  },
  {
    id: "7",
    user: {
      id: "u8",
      status: "Disponible",
      image: require("../../assets/users/lucas.png"),
      name: "Lucas",
    },
  },
];

const Contacts = () => {
  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.image}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={chat}
          renderItem={({ item }) => <Contact item={item} />}
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
