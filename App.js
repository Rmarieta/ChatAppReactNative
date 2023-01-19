import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  FlatList,
} from "react-native";
import ChatItem from "./src/components/ChatItem";

const chat = [
  {
    id: "1",
    user: {
      image: require("./assets/users/user.jpg"),
      name: "Raphaël",
    },
    lastMessage: {
      text: "C'est noté !",
      time: "19:27",
    },
  },
  {
    id: "2",
    user: {
      image: require("./assets/users/pasc.png"),
      name: "Pascalia",
    },
    lastMessage: {
      text: "J'arrive tout bientôt.",
      time: "16:06",
    },
  },
  {
    id: "3",
    user: {
      image: require("./assets/users/ma.png"),
      name: "Mam",
    },
    lastMessage: {
      text: "Oublie pas d'aller déposer la lettre, ça ferme à 18h30.",
      time: "12:13",
    },
  },
  {
    id: "4",
    user: {
      image: require("./assets/users/nath.png"),
      name: "Nathan",
    },
    lastMessage: {
      text: "Il faudra qu'on rediscute de tout ça, de toute façon j'arrive dans 15 minutes.",
      time: "11:46",
    },
  },
  {
    id: "5",
    user: {
      image: require("./assets/users/pap.png"),
      name: "Pap",
    },
    lastMessage: {
      text: "A demain, redis-moi vers quelle heure tu penses arriver.",
      time: "09:36",
    },
  },
];

export default function App() {
  return (
    <ImageBackground
      source={require("./assets/background.jpg")}
      resizeMode="cover"
      style={styles.image}
      imageStyle={styles.imageStyle}
    >
      <ScrollView style={styles.container}>
        <FlatList
          style={styles.flatList}
          //extraData={tasks}
          data={chat}
          renderItem={({ item }) => <ChatItem item={item} />}
          keyExtractor={(item) => item.id}
        />

        <StatusBar style="light" />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: "100%",
  },
  flatList: {
    marginTop: 40,
  },
});
