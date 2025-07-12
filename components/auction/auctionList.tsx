import { useAuctionCreation } from "@/context/AuctionContex";
import { AuctionItem } from "@/types/type";
import React from "react";
import { FlatList, Text, View } from "react-native";
import AuctionItems from "../home/AuctionItem";

interface AuctionListProps {
  filteredAuction: AuctionItem[];
}

const AuctionList = ({ filteredAuction }: AuctionListProps) => {
  const { formatTime } = useAuctionCreation();
  if (filteredAuction.length === 0) {
    return (
      <View
        style={{
          paddingTop: 250,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Text style={{ fontFamily: "outfit", fontSize: 20 }}>
          No auctions found
        </Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={filteredAuction}
        keyExtractor={(item, i) => i.toString()}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: 20,
        }}
        renderItem={({ item }) => (
          <View>
            <AuctionItems formatTime={formatTime} auction={item} />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AuctionList;
