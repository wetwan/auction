import { useAuctionCreation } from "@/context/AuctionContex";
import { AuctionItem } from "@/types/type";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import Empty from "../empty";
import AuctionItems from "../home/AuctionItem";

interface AuctionListProps {
  filteredAuction: AuctionItem[];
}

const AuctionList = ({ filteredAuction }: AuctionListProps) => {
  const { formatTime, getAuctions, loading } = useAuctionCreation();
  if (filteredAuction.length === 0) {
    return <Empty />;
  }
  return (
    <View>
      {loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#e74c3c" />
        </View>
      )}
      <FlatList
        data={filteredAuction}
        keyExtractor={(item, i) => i.toString()}
        numColumns={2}
        refreshing={loading}
        onRefresh={getAuctions}
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: 10,
          paddingBottom: 160,
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
