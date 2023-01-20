import { StyleSheet, Text, View } from "react-native";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ChatText = ({ text }) => {
  const checkId = () => {
    return text.user.id === "u1";
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: checkId()
            ? "rgba(19, 36, 47, 0.85)"
            : "rgba(41, 43, 44, 0.85)",
          alignSelf: checkId() ? "flex-end" : "flex-start",
          shadowColor: checkId() ? "#13242f" : "#292b2c",
        },
      ]}
    >
      <Text style={styles.text}>{text.text}</Text>
      <Text style={styles.date}>{dayjs(text.createdAt).fromNow(true)}</Text>
    </View>
  );
};

export default ChatText;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    maxWidth: "80%",
    minWidth: "25%",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  text: {
    color: "white",
  },
  date: {
    color: "#75aeb1",
    alignSelf: "flex-end",
  },
});
