import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import texts from "../../assets/data/texts.json";
import ChatText from "../components/ChatText";
import SendBox from "../components/SendBox";

const SingleChat = () => {
  const route = useRoute();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params.name]);

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
        <View style={styles.container}>
          <FlatList
            inverted
            style={styles.flatList}
            data={texts}
            renderItem={({ item }) => <ChatText text={item} />}
          />

          <SendBox />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default SingleChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
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