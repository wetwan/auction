import { AuctionItem, Category } from "@/types/type"
import { images } from "../images"




export const auction: AuctionItem[] = [
    {
        id: '2',
        name: '2d art',
        image: images.DArt,
        category: "painting",
        startingPrice: "160",
        estimatedPrice: "150",
        description: "work of Art",
        timeLeft: 20000
    },
    {
        id: '3',
        name: 'my new car',
        image: images.Car,
        category: "auto mobile",
        startingPrice: "1000",
        estimatedPrice: "950",
        description: "drives like mad",
        timeLeft: 150000
    },
    {
        id: '1',
        name: 'hp laptop',
        image: images.Food,
        category: "computers",
        startingPrice: "1000",
        estimatedPrice: "900",
        description: "good ststem",
        timeLeft: 2000000
    },
    {
        id: '5',
        name: 'taiwo',
        image: images.Painting,
        category: "cloth",
        startingPrice: "100",
        estimatedPrice: "20",
        description: "all good here",
        timeLeft: 2000
    },
    {
        id: '10',
        name: 'gta V',
        image: images.Gta,
        category: "game",
        startingPrice: "",
        estimatedPrice: "",
        description: "",
        timeLeft: 2000
    },
    {
        id: '1111',
        name: 'old house',
        image: images.House,
        category: "realEsate",
        startingPrice: "2000",
        estimatedPrice: "1500",
        description: "nice old house ",
        timeLeft: 39000
    },
    {
        id: '44243',
        name: 'frame for painting',
        image: images.Frame,
        category: "painting",
        startingPrice: "20",
        estimatedPrice: "25",
        description: "in 70bc the fomous painter used this frame to isthe lord painting  which started the beautiful history of this frame as time goes on the has been used to frame alot of famous painting. it was passed to by my father who also inherted it from his own father , the frame as been in the family for 200 years. it will only be avalible for a limited time",
        timeLeft: 100000
    },
]
export const category: Category[] = [
    {
        name: 'painting',
        image: images.Brush
    },
    {
        name: 'jewerry',
        image: images.Frame
    },
    {
        name: 'eletronic',
        image: images.Car
    },
    {
        name: 'toy',
        image: images.DArt
    },
    {
        name: 'make up',
        image: images.Makeup
    },
    {
        name: 'auto mobile',
        image: images.Car
    },
    {
        name: 'computers',
        image: images.Gta
    },
    {
        name: 'food',
        image: images.Food
    },
    {
        name: 'cloth',
        image: images.Makeup
    },
    {
        name: 'game',
        image: images.House
    },
    {
        name: 'realEsate',
        image: images.House
    },
    {
        name: 'weapon',
        image: ''
    },
    {
        name: 'books',
        image: images.Funis
    },
    {
        name: 'ceramics',
        image: images.DArt
    },
]

export const banners = [{ image: images.Brush, }, { image: images.Frame }, { image: images.Funis }, { image: images.DArt }]