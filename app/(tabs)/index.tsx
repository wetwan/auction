/* eslint-disable react-hooks/exhaustive-deps */
import Auction from "@/components/home/Auction";
import Welocme from "@/components/home/welocme";
import { useAuctionCreation } from "@/context/AuctionContex";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";

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

  const formatTime = (time: any) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}h ${minutes
      .toString()
      .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
  };
  const image = "https://via.placeholder.com/150"; // Placeholder image URL

  return (
    <SafeAreaView>
      <Welocme />
      <Auction auctions={auctions} />
    </SafeAreaView>
  );
};

export default Index;
