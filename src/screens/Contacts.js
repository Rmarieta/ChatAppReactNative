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

import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../graphql/queries";

const Contacts = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then((res) => {
      setUsers(res.data?.listUsers?.items);
    });
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
          data={users}
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
