import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";

const EmptyScreen = () => {
  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.image}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Not implemented !</Text>
      </View>
    </ImageBackground>
  );
};

export default EmptyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingTop: 100,
    borderWidth: 0,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
  text: {
    color: "white",
    fontSize: 28,
    textAlign: "center",
    marginHorizontal: 45,
    paddingVertical: 20,
    backgroundColor: "rgba(117, 174, 177, 0.3)",
    borderRadius: 10,
  },
});
