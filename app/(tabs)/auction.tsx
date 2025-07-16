// import { auction } from "@/assets/constant/auction";
// import AuctionList from "@/components/auction/auctionList";
// import SearchBar from "@/components/auction/searchbar";
// import { AuctionItem } from "@/types/type";
// import React, { useEffect, useState } from "react";

// const Auction = () => {
//   const [auctions, setAuctions] = useState<AuctionItem[]>([]);

//   const getAuction = async () => {
//     setFilteredAuction(auction);
//     setAuctions(auction);
//   };
//   useEffect(() => {
//     getAuction();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setAuctions((prev) => {
//         const updated = prev.map((auction) => ({
//           ...auction,
//           timeLeft: auction.timeLeft > 0 ? auction.timeLeft - 1 : 0,
//         }));
//         const filtered = updated.filter((auction) => auction.timeLeft > 0);
//         return filtered;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const [value, setValue] = useState<string>("");
//   const [filteredAuction, setFilteredAuction] = useState<AuctionItem[]>([]);

//   const handleSearch = (text: string) => {
//     setValue(text);
//     const searchText = text.toLowerCase();

//     const filtered = auctions.filter((auction) =>
//       auction.name?.toLowerCase().includes(searchText)
//     );

//     setFilteredAuction(filtered);
//   };
//   return (
//     <>
//       <SearchBar value={value} handleSearch={handleSearch} />
//       <AuctionList filteredAuction={filteredAuction} />
//     </>
//   );
// };

// export default Auction;

import AuctionList from "@/components/auction/auctionList";
import SearchBar from "@/components/auction/searchbar";
import { useAuctionCreation } from "@/context/AuctionContex";
import { AuctionItem } from "@/types/type";
import React, { useEffect, useState } from "react";

const Auction = () => {
  const { auctions, SetAuctions } = useAuctionCreation();
  const [filteredAuction, setFilteredAuction] = useState<AuctionItem[]>([]);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setFilteredAuction(auctions);
  }, [auctions]);

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
