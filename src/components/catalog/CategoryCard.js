import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }) => {
  if (!category) {
    return null;
  }

  const { name, slug, description, image, count } = category;
  const href = slug ? `/kategoria/${slug}` : "/kategorie";
  const hasImage = Boolean(image?.src);

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {hasImage ? (
          <Image
            src={image.src}
            alt={image.alt || name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 35vw, 90vw"
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 text-center text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
            StylMetal
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-6 py-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-800">{name}</h2>
          {typeof count === "number" && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-widest text-slate-500">
              {count} {count === 1 ? "produkt" : "produkty"}
            </span>
          )}
        </div>
        {description && <p className="text-sm text-slate-500">{description}</p>}
        <div className="mt-auto flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
          Zobacz oferte
          <span aria-hidden>-&gt;</span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
