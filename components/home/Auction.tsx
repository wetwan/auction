import { useAuctionCreation } from "@/context/AuctionContex";
import { AuctionItem } from "@/types/type";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import Heading from "../Heading";
import AuctionItems from "./AuctionItem";

interface AuctionProp {
  auctions: AuctionItem[];
}

const Auction = ({ auctions }: AuctionProp) => {
  const { formatTime } = useAuctionCreation();
  const router = useRouter();

  const topFiveAuctions = auctions.slice(0, 5);
  return (
    <View>
      <Heading
        subTitle="new auction"
        seemore={true}
        textstyle={{ fontSize: 20 }}
        onPress={() => router.push("/(tabs)/auction")}
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
