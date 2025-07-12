import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, TextInput, View } from "react-native";

interface searchProps {
  value: string;
  handleSearch: (text: string) => void;
}

const SearchBar = ({ value, handleSearch }: searchProps) => {
  const { width } = Dimensions.get("window");
  return (
    <View
      style={{
        height: 150,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        backgroundColor: "#A2C570",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: width * 0.8,
          backgroundColor: "white",
          borderRadius: 15,
          flexDirection: "row",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Ionicons name="search" size={24} color="black" />
        <TextInput
          style={{
            outlineWidth: 0,
            color: "#888",
            paddingLeft: 10,
            fontFamily: "outfit",
            fontSize: 18,
          }}
          placeholder="Search Auction ......"
          value={value}
          onChangeText={handleSearch}
        />
      </View>
    </View>
  );
};

export default SearchBar;
