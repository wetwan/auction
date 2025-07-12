import { useAuctionCreation } from "@/context/AuctionContex";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import Heading from "../Heading";

const Category = () => {
  const { categorys } = useAuctionCreation();

  const topsix = categorys.slice(0, 5);
  return (
    <View>
      <Heading
        subTitle="category"
        seemore={true}
        textstyle={{ fontSize: 20 }}
        onPress={() => console.log("press see more")}
      />
      <FlatList
        numColumns={5}
        data={topsix}
        contentContainerStyle={{ margin: 10 }}
        renderItem={({ item: category }) => (
          <View style={{ margin: 5, padding: 10, alignItems: "center" }}>
            <Image
              source={category.image}
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
          </View>
        )}
      />
    </View>
  );
};

export default Category;
