import Link from "next/link";
import { notFound } from "next/navigation";
import ProductActions from "@/components/catalog/ProductActions";
import ProductGallery from "@/components/catalog/ProductGallery";
import { extractProductGallery, extractProductPrice, fetchProductBySlug } from "@/lib/woocommerce";

export const revalidate = 900;

const stripHtml = (value = "") =>
  value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const buildInquiryEndpoint = () => {
  if (!process.env.WORDPRESS_SEND_QUESTION_URL && !process.env.WORDPRESS_BASE_URL) {
    console.warn("Brakuje konfiguracji WORDPRESS_SEND_QUESTION_URL/WORDPRESS_BASE_URL. Formularz zapytan moze nie dzialac.");
  }

  return "/api/send-question";
};

export const generateMetadata = async ({ params }) => {
  const product = await fetchProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Produkt nie znaleziony",
    };
  }

  const plainDescription = stripHtml(product.short_description || product.description || "");

  return {
    title: `${product.name} - StylMetal`,
    description: plainDescription || "Produkt z katalogu StylMetal.",
  };
};

const ProductPage = async ({ params }) => {
  const product = await fetchProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const gallery = extractProductGallery(product);
  const price = extractProductPrice(product);
  const inquiryEndpoint = buildInquiryEndpoint();
  const shortDescription = product.short_description || "";
  const productDescription = product.description || "";
  const categories = Array.isArray(product.categories) ? product.categories : [];

  return (
    <section className="relative px-4 pb-24 pt-32 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <nav className="text-sm text-slate-500">
          <Link href="/kategorie" className="hover:text-slate-700">
            Kategorie
          </Link>
          {categories.map((category) => (
            <span key={category.id ?? category.slug}>
              <span className="mx-2 text-slate-400">/</span>
              <Link href={`/kategoria/${category.slug}`} className="hover:text-slate-700">
                {category.name}
              </Link>
            </span>
          ))}
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-700">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
          <ProductGallery images={gallery} />

          <aside className="flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-lg shadow-slate-900/5 ring-1 ring-slate-100">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.6em] text-amber-500">
                Produkt
              </p>
              <h1 className="text-4xl font-semibold text-slate-800">{product.name}</h1>
              {shortDescription && (
                <div
                  className="text-sm leading-relaxed text-slate-500"
                  dangerouslySetInnerHTML={{ __html: shortDescription }}
                />
              )}
            </div>

            {product.sku && (
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                SKU: <span className="text-slate-600">{product.sku}</span>
              </p>
            )}

            <ProductActions
              hasPrice={price.hasPrice}
              priceHtml={price.priceHtml}
              inquiryEndpoint={inquiryEndpoint}
              productName={product.name}
            />
          </aside>
        </div>

        {productDescription && (
          <article className="max-w-4xl rounded-3xl bg-white p-10 shadow-lg shadow-slate-900/5 ring-1 ring-slate-100">
            <h2 className="mb-6 text-2xl font-semibold text-slate-800">Opis produktu</h2>
            <div
              className="text-base leading-relaxed text-slate-600"
              dangerouslySetInnerHTML={{ __html: productDescription }}
            />
          </article>
        )}
      </div>
    </section>
  );
};

export default ProductPage;
