import Welcome from "@/components/category/welcome";
import { useAuctionCreation } from "@/context/AuctionContex";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

const Categories = () => {
  const { categorys } = useAuctionCreation();
  const router = useRouter();
  return (
    <View>
      <Welcome title="category" onpress={() => router.replace("/(tabs)")} />
      <FlatList
        numColumns={3}
        data={categorys}
        contentContainerStyle={{ margin: 10 }}
        renderItem={({ item: category }) => (
          <Pressable
            onPress={() => {
              router.push({
                pathname: "/(category)/[catId]",
                params: { catId: category.name },
              });
            }}
            style={{
              margin: 10,
              padding: 20,
              alignItems: "center",
              backgroundColor: "#A2C570",
              borderRadius: 5,
            }}
          >
            <Image
              source={{ uri: category.image }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 60,
                marginBottom: 15,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 18,
                textTransform: "capitalize",
                color: "white",
              }}
            >
              {category.name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default Categories;
