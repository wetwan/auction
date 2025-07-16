import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface welcomeProp {
  title?: string;
  onpress?: () => void;
}

const Welcome = ({ title, onpress }: welcomeProp) => {
  return (
    <View
      style={{
        padding: 20,
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Pressable onPress={onpress}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
      </Pressable>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          textTransform: "capitalize",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default Welcome;
