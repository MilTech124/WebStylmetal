"use client";
import React, { useState } from "react";
import Masonry from "react-masonry-css";
import { Fade } from "react-awesome-reveal";
import Image from "next/image";

function RealizationPhoto({ images = [] }) {
  const [currentImage, setCurrentImage] = useState(null);
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  if (!images.length) {
    return null;
  }

  const handleClose = () => setCurrentImage(null);

  return (
    <div className="relative">
      {currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-10 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={handleClose}
        >
          <button
            type="button"
            aria-label="Zamknij powiekszone zdjecie"
            className="absolute right-6 top-6 text-white/70 transition hover:text-white"
            onClick={handleClose}
          >
            X
          </button>
          <div
            className="relative w-full max-w-[min(90vw,56rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={currentImage}
              alt="Realizacja StylMetal"
              width={1920}
              height={1280}
              className="h-auto w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((img) => (
          <Fade key={img}>
            <figure className="group relative overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-900/10 ring-1 ring-black/5">
              <Image
                className="h-full w-full cursor-zoom-in object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                onClick={() => setCurrentImage(img)}
                src={img}
                width={800}
                height={600}
                alt="Realizacja StylMetal"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 45vw, 90vw"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-12 text-xs font-medium uppercase tracking-[0.3em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Powieksz zdjecie
              </figcaption>
            </figure>
          </Fade>
        ))}
      </Masonry>
    </div>
  );
}

export default RealizationPhoto;
