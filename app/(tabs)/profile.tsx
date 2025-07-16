import { images } from "@/assets/images";
import { user } from "@/components/home/welocme";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const nav = [
    {
      id: 1,
      name: "Add Auction",
      image: require("../../assets/images/addtolist.png"),
      path: "/profile/addAuction" as const,
    },
    {
      id: 2,
      name: "View Auction",
      image: require("../../assets/images/viewlist.png"),
      path: "/profile/myAuction",
    },
    {
      id: 3,
      name: "Transaction",
      image: require("../../assets/images/sharingapp.png"),
      path: "/(tabs)/transaction",
    },
    {
      id: 4,
      name: "Log Out",
      image: require("../../assets/images/logoutapp.png"),
      path: "",
    },
  ];

  const router = useRouter();
  return (
    <View style={{}}>
      <View
        style={{
          height: 380,
          backgroundColor: "#A2C570",
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 70,
        }}
      >
        <Image
          source={images.Painting}
          style={{
            width: 150,
            height: 150,
            borderRadius: 50,
          }}
        />
        <Text
          style={{
            fontFamily: "outfit-bold",
            color: "white",
            fontSize: 25,
            textTransform: "capitalize",
            marginTop: 20,
          }}
        >
          {user.fullname}
        </Text>
      </View>

      <FlatList
        data={nav}
        numColumns={2}
        style={{ margin: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push({ pathname: item.path })}
            style={{
              flex: 1,
              backgroundColor: "white",
              margin: 10,
              padding: 10,
              flexDirection: "row",
              gap: 4,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Image
              source={item.image}
              width={50}
              style={{ width: 50, height: 50 }}
              height={50}
            />
            <Text
              style={{
                flex: 1,
                fontFamily: "outfit-bold",
                fontSize: 16,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Profile;
