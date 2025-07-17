import { Timestamp } from "firebase/firestore";

export interface Category {
  id?: string
  name: string
  image: string
  label: string
  value: string
}


export interface Bid {
  bid: number;
  time: Timestamp;
  userId: string;
  userName: string;
}

export interface AuctionItem {
  id: string;
  name: string;
  image: string;
  category: string;
  startingPrice: number;
  estimatedPrice: number;
  description: string;
  timeLeft: number;
  by: string;
  bids?: Bid[];
  userId?: string
}