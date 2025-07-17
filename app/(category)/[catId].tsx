/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@/components/button";
import Welcome from "@/components/category/welcome";
import Empty from "@/components/empty";
import { useAuctionCreation } from "@/context/AuctionContex";
import { AuctionItem } from "@/types/type";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

const CatId = () => {
  const { catId } = useLocalSearchParams();
  const router = useRouter();
  const { auctions, formatTime } = useAuctionCreation();
  const [category, setCategory] = useState<AuctionItem[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const data = auctions?.filter((doc) => doc?.category === catId);
      if (data && data.length > 0) {
        setCategory(data);
      } else {
        setCategory([]);
      }
    };
    fetchCategory();
  }, [catId]);


  return (
    <View>
      <Welcome
        title={catId as string}
        onpress={() => router.push("/(category)/categories")}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={category}
        renderItem={({ item: auction }) => (
          <Pressable
            style={{
              padding: 15,
              borderWidth: 1,
              borderColor: "#A2C570",
              margin: 10,
              backgroundColor: "#A2C570",
              borderRadius: 10,
            }}
            onPress={() => {
              router.push({
                pathname: "/(auction)/[auctionId]",
                params: { auctionId: auction.id },
              });
            }}
          >
            <Image
              source={{ uri: auction.image }}
              style={{ height: 150, width: 150, borderRadius: 30 }}
            />
            <View>
              <Button
                title={formatTime(auction.timeLeft)}
                onPress={() => null}
                //   variant="white"
                style={{
                  alignItems: "flex-start",
                  paddingBlock: 5,
                }}
              />
              <Text
                style={{
                  color: "white",
                  fontFamily: "outfit-medium",
                  textTransform: "uppercase",
                }}
              >
                {auction.name}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontFamily: "outfit",
                  textTransform: "capitalize",
                  fontSize: 14,
                }}
              >
                posted by {auction.by}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={<Empty />}
      />
    </View>
  );
};

export default CatId;
