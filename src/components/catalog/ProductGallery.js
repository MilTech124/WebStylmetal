"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

const SLIDE_HEIGHT = 480;

const ProductGallery = ({ images }) => {
  if (!Array.isArray(images) || !images.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white/80 p-12 text-center text-slate-500">
        Brak zdjec dla tego produktu.
      </div>
    );
  }

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={16}
      slidesPerView={1}
      style={{ width: "100%" }}
      className="product-gallery"
    >
      {images.map((image) => (
        <SwiperSlide key={image.id ?? image.src} style={{ height: SLIDE_HEIGHT, width: "100%" }}>
          <figure className="relative h-full overflow-hidden rounded-3xl bg-slate-100">
            <Image
              fill
              src={image.src}
              alt={image.alt || "Produkt StylMetal"}
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 90vw"
              priority={false}
            />
          </figure>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductGallery;
