/* eslint-disable react-hooks/exhaustive-deps */
import AuctionList from "@/components/auction/auctionList";
import SearchBar from "@/components/auction/searchbar";
import { useAuctionCreation } from "@/context/AuctionContex";
import { AuctionItem } from "@/types/type";
import React, { useEffect, useState } from "react";

const Auction = () => {
  const { auctions } = useAuctionCreation();
  const [filteredAuction, setFilteredAuction] = useState<AuctionItem[]>([]);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setFilteredAuction(auctions);
  }, []);

  const handleSearch = (text: string) => {
    setValue(text);
    const searchText = text.toLowerCase();

    const filtered = auctions.filter((auction) =>
      auction.name?.toLowerCase().includes(searchText)
    );

    setFilteredAuction(filtered);
  };

  return (
    <>
      <SearchBar value={value} handleSearch={handleSearch} />
      <AuctionList filteredAuction={filteredAuction} />
    </>
  );
};

export default Auction;
