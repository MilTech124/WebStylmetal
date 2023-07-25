"use client";
import React, { useState } from "react";
import Masonry from "react-masonry-css";
import { Fade } from "react-awesome-reveal";
import Image from "next/image";

function RealizationPhoto({ image }) {
  const [currentImage, setCurentImage] = useState(null);
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="">
	{currentImage ? <img onClick={()=>setCurentImage(null)} className="fixed mt-[-220px] md:-mx-20 z-50 w-full h-full object-cover bg/50" src={currentImage}/> : null}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid "
        columnClassName="my-masonry-grid_column"
      >
        {image[0].map((img) => (
          <Fade key={img}>
            <Image width={1440} height={1080} className=" drop-shadow-xl shadow-xl cursor-pointer hover:translate-x-4 hover:translate-y-4 hover:scale-105 transform transition-all duration-500 ease-in-out "
              onClick={() => {
                setCurentImage(img);
              }}
              src={img}
              key={img}
            />
          </Fade>
        ))}
      </Masonry>
    </div>
  );
}

export default RealizationPhoto;
