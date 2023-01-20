import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { lightColors, SearchBar } from "@rneui/themed";
import IonIcons from "react-native-vector-icons/Ionicons";

const HeaderHome = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chats</Text>
      <View style={styles.searchContainer}>
        <SearchBar
          containerStyle={{
            flex: 5,
            backgroundColor: "transparent",
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
            paddingVertical: 0,
          }}
          selectionColor="rgba(1,12,26,0.6)"
          inputStyle={{ color: "white" }}
          inputContainerStyle={{
            backgroundColor: "#13242f",
            borderRadius: 5,
          }}
          placeholderTextColor={"white"}
          searchIcon={{ color: "white" }}
          clearIcon={{ color: "white" }}
          placeholder="Search"
          onChangeText={updateSearch}
          value={search}
        />
        <IonIcons name="filter" style={styles.icon} />
      </View>
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#010c1a",
    paddingHorizontal: 15,
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomColor: "#13242f",
    borderBottomWidth: 4,
  },
  searchContainer: {
    flexDirection: "row",
    flex: 1,
  },

  icon: {
    flex: 1,
    color: "#75aeb1",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 35,
  },
  text: {
    color: "white",
    fontSize: 30,
    height: 65,
  },
});
