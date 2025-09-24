import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchInformationBySlug, fetchInformationSlugs } from "@/lib/wordpress";

export const revalidate = 600;

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

export const generateStaticParams = async () => {
  try {
    const slugs = await fetchInformationSlugs({ perPage: 50 });
    return slugs.map((slug) => ({ informacja: slug }));
  } catch (error) {
    console.error("Nie udalo sie pobrac listy slugow informacji:", error);
    return [];
  }
};

export const generateMetadata = async ({ params }) => {
  const post = await fetchInformationBySlug(params.informacja);

  if (!post) {
    return {
      title: "Informacja nie znaleziona",
    };
  }

  const fallbackDescription = post.contentText?.slice(0, 150) ?? "Szczegoly informacji StylMetal.";

  return {
    title: `${post.title} - StylMetal`,
    description: post.excerpt || fallbackDescription,
  };
};

const InformationPage = async ({ params }) => {
  const post = await fetchInformationBySlug(params.informacja);

  if (!post) {
    notFound();
  }

  const dateLabel = formatDate(post.date);
  const image = post.featuredImage;

  return (
    <section className="relative px-4 pb-24 pt-32 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <nav className="text-sm text-slate-500">
          <Link href="/informacje" className="hover:text-slate-700">
            Informacje
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-700">{post.title}</span>
        </nav>

        <article className="rounded-3xl bg-white p-10 shadow-lg shadow-slate-900/5 ring-1 ring-slate-100">
          <header className="flex flex-col gap-4">
            {dateLabel ? <time className="text-xs uppercase tracking-[0.3em] text-slate-400">{dateLabel}</time> : null}
            <h1 className="text-4xl font-semibold text-slate-800 md:text-5xl">{post.title}</h1>
            {post.excerptHtml ? (
              <div
                className="text-base leading-relaxed text-slate-500"
                dangerouslySetInnerHTML={{ __html: post.excerptHtml }}
              />
            ) : null}
          </header>

          {image?.src ? (
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl">
              <Image
                src={image.src}
                alt={image.alt || post.title}
                fill
                sizes="(min-width: 768px) 75vw, 100vw"
                className="h-full w-full object-cover"
                priority={false}
              />
            </div>
          ) : null}

          {post.contentHtml ? (
            <div
              className="information-content mt-10 space-y-6 text-base leading-relaxed text-slate-600"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          ) : (
            <p className="mt-10 rounded-2xl bg-slate-50 p-6 text-sm text-slate-500">
              Tresc tej informacji jest aktualnie niedostepna. Wroc pozniej, aby sprawdzic aktualizacje.
            </p>
          )}
        </article>
      </div>
    </section>
  );
};

export default InformationPage;
