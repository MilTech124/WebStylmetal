import Image from "next/image";
import Link from "next/link";
import { fetchProductCategories } from "@/lib/woocommerce";

const fallbackImage = "/offert.webp";

const getFeaturedCategories = (categories) => {
  if (!Array.isArray(categories)) {
    return [];
  }

  return categories.slice(0, 6);
};

const OurOffert = async () => {
  const categories = await fetchProductCategories().catch((error) => {
    console.error("Nie udalo sie pobrac kategorii dla sekcji oferta:", error);
    return [];
  });
  const featuredCategories = getFeaturedCategories(categories);

  return (
    <section id="oferta" className="relative my-24">
      <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 pt-20 pb-36 text-white">
        <div className="absolute inset-0 bg-[url('/offert.webp')] bg-cover bg-center opacity-20" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/60" aria-hidden />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.6em] text-amber-400">
            Nasza oferta
          </p>
          <h2 className="text-3xl font-semibold md:text-4xl">Poznaj kategorie naszych produktow</h2>
          <p className="max-w-3xl text-sm text-slate-200 md:text-base">
            StylMetal oferuje szeroki przekroj konstrukcji ? od klasycznych garazy po nowoczesne hale i wiaty.
            Wybierz interesujaca Cie kategorie, aby zobaczyc dostepne realizacje i konfiguracje produktow.
          </p>
          <Link
            href="/kategorie"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-amber-400"
          >
            Zobacz wszystkie
          </Link>
        </div>
      </div>

      <div className="relative mx-auto -mt-20 lg:-mt-24 flex max-w-6xl flex-col gap-10 px-6">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {(featuredCategories.length ? featuredCategories : Array.from({ length: 6 })).map((category, index) => {
            if (!category) {
              return (
                <div
                  key={`placeholder-${index}`}
                  className="flex min-h-[320px] flex-col justify-center rounded-3xl bg-slate-100/70 p-8 text-center text-slate-400 shadow-lg shadow-slate-900/10"
                >
                  <span className="text-sm">Kategoria w przygotowaniu</span>
                </div>
              );
            }

            const imageSrc = category.image?.src ?? fallbackImage;

            return (
              <Link
                key={category.id ?? category.slug}
                href={`/kategoria/${category.slug}`}
                className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-900/10 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative flex-1">
                  <Image
                    src={imageSrc}
                    alt={category.image?.alt || category.name}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 45vw, 90vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" aria-hidden />
                </div>
                <div className="relative flex flex-col gap-4 px-8 pb-10 pt-8">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-semibold ">{category.name}</h3>
                    {typeof category.count === "number" && category.count > 0 && (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] ">
                        {category.count} {category.count === 1 ? "produkt" : "produktow"}
                      </span>
                    )}
                  </div>
                  {category.description && (
                    <p className="line-clamp-3 text-sm text-slate-200/90">{category.description}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurOffert;


