import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
} from "react-native";
import React from "react";
import Contact from "../components/Contact";
import chat from "../../assets/data/chat.json";

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
