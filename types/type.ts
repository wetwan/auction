export interface Category {
  id?: string
  name: string
  image: string
  label: string
  value: string
}

export type AuctionItem = {
  id: string;
  name: string;
  image: string;
  category: string;
  startingPrice: number;
  estimatedPrice: number;
  description: string;
  timeLeft: number;
  by: string;
};