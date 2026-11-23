import type { StaticImageData } from "next/image";
import photo1 from "../../public/Min portofolio/946108001-2.jpg";
import photo2 from "../../public/Min portofolio/946108002-3.jpg";
import photo3 from "../../public/Min portofolio/946108003-4 restoration.jpg";
import photo4 from "../../public/Min portofolio/As shot-06443.jpg";
import photo5 from "../../public/Min portofolio/DSC00887-2.jpg";
import photo6 from "../../public/Min portofolio/DSC00924-2.jpg";
import photo7 from "../../public/Min portofolio/DSC00957.jpg";
import photo8 from "../../public/Min portofolio/DSC00959.jpg";
import photo9 from "../../public/Min portofolio/DSC00974.jpg";
import photo10 from "../../public/Min portofolio/DSC00985.jpg";
import photo11 from "../../public/Min portofolio/DSC00993.jpg";
import photo12 from "../../public/Min portofolio/DSC00995.jpg";
import photo13 from "../../public/Min portofolio/DSC01009.jpg";
import photo14 from "../../public/Min portofolio/DSC01023.jpg";
import photo15 from "../../public/Min portofolio/DSC01028.jpg";
import photo16 from "../../public/Min portofolio/DSC01034.jpg";
import photo17 from "../../public/Min portofolio/DSC01047-2.jpg";
import photo18 from "../../public/Min portofolio/DSC01078.jpg";
import photo19 from "../../public/Min portofolio/DSC01696-2.jpg";
import photo20 from "../../public/Min portofolio/DSC01707-2.jpg";
import photo21 from "../../public/Min portofolio/DSC02544.jpg";
import photo22 from "../../public/Min portofolio/DSC02548.jpg";
import photo23 from "../../public/Min portofolio/DSC02549.jpg";
import photo24 from "../../public/Min portofolio/DSC02834.jpg";
import photo25 from "../../public/Min portofolio/DSC02963.jpg";
import photo26 from "../../public/Min portofolio/DSC03013.jpg";
import photo27 from "../../public/Min portofolio/DSC03021-2.jpg";
import photo28 from "../../public/Min portofolio/DSC03168.jpg";
import photo29 from "../../public/Min portofolio/DSC03467.jpg";
import photo30 from "../../public/Min portofolio/DSC05780-3.jpg";
import photo31 from "../../public/Min portofolio/DSC06222-3.jpg";
import photo32 from "../../public/Min portofolio/DSC07837-2.jpg";
import photo33 from "../../public/Min portofolio/DSC07919-4.jpg";
import photo35 from "../../public/Min portofolio/VDN_cover v9.2.jpg";

const photo34: StaticImageData = {
  src: "/Min%20portofolio/gossip%20cover%20v8.8.JPG",
  width: 3019,
  height: 3019,
};

export interface GalleryPhoto {
  id: string;
  image: StaticImageData;
  title: string;
  category: string;
  description: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  { id: "photo-18", image: photo18, title: "The final walk", category: "Fashion", description: "Models walk together past spectators holding up their phones." },
  { id: "photo-31", image: photo31, title: "Off the hook", category: "Portraits", description: "A black and white studio portrait with a chair and a corded telephone." },
  { id: "photo-25", image: photo25, title: "Above the rooftops", category: "Portraits", description: "A sunlit rooftop portrait with a blue sky and city buildings behind." },
  { id: "photo-7", image: photo7, title: "On the runway 01", category: "Fashion", description: "A model walks an outdoor runway beside a seated audience." },
  { id: "photo-19", image: photo19, title: "Among the trees I", category: "Portraits", description: "An outdoor portrait framed by green leaves." },
  { id: "photo-29", image: photo29, title: "Last light", category: "Travel", description: "Figures and camels cross an open landscape in the setting sun." },
  { id: "photo-24", image: photo24, title: "Through the crowd", category: "Documentary", description: "A black and white street photograph of a scooter rider among pedestrians." },
  { id: "photo-34", image: photo34, title: "Gossip", category: "Music", description: "A black and white cover portrait with a telephone receiver." },
  { id: "photo-4", image: photo4, title: "On the line", category: "Portraits", description: "A black and white studio portrait with a telephone receiver." },
  { id: "photo-30", image: photo30, title: "Blue hour", category: "Portraits", description: "A portrait outdoors at dusk, with lights in the background." },
  { id: "photo-32", image: photo32, title: "Under an orange sky I", category: "Portraits", description: "A hooded portrait against an orange evening sky." },
  { id: "photo-21", image: photo21, title: "Against the wall I", category: "Portraits", description: "A black and white portrait of a person in a hooded sweatshirt." },
  { id: "photo-8", image: photo8, title: "On the runway 02", category: "Fashion", description: "A pale runway look photographed against trees and spectators." },
  { id: "photo-26", image: photo26, title: "A moment outside", category: "Documentary", description: "People sit together outside a shop on a narrow street." },
  { id: "photo-1", image: photo1, title: "In the studio I", category: "Music", description: "Musicians and recording equipment inside a studio." },
  { id: "photo-9", image: photo9, title: "On the runway 03", category: "Fashion", description: "A model in a light outfit on an outdoor runway." },
  { id: "photo-23", image: photo23, title: "Against the wall III", category: "Portraits", description: "A wider black and white portrait beside the wall." },
  { id: "photo-35", image: photo35, title: "VDN", category: "Music", description: "A cover portrait beneath a bright streetlight at night." },
  { id: "photo-10", image: photo10, title: "On the runway 04", category: "Fashion", description: "A wide view of the runway and the audience beneath the trees." },
  { id: "photo-20", image: photo20, title: "Among the trees II", category: "Portraits", description: "A portrait in a wooded setting with soft natural light." },
  { id: "photo-27", image: photo27, title: "At the workshop", category: "Documentary", description: "A seated man holds an instrument in a shop doorway." },
  { id: "photo-2", image: photo2, title: "In the studio II", category: "Music", description: "A recording session, with headphones and a studio microphone." },
  { id: "photo-11", image: photo11, title: "On the runway 05", category: "Fashion", description: "A model passes spectators lining an outdoor fashion show." },
  { id: "photo-33", image: photo33, title: "Under an orange sky II", category: "Portraits", description: "A close portrait framed by a hood and the evening skyline." },
  { id: "photo-28", image: photo28, title: "From the passenger seat", category: "Documentary", description: "A black and white view of a driver from inside a car." },
  { id: "photo-3", image: photo3, title: "In the studio III", category: "Music", description: "A musician at the keyboard and mixing desk." },
  { id: "photo-12", image: photo12, title: "On the runway 06", category: "Fashion", description: "An outdoor runway framed by spectators and trees." },
  { id: "photo-22", image: photo22, title: "Against the wall II", category: "Portraits", description: "A hooded portrait beside a textured exterior wall." },
  { id: "photo-13", image: photo13, title: "On the runway 07", category: "Fashion", description: "A patterned coat and layered outfit on the runway." },
  { id: "photo-5", image: photo5, title: "After dark", category: "Documentary", description: "Musicians performing together in a dimly lit passage." },
  { id: "photo-14", image: photo14, title: "On the runway 08", category: "Fashion", description: "A light outfit photographed on the tree-lined runway." },
  { id: "photo-6", image: photo6, title: "The passage", category: "Documentary", description: "A black and white group portrait in an industrial passage." },
  { id: "photo-15", image: photo15, title: "On the runway 09", category: "Fashion", description: "A dark jacket and layered look on the runway." },
  { id: "photo-16", image: photo16, title: "On the runway 10", category: "Fashion", description: "Models pass one another on an outdoor runway." },
  { id: "photo-17", image: photo17, title: "On the runway 11", category: "Fashion", description: "A model in a dark jacket and pale trousers walks past the audience." },
];

