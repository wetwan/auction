/* eslint-disable react-hooks/exhaustive-deps */
import Auction from "@/components/home/Auction";
import Banner from "@/components/home/Banner";
import Category from "@/components/home/Category";
import Welocme from "@/components/home/welocme";
import { useAuctionCreation } from "@/context/AuctionContex";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";

const Index = () => {
  const { auctions, SetAuctions } = useAuctionCreation();

  useEffect(() => {
    const interval = setInterval(() => {
      SetAuctions((prev) =>
        prev.map((auction) => ({
          ...auction,
          timeLeft: auction.timeLeft > 0 ? auction.timeLeft - 1 : 0,
        }))
      );
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>
      <ScrollView>
        <Welocme />
        <Auction auctions={auctions} />
        <Category />
        <Banner />
      </ScrollView>
    </>
  );
};

export default Index;
