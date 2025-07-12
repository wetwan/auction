/* eslint-disable react-hooks/exhaustive-deps */
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
};

const AuctionContext = createContext<AuctionContextType | undefined>(undefined);

export function AuctionProvider({ children }: { children: React.ReactNode }) {
  const [auctions, SetAuctions] = useState<AuctionItem[]>([]);
  const [categorys, SetCategorys] = useState<Category[]>([]);

  const getAuctions = async () => {
    SetAuctions([]);
    SetAuctions(auction);
  };
  const getCategorys = async () => {
    SetCategorys([]);
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
