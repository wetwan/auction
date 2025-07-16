import { AuctionItem, Category } from "@/types/type";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auction, category } from "../assets/constant/auction";

type AuctionContextType = {
  auctions: AuctionItem[];
  SetAuctions: React.Dispatch<React.SetStateAction<AuctionItem[]>>;
  getAuctions: () => Promise<void>;
  categorys: Category[];
  SetCategorys: React.Dispatch<React.SetStateAction<Category[]>>;
  getCategorys: () => Promise<void>;
  formatTime: (time: any) => string;
};

const AuctionContext = createContext<AuctionContextType | undefined>(undefined);

export function AuctionProvider({ children }: { children: React.ReactNode }) {
  const [auctions, SetAuctions] = useState<AuctionItem[]>([]);
  const [categorys, SetCategorys] = useState<Category[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      SetAuctions((prev) => {
        const updated = prev.map((auction) => ({
          ...auction,
          timeLeft: auction.timeLeft > 0 ? auction.timeLeft - 1 : 0,
        }));
        const filtered = updated.filter((auction) => auction.timeLeft > 0);
        return filtered;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: any) => {
    const days = Math.floor(time / (3600 * 24));
    const hours = Math.floor((time % (3600 * 24)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${days.toString().padStart(2, "0")}:${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}s`;
  };

  const getAuctions = async () => {
    SetAuctions(auction);
  };
  const getCategorys = async () => {
    SetCategorys(category);
  };

  useEffect(() => {
    getAuctions();
  }, []);
  useEffect(() => {
    getCategorys();
  }, []);

  return (
    <AuctionContext.Provider
      value={{
        auctions,
        SetAuctions,
        getAuctions,
        categorys,
        SetCategorys,
        getCategorys,
        formatTime,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
}

export function useAuctionCreation() {
  const context = useContext(AuctionContext);
  if (context === undefined) {
    throw new Error("useAuctionCreation must be used within a AuctionProvider");
  }
  return context;
}
