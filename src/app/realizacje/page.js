import RealizationPhoto from "@/components/RealizationPhoto";

const getData = async () => {
  const baseUrl = process.env.WORDPRESS_BASE_URL;
  if (!baseUrl) {
    throw new Error("WORDPRESS_BASE_URL is not defined");
  }

  const url = new URL("/wp-json/wp/v2/pages", baseUrl);
  url.searchParams.set("slug", "realizacje");

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch realizacje data: ${res.status} ${res.statusText}`);
  }

  return res.json();
};
export const metadata = {
  title: "Realizacje",
  description:
    "Stylmetal to firma produkujaca garaze na zamowienie. Oferujemy szeroki wybor garazy, od klasycznych po nowoczesne. Nasze garaze sa wykonane z najwyzszej jakosci materialow i objete gwarancja.",
  keywords:
    "garaze, garaze na zamowienie, garaze metalowe, garaze blaszane, garaze drewniane, garaze murowane",
  robots: "index, follow",
  author: "Jaroslaw Matusiak",
  viewport: "width=device-width, initial-scale=1",
  favicon: "favicon.ico",
};

const extractGalleryImages = (payload) => {
  const groups = payload?.[0]?.acf?.photo_gallery?.realizacje;

  if (!Array.isArray(groups)) {
    return [];
  }

  return groups.flatMap((group) => {
    if (!Array.isArray(group)) {
      return [];
    }

    return group
      .map((item) => item?.full_image_url)
      .filter((url) => typeof url === "string" && url.length > 0);
  });
};

export default async function RealizationsPage() {
  const data = await getData();
  const images = extractGalleryImages(data);

  return (
    <section className="relative px-4 pb-24 pt-32 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-4 text-slate-600 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.6em] text-amber-500">
              Realizacje
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-800 md:text-5xl">
              Zobacz nasze wykonane projekty
            </h1>
            <p className="mt-4 max-w-3xl text-base text-slate-500">
              Kazdy projekt realizujemy z dbaloscia o detale. Poznaj przykladowe realizacje, ktore najlepiej pokazuja mozliwosci naszej produkcji.
            </p>
          </div>
        </header>

        {images.length ? (
          <RealizationPhoto images={images} />
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-10 text-center text-slate-500 shadow-sm">
            Brak zdjec do wyswietlenia. Sprobuj ponownie pozniej.
          </div>
        )}
      </div>
    </section>
  );
}
