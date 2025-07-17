import { db } from "@/config/firebase";
import { AuctionItem, Category } from "@/types/type";
import { collection, getDocs, query } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuctionContextType = {
  auctions: AuctionItem[];
  setAuctions: React.Dispatch<React.SetStateAction<AuctionItem[]>>;
  getAuctions: () => Promise<void>;
  categorys: Category[];
  setCategorys: React.Dispatch<React.SetStateAction<Category[]>>;
  getCategorys: () => Promise<void>;
  formatTime: (time: any) => string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuctionContext = createContext<AuctionContextType | undefined>(undefined);

export function AuctionProvider({ children }: { children: React.ReactNode }) {
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAuctions((prev) => {
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
    setLoading(true);
    setAuctions([]);
    try {
      const q = query(collection(db, "auction"));
      const quarySnapshot = await getDocs(q);
      quarySnapshot.forEach((doc) => {
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

        setAuctions((prev) => [...prev, newItem]);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getCategorys = async () => {
    setLoading(true);
    setCategorys([]);
    try {
      const q = query(collection(db, "category"));
      const quarySnapshot = await getDocs(q);
      quarySnapshot.forEach((doc) => {
        const data = doc.data();
        setCategorys((prev) => [
          ...prev,
          {
            id: doc.id,
            name: data.name,
            image: data.image,
            label: data.name,
            value: data.name,
          },
        ]);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
        setAuctions,
        getAuctions,
        categorys,
        setCategorys,
        getCategorys,
        formatTime,
        loading,
        setLoading,
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
