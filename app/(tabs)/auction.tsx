/* eslint-disable react-hooks/exhaustive-deps */
import AuctionList from "@/components/auction/auctionList";
import SearchBar from "@/components/auction/searchbar";
import { db } from "@/config/firebase";
import { useAuctionCreation } from "@/context/AuctionContex";
import { AuctionItem } from "@/types/type";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Auction = () => {
  const { setLoading } = useAuctionCreation();

  const [auction, setAuction] = useState<AuctionItem[]>([]);
  const [filteredAuction, setFilteredAuction] = useState<AuctionItem[]>([]);
  const [value, setValue] = useState<string>("");

  const fetchAuction = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "auction"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const items: AuctionItem[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const newItem: AuctionItem = {
          id: doc.id,
          name: data.name,
          image: data.image,
          category: data.category,
          startingPrice: data.startingPrice,
          estimatedPrice: data.estimatedPrice,
          description: data.description,
          timeLeft: Number(data.timeLeft),
          by: data.by || "anonymous",
        };
        items.push(newItem);
      });

      setAuction(items);
      setFilteredAuction(items);
    } catch (error) {
      console.log(error, " error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuction();
  }, []);

  const handleSearch = (text: string) => {
    setValue(text);
    const searchText = text.toLowerCase();

    const filtered = auction.filter((auction) =>
      auction.name?.toLowerCase().includes(searchText)
    );

    setFilteredAuction(filtered);
  };

  return (
    <>
      <SearchBar value={value} handleSearch={handleSearch} />
      <AuctionList
        filteredAuction={filteredAuction}
        fetchAuction={fetchAuction}
        islist={true}
      />
    </>
  );
};

export default Auction;
