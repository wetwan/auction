import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const Empty = () => {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
      }}
    >
      <Image
        source={require("../assets/images/empty.jpg")}
        style={{
          width: 200,
          height: 200,
          resizeMode: "contain",
          marginBottom: 20,
          borderRadius: 120,
        }}
      />

      <Text style={{ fontFamily: "outfit", fontSize: 20, marginBottom: 10 }}>
        No auctions found
      </Text>

      <Pressable onPress={() => router.back()}>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 18,
            color: "red",
            textDecorationLine: "underline",
          }}
        >
          Go Back
        </Text>
      </Pressable>
    </View>
  );
};

export default Empty;
