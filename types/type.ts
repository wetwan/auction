export interface Category {
    name: string
    image: string
    label: string
    value: string
}

export interface AuctionItem {
    id?: string
    name: string
    image: string
    category: string
    startingPrice: string
    estimatedPrice: string
    description: string
    timeLeft: number
    by: string
}