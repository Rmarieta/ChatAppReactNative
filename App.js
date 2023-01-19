import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import AllChats from "./src/screens/AllChats";

export default function App() {
  return (
    <>
      <AllChats />
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({});
