import { StaticImageData } from "next/image";
import photo1 from "./photos/mine1.jpg";
import photo2 from "./photos/mine2.jpg";
import photo3 from "./photos/mine3.jpg";
import photo4 from "./photos/mine4.jpeg";
import photo5 from "./photos/mine5.png";
import photo6 from "./photos/mine6.png";

export type WonderImage = {
  id: string;
  name: string;
  src: StaticImageData;
  photographer: string;
  location: string;
};

const wondersImages: WonderImage[] = [
  {
    id: "1",
    name: "Yan with Pagoda",
    src: photo1,
    photographer: "Photo by Someone",
    location: "Shwedagon Pagoda, Myanmar",
  },
  {
    id: "2",
    name: "Yan with Pagoda 2",
    src: photo2,
    photographer: "Photo by Someone",
    location: "Shwedagon Pagoda, Myanmar",
  },
  {
    id: "3",
    name: "Yan with Mirror Selfie",
    src: photo3,
    photographer: "Photo by Yan",
    location: "M-Tower",
  },
  {
    id: "4",
    name: "Yan with Pagoda 3",
    src: photo4,
    photographer: "Photo by Someone",
    location: "Shwedagon Pagoda, Myanmar",
  },
  {
    id: "5",
    name: "Yan with Pagoda 4",
    src: photo5,
    photographer: "Photo by E Mens on Unsplash",
    location: "Mexico",
  },
  {
    id: "6",
    name: "Without Background",
    src: photo6,
    photographer: "Photo by Someone",
    location: "Unknown",
  },
];

export default wondersImages;
