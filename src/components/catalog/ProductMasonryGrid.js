"use client";
import Masonry from "react-masonry-css";
import ProductCard from "./ProductCard";

const breakpointColumns = {
  default: 3,
  1280: 3,
  1024: 2,
  768: 2,
  640: 1,
};

const ProductMasonryGrid = ({ products }) => {
  if (!Array.isArray(products) || !products.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white/80 p-12 text-center text-slate-500">
        Brak produktow w tej kategorii.
      </div>
    );
  }

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {products.map((product) => (
        <ProductCard key={product.id ?? product.slug} product={product} />
      ))}
    </Masonry>
  );
};

export default ProductMasonryGrid;
