import { auction } from "@/assets/constant/auction";
import AuctionList from "@/components/auction/auctionList";
import SearchBar from "@/components/auction/searchbar";
import { AuctionItem } from "@/types/type";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

const Auction = () => {
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);

  const getAuction = async () => {
    setFilteredAuction(auction);
    setAuctions(auction);
  };
  useEffect(() => {
    getAuction();
  }, []);

  const [value, setValue] = useState<string>("");
  const [filteredAuction, setFilteredAuction] = useState<AuctionItem[]>([]);

  const handleSearch = (text: string) => {
    setValue(text);
    const searchText = text.toLowerCase();

    const filtered = auctions.filter((auction) =>
      auction.name?.toLowerCase().includes(searchText)
    );

    setFilteredAuction(filtered);
  };
  return (
    <ScrollView>
      <SearchBar value={value} handleSearch={handleSearch} />
      <AuctionList filteredAuction={filteredAuction} />
    </ScrollView>
  );
};

export default Auction;
