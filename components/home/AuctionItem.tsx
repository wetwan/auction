import { useAuctionCreation } from "@/context/AuctionContex";
import { AuctionItem } from "@/types/type";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import Button from "../button";

interface AuctionItemProp {
  formatTime: (time: any) => string;
  auction: AuctionItem;
}

const AuctionItems = ({ formatTime, auction }: AuctionItemProp) => {

  const router = useRouter();
  return (
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
        <Text style={{ color: "pink" }}></Text>
        <Button
          title={formatTime(auction.timeLeft)}
          onPress={() => null}
          //   variant="white"
          style={{
            alignItems: "flex-start",
            paddingBlock: 10,
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
  );
};

export default AuctionItems;
