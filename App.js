import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Navigator from "./src/navigation";
import { Amplify } from "aws-amplify";
import { withAuthenticator, Analytics } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  return (
    <>
      <Navigator />
      <StatusBar style="light" />
    </>
  );
}

export default withAuthenticator(App);

const styles = StyleSheet.create({});
