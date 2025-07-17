import { useAuctionCreation } from "@/context/AuctionContex";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import Heading from "../Heading";
import Empty from "../empty";

const Category = () => {
  const { categorys } = useAuctionCreation();

  const router = useRouter();

  const topsix = categorys.slice(0, 5);
  return (
    <View>
      <Heading
        subTitle="category"
        seemore={true}
        textstyle={{ fontSize: 20 }}
        onPress={() => router.push("/(category)/categories")}
      />
      <FlatList
        horizontal
        data={topsix}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ margin: 10 }}
        renderItem={({ item: category }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(category)/[catId]",
                params: { catId: category.name },
              })
            }
            style={{ margin: 5, padding: 10, alignItems: "center" }}
          >
            <Image
              source={{ uri: category.image }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 30,
                marginBottom: 5,
              }}
            />
            <Text style={{ fontFamily: "outfit", textTransform: "capitalize" }}>
              {category.name}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={<Empty />}
      />
    </View>
  );
};

export default Category;
