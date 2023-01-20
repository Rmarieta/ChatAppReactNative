import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import IonIcons from "react-native-vector-icons/Ionicons";
import AntIcons from "react-native-vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";

const SendBox = () => {
  const [message, setMessage] = useState("");

  const onSend = () => {
    setMessage("");
  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <AntIcons style={styles.plus} size={28} name="plus" />
      <TextInput
        placeholder="Type a message"
        style={styles.input}
        placeholderTextColor={"white"}
        selectionColor="white"
        value={message}
      />
      <IonIcons onPress={onSend} style={styles.send} size={24} name="send" />
    </SafeAreaView>
  );
};

export default SendBox;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    backgroundColor: "#000812",

    paddingRight: 15,
    paddingLeft: 0,
    alignItems: "center",
    borderTopColor: "#75aeb1",
    borderTopWidth: 2,
    paddingVertical: 14,
    marginTop: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#13242f",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 14,
    marginLeft: 5,
  },
  plus: {
    color: "#75aeb1",
    padding: 7,
  },
  send: {
    color: "#75aeb1",
    backgroundColor: "#13242f",
    padding: 8,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,

    borderLeftWidth: 4,
    borderLeftColor: "#75aeb1",
    paddingLeft: 14,
    paddingRight: 5,
  },
});
