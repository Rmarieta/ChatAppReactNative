import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Navigator from "./src/navigation";

export default function App() {
  return (
    <>
      <Navigator />
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({});
