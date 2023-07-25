import RealizationPhoto from "@/components/RealizationPhoto";

const getData = async () => {
  const res = await fetch(
    "http://admin.stylmetal.pl/wp-json/wp/v2/pages/?slug=realizacje"
  );
  return res.json();
};
export const metadata = {
  title: "Realizacje",
  description:
    "Stylmetal to firma produkująca garaże na zamówienie. Oferujemy szeroki wybór garaży, od klasycznych po nowoczesne. Nasze garaże są wykonane z najwyższej jakości materiałów i objęte gwarancją.",
  keywords:
    "garaże, garaże na zamówienie, garaże metalowe, garaże blaszane, garaże drewniane, garaże murowane",
  robots: "index, follow",
  author: "Jarosław Matusiak",
  viewport: "width=device-width, initial-scale=1",
  favicon: "favicon.ico",
};

export default async function page() {
  const data = await getData();
  const images = data[0].acf.photo_gallery.realizacje;
  const image = images.map((image) => image.map((img) => img.full_image_url));
  console.log(image);
  return (
    <div className="pt-[200px] relative md:px-20">
      <h1 className="text-4xl font-bold text-slate-600">Realizacje</h1>
      <RealizationPhoto image={image} />
    </div>
  );
}
