import CategoryGrid from "@/components/catalog/CategoryGrid";
import { fetchProductCategories } from "@/lib/woocommerce";

export const metadata = {
  title: "Kategorie produktow",
  description:
    "Przegladaj kategorie produktow StylMetal i znajdz idealny garaz lub wiate dla siebie.",
};

const getCategories = async () => {
  try {
    return await fetchProductCategories();
  } catch (error) {
    console.error("Nie udalo sie pobrac kategorii:", error);
    return [];
  }
};

const CategoriesPage = async () => {
  const categories = await getCategories();

  return (
    <section className="relative px-4 pb-24 pt-32 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <header className="flex flex-col gap-4 text-slate-600">
          <p className="text-xs font-semibold uppercase tracking-[0.6em] text-amber-500">
            Kategorie
          </p>
          <h1 className="text-4xl font-semibold text-slate-800 md:text-5xl">
            Wybierz rodzaj konstrukcji
          </h1>
          <p className="max-w-3xl text-base text-slate-500">
            Zebrane ponizej kategorie pomoga Ci szybko odnalezc interesujacy produkt. Kliknij wybrana karte, aby zobaczyc szczegoly dostepnych realizacji i konfiguracji.
          </p>
        </header>

        <CategoryGrid categories={categories} />
      </div>
    </section>
  );
};

export default CategoriesPage;
