import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import texts from "../../assets/data/texts.json";
import ChatText from "../components/ChatText";
import SendBox from "../components/SendBox";
import { API, Auth, AuthModeStrategyType, graphqlOperation } from "aws-amplify";
import { getChatRoom, listMessagesByChatRoom } from "../graphql/queries";

const SingleChat = () => {
  const route = useRoute();

  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  const navigation = useNavigation();

  const chatroomID = route.params.id;

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params.name]);

  useEffect(() => {
    API.graphql(graphqlOperation(getChatRoom, { id: chatroomID })).then(
      (res) => {
        setChatRoom(res.data?.getChatRoom);
      }
    );
  }, [chatroomID]);

  useEffect(() => {
    API.graphql(
      graphqlOperation(listMessagesByChatRoom, {
        chatroomID: chatroomID,
        sortDirection: "DESC",
      })
    ).then((res) => {
      setMessages(res.data?.listMessagesByChatRoom?.items);
    });
  }, [chatroomID]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardView}
    >
      <ImageBackground
        source={require("../../assets/background.jpg")}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        {!chatRoom ? (
          <View style={styles.loader}>
            <ActivityIndicator size={60} />
          </View>
        ) : (
          <View style={styles.container}>
            <FlatList
              inverted
              style={styles.flatList}
              data={messages}
              renderItem={({ item }) => <ChatText text={item} />}
            />

            <SendBox chatroom={chatRoom} />
          </View>
        )}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default SingleChat;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderTopWidth: 2,
    borderTopColor: "#75aeb1",
  },
  keyboardView: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
  flatList: {
    padding: 10,
  },
});
