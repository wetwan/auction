import { images } from "@/assets/images";
import React from "react";
import { Image, Text, View } from "react-native";

const Welocme = () => {
  const user = {
    fullname: "adebayo ridwan",
    firstname: "adebayo ",
    lastname: "ridwan ",
  };
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
        source={images.Brush}
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
            {user.firstname}
          </Text>
        </View>
        <Image
          source={images.Brush}
          style={{ height: 70, width: 70, borderRadius: 50 }}
        />
      </View>
    </View>
  );
};

export default Welocme;
