import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
} from "react-native";
import React from "react";
import ChatItem from "../components/ChatItem";
import HeaderHome from "../components/HeaderHome";
import chat from "../../assets/data/chat.json";

// const chat = [
//   {
//     id: "1",
//     user: {
//       id: "u2",
//       status: "Disponible",
//       image: require("../../assets/users/user.jpg"),
//       name: "Raphaël",
//     },
//     lastMessage: {
//       id: "m1",
//       text: "C'est noté !",
//       createdAt: "2023-01-19T19:22:00.000Z",
//     },
//   },
//   {
//     id: "2",
//     user: {
//       id: "u3",
//       status: "Occupée",
//       image: require("../../assets/users/pasc.png"),
//       name: "Pascalia",
//     },
//     lastMessage: {
//       id: "m2",
//       text: "J'arrive tout bientôt",
//       createdAt: "2023-01-19T16:25:00.000Z",
//     },
//   },
//   {
//     id: "3",
//     user: {
//       id: "u4",
//       status: "En vadrouille",
//       image: require("../../assets/users/ma.png"),
//       name: "Mam",
//     },
//     lastMessage: {
//       id: "m3",
//       text: "Oublie pas d'aller déposer la lettre, ça ferme à 18h30.",
//       createdAt: "2023-01-19T15:57:00.000Z",
//     },
//   },
//   {
//     id: "4",
//     user: {
//       id: "u5",
//       status: "Disponible",
//       image: require("../../assets/users/nath.png"),
//       name: "Nathan",
//     },
//     lastMessage: {
//       id: "m4",
//       text: "Il faudra qu'on rediscute de tout ça, de toute façon je prends le bus maintenant et j'arrive dans 15 minutes.",
//       createdAt: "2023-01-19T13:38:00.000Z",
//     },
//   },
//   {
//     id: "5",
//     user: {
//       id: "u6",
//       status: "Au travail",
//       image: require("../../assets/users/pap.png"),
//       name: "Pap",
//     },
//     lastMessage: {
//       id: "m5",
//       text: "A demain, redis-moi vers quelle heure tu penses arriver.",
//       createdAt: "2023-01-19T11:19:00.000Z",
//     },
//   },
//   {
//     id: "6",
//     user: {
//       id: "u7",
//       status: "Disponible",
//       image: require("../../assets/users/lionel.png"),
//       name: "Lionel",
//     },
//     lastMessage: {
//       id: "m6",
//       text: "Ca marche",
//       createdAt: "2023-01-19T09:32:00.000Z",
//     },
//   },
//   {
//     id: "7",
//     user: {
//       id: "u8",
//       status: "Disponible",
//       image: require("../../assets/users/lucas.png"),
//       name: "Lucas",
//     },
//     lastMessage: {
//       id: "m7",
//       text: "Tu me rediras quand tu veux t'inscrire",
//       createdAt: "2021-01-19T08:22:00.000Z",
//     },
//   },
// ];

const AllChats = () => {
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
          renderItem={({ item }) => <ChatItem item={item} />}
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
