import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const Welocme = () => {
  const { user } = useUser();

  const router = useRouter();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#A2C570",
        padding: 10,
        height: 120,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
      }}
    >
      <Image
        source={{ uri: user?.imageUrl }}
        style={{ height: 70, width: 70, borderRadius: 50 }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View>
          <Text
            style={{ fontFamily: "outfit-bold", fontSize: 17, color: "white" }}
          >
            Welocme 👋
          </Text>
          <Text
            style={{
              fontFamily: "outfit-medium",
              color: "white",
              textTransform: "capitalize",
            }}
          >
            {user?.firstName}
          </Text>
        </View>
        <Pressable onPress={() => router.push("/(tabs)/profile")}>
          <Image
            source={{ uri: user?.imageUrl }}
            style={{ height: 70, width: 70, borderRadius: 50 }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Welocme;
