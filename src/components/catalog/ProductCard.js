import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  const href = `/produkt/${product.slug}`;
  const thumbnail = Array.isArray(product.images) ? product.images[0] : null;
  const priceHtml = product.prices?.price_html ?? "";
  const excerpt = product.short_description || product.description || "";

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10">
      <Link href={href} className="group flex flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          {thumbnail?.src ? (
            <Image
              src={thumbnail.src}
              alt={thumbnail.alt || product.name}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
              className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-200 text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
              StylMetal
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
        <div className="flex flex-1 flex-col gap-4 px-6 py-8">
          <header className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold text-slate-800">{product.name}</h3>
            {priceHtml && (
              <div
                className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500"
                dangerouslySetInnerHTML={{ __html: priceHtml }}
              />
            )}
          </header>
          {excerpt && (
            <div
              className="text-sm leading-relaxed text-slate-500"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
          )}
          <span className="mt-auto text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
            Poznaj szczegoly
          </span>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
