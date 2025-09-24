import Image from "next/image";
import Link from "next/link";
import { fetchInformationPosts } from "@/lib/wordpress";

export const revalidate = 600;

export const metadata = {
  title: "Informacje",
  description: "Aktualnosci i najwazniejsze informacje od StylMetal w jednym miejscu.",
};

const formatDate = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("pl-PL", { dateStyle: "long" }).format(date);
};

const InformationCard = ({ post }) => {
  const dateLabel = formatDate(post?.date);
  const image = post?.featuredImage;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-100">
      {image?.src ? (
        <div className="relative aspect-[3/2] w-full overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt || post.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full object-cover"
            priority={false}
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-4 p-8">
        {dateLabel ? <time className="text-xs uppercase tracking-[0.3em] text-slate-400">{dateLabel}</time> : null}
        <h2 className="text-2xl font-semibold text-slate-800">
          <Link href={`/informacje/${post.slug}`} className="hover:text-amber-500">
            {post.title}
          </Link>
        </h2>
        {post.excerpt ? <p className="text-sm leading-relaxed text-slate-500">{post.excerpt}</p> : null}
        <div className="mt-auto pt-4">
          <Link
            href={`/informacje/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-500 transition hover:text-amber-600"
          >
            Czytaj dalej
            <span aria-hidden="true" className="text-base leading-none">&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

const InformationsPage = async () => {
  const posts = await fetchInformationPosts({ perPage: 24 });

  return (
    <section className="relative px-4 pb-24 pt-32 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <header className="flex flex-col gap-4 text-slate-600">
          <p className="text-xs font-semibold uppercase tracking-[0.6em] text-amber-500">Informacje</p>
          <h1 className="text-4xl font-semibold text-slate-800 md:text-5xl">Zbior aktualnosci i porad</h1>
          <p className="max-w-3xl text-base text-slate-500">
            Tutaj znajdziesz wazne komunikaty, poradniki oraz ciekawostki zwiazane z oferta StylMetal. Sprawdzaj regularnie,
            aby byc na biezaco z nowymi publikacjami.
          </p>
        </header>

        {posts.length ? (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <InformationCard key={post.id ?? post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center text-slate-500 shadow-sm">
            Aktualnie brak wpisow do wyswietlenia. Wroc pozniej, aby sprawdzic nowe informacje.
          </div>
        )}
      </div>
    </section>
  );
};

export default InformationsPage;
