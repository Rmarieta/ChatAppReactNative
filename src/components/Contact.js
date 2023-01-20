import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Contact = ({ item }) => {
  return (
    <View
      onPress={() =>
        navigation.navigate("Chat", { id: item.id, name: item.user.name })
      }
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.left}>
          <Text style={styles.name} numberOfLines={1}>
            {item.user.name}
          </Text>
          <View style={styles.statContainer}>
            <Text numberOfLines={2} style={styles.status}>
              {item.user.status}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.imgContainer}>
        <Image source={item.user.image} style={styles.image} />
      </View>
    </View>
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
    width: 65,
    height: 65,
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
    marginBottom: 15,
    marginLeft: 10,
  },
  name: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 20,
    flex: 1,
  },
  status: {
    color: "#75aeb1",
    fontSize: 16,
  },
  statContainer: {
    alignSelf: "flex-end",
    textAlign: "right",
    marginRight: 10,
    marginLeft: 15,
  },
});
