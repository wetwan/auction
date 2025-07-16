import Auction from "@/components/home/Auction";
import Banner from "@/components/home/Banner";
import Category from "@/components/home/Category";
import Welocme from "@/components/home/welocme";
import { useAuctionCreation } from "@/context/AuctionContex";
import React from "react";
import { ScrollView } from "react-native";

const Index = () => {
  const { auctions } = useAuctionCreation();

  return (
    <ScrollView>
      <Welocme />
      <Auction auctions={auctions} />
      <Category />
      <Banner />
    </ScrollView>
  );
};

export default Index;
