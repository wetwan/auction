export interface Category {
    name: string
    image: string
}

export interface AuctionItem {
    id: string
    name: string
    image: string
    category: string
    startingPrice: string
    estimatedPrice: string
    description: string
    timeLeft: number
}