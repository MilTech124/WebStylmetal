import CategoryCard from "./CategoryCard";

const CategoryGrid = ({ categories }) => {
  if (!Array.isArray(categories) || !categories.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white/80 p-12 text-center text-slate-500">
        Aktualnie brak kategorii do wyswietlenia.
      </div>
    );
  }

  return (
    <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard key={category.id ?? category.slug} category={category} />
      ))}
    </div>
  );
};

export default CategoryGrid;
