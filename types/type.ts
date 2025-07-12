export interface Category {
    name: string
    image: string
}

export interface AuctionItem {
    name: string
    image: string
    category: string
    startingPrice: string
    estimatedPrice: string
    description: string
    timeLeft: number
}