import ProductMasonryGrid from "@/components/catalog/ProductMasonryGrid";
import { fetchCategoryBySlug, fetchProductCategories, fetchProductsByCategoryId } from "@/lib/woocommerce";
import { notFound } from "next/navigation";

export const revalidate = 900;

export const generateStaticParams = async () => {
  try {
    const categories = await fetchProductCategories();
    return categories.map((category) => ({ slug: category.slug }));
  } catch (error) {
    console.error("Nie udalo sie wygenerowac parametrow kategorii:", error);
    return [];
  }
};

export const generateMetadata = async ({ params }) => {
  const category = await fetchCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: "Kategoria nie znaleziona",
    };
  }

  return {
    title: `${category.name} - StylMetal`,
    description: category.description || `Produkty w kategorii ${category.name}.`,
  };
};

const CategoryPage = async ({ params }) => {
  const category = await fetchCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const products = await fetchProductsByCategoryId(category.id);

  return (
    <section className="relative px-4 pb-24 pt-32 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <header className="flex flex-col gap-4 text-slate-600">
          <p className="text-xs font-semibold uppercase tracking-[0.6em] text-amber-500">
            Kategoria
          </p>
          <h1 className="text-4xl font-semibold text-slate-800 md:text-5xl">
            {category.name}
          </h1>
          {category.description && (
            <div
              className="max-w-3xl text-base text-slate-500"
              dangerouslySetInnerHTML={{ __html: category.description }}
            />
          )}
        </header>

        <ProductMasonryGrid products={products} />
      </div>
    </section>
  );
};

export default CategoryPage;
