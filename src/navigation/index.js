import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AllChats from "../screens/AllChats";
import SingleChat from "../screens/SingleChat";
import TabNavigator from "./TabNavigator";
import IonIcons from "react-native-vector-icons/Ionicons";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.topBar,
        }}
      >
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={SingleChat}
          options={{
            headerTitleAlign: "center",
            headerTitleStyle: { color: "white" },
            headerTintColor: "#75aeb1",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#000812",
  },
});
