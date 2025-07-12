import { AuctionItem } from "@/types/type";
import React from "react";
import { FlatList, View } from "react-native";
import Heading from "../Heading";
import AuctionItems from "./AuctionItem";

interface AuctionProp {
  auctions: AuctionItem[];
}

const Auction = ({ auctions }: AuctionProp) => {
  const formatTime = (time: any) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}h ${minutes
      .toString()
      .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
  };
  const topFiveAuctions = auctions.slice(0, 5);
  return (
    <View>
      <Heading
        subTitle="new auction"
        seemore={true}
        textstyle={{ fontSize: 20 }}
        onPress={() => console.log("press see more")}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={topFiveAuctions}
        renderItem={({ item: auction }) => (
          <AuctionItems formatTime={formatTime} auction={auction} />
        )}
      />
    </View>
  );
};

export default Auction;
