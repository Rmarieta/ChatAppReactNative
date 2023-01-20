import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import AllChats from "../screens/AllChats";
import EmptyScreen from "../screens/EmptyScreen";
import IonIcons from "react-native-vector-icons/Ionicons";

const bottomTab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <bottomTab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarStyle: styles.bottomBar,
        headerStyle: styles.topBar,
      }}
    >
      <bottomTab.Screen
        name="Status"
        component={EmptyScreen}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: { color: "#75aeb1" },
          tabBarIcon: () => <IonIcons name="clipboard" style={styles.icon} />,
        }}
      />
      <bottomTab.Screen
        name="Calls"
        component={EmptyScreen}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: { color: "#75aeb1" },
          tabBarIcon: () => <IonIcons name="call-sharp" style={styles.icon} />,
        }}
      />
      <bottomTab.Screen
        name="Camera"
        component={EmptyScreen}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: { color: "#75aeb1" },
          tabBarIcon: () => <IonIcons name="camera" style={styles.icon} />,
        }}
      />
      <bottomTab.Screen
        name="Chats"
        component={AllChats}
        options={{
          tabBarIcon: () => (
            <IonIcons name="chatbubbles-sharp" style={styles.icon} />
          ),
          headerTitleAlign: "center",
          headerTitleStyle: { color: "#75aeb1" },
          headerRight: () => (
            <IonIcons
              name="open"
              style={{
                color: "#75aeb1",
                fontSize: 25,
                marginRight: 20,
              }}
            />
          ),
          headerLeft: () => (
            <IonIcons
              name="person-add"
              style={{
                color: "#75aeb1",
                fontSize: 25,
                marginLeft: 20,
              }}
            />
          ),
        }}
      />
      <bottomTab.Screen
        name="Settings"
        component={EmptyScreen}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: { color: "#75aeb1" },
          tabBarIcon: () => <IonIcons name="cog-sharp" style={styles.icon} />,
        }}
      />
    </bottomTab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: "#13242f",
    height: 60,
    borderTopWidth: 0,
    paddingBottom: 6,
    paddingTop: 6,
  },
  topBar: {
    backgroundColor: "#000c1a",
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    height: 95,
  },
  icon: {
    color: "white",
    fontSize: 25,
  },
});
