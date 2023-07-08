// "use strict"
// import React from "react";
// import axios from "axios";
import RealizationPhoto from "@/components/RealizationPhoto";


const getData = async () => {
  const res = await fetch(
    "https://www.stylmetal.pl/wp-json/wp/v2/pages/?slug=realizacje"
  );
  return res.json();
};

export default async function page() {
 
  const data = await getData();
  const images = data[0].acf.photo_gallery.realizacje;
  const image = images.map((image) => image.map((img) => img.full_image_url));
  return (
    <div className="pt-[200px] relative md:px-20">
      <h1 className="text-4xl font-bold text-slate-600">Realizacje</h1>
      <RealizationPhoto image={image} />
     
    </div>
  );
}
