const namedEntities = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  times: "x",
};

const decodeHtmlEntity = (match, entity) => {
  const lower = entity.toLowerCase();

  if (namedEntities[lower]) {
    return namedEntities[lower];
  }

  if (lower.startsWith("#x")) {
    const codePoint = parseInt(lower.slice(2), 16);
    if (Number.isFinite(codePoint)) {
      return String.fromCodePoint(codePoint === 0xd7 ? 120 : codePoint);
    }
  }

  if (lower.startsWith("#")) {
    const codePoint = parseInt(lower.slice(1), 10);
    if (Number.isFinite(codePoint)) {
      if (codePoint === 215) {
        return "x";
      }
      return String.fromCodePoint(codePoint);
    }
  }

  return match;
};

export const decodeHtmlEntities = (value = "") => value.replace(/&([^;]+);/g, decodeHtmlEntity);

const stripHtml = (value = "") =>
  value
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getBaseUrl = () => {
  const baseUrl = process.env.WORDPRESS_BASE_URL;

  if (!baseUrl) {
    throw new Error("WORDPRESS_BASE_URL is not defined");
  }

  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
};

const buildUrl = (path, searchParams) => {
  const baseUrl = getBaseUrl();
  const url = new URL(path, baseUrl);

  if (searchParams && typeof searchParams === "object") {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url;
};

const fetchWordPressJson = async (path, { searchParams, revalidate = 600 } = {}) => {
  const url = buildUrl(path, searchParams);
  const response = await fetch(url.toString(), { next: { revalidate } });

  if (!response.ok) {
    const reason = await response.text().catch(() => response.statusText);
    throw new Error(`WordPress request failed (${response.status}): ${reason}`);
  }

  return response.json();
};

const pickImageVariant = (sizes) => {
  if (!sizes || typeof sizes !== "object") {
    return null;
  }

  const preferenceOrder = ["large", "medium_large", "medium", "full", "thumbnail"];

  for (const key of preferenceOrder) {
    const variant = sizes[key];
    if (variant && typeof variant.source_url === "string" && variant.source_url.length) {
      return {
        src: variant.source_url,
        width: typeof variant.width === "number" ? variant.width : undefined,
        height: typeof variant.height === "number" ? variant.height : undefined,
      };
    }
  }

  return null;
};

const extractFeaturedImage = (post) => {
  const media = post?._embedded?.["wp:featuredmedia"]?.[0];

  if (!media) {
    return null;
  }

  const variant = pickImageVariant(media?.media_details?.sizes) ??
    (typeof media?.source_url === "string" && media.source_url.length
      ? { src: media.source_url }
      : null);

  if (!variant) {
    return null;
  }

  return {
    ...variant,
    alt: decodeHtmlEntities(media?.alt_text ?? media?.title?.rendered ?? ""),
  };
};

const normalizePost = (post) => {
  if (!post) {
    return null;
  }

  const titleHtml = post?.title?.rendered ?? "";
  const excerptHtml = post?.excerpt?.rendered ?? "";
  const contentHtml = post?.content?.rendered ?? "";

  return {
    id: post?.id ?? null,
    slug: post?.slug ?? "",
    title: decodeHtmlEntities(titleHtml),
    excerptHtml,
    excerpt: stripHtml(excerptHtml),
    contentHtml,
    contentText: stripHtml(contentHtml),
    date: post?.date ?? null,
    modified: post?.modified ?? null,
    categories: Array.isArray(post?.categories) ? post.categories : [],
    tags: Array.isArray(post?.tags) ? post.tags : [],
    featuredImage: extractFeaturedImage(post),
  };
};

const resolveInformationCategoryFilter = () => {
  const raw = process.env.WORDPRESS_INFORMATION_CATEGORY_IDS;

  if (typeof raw !== "string") {
    return [];
  }

  return raw
    .split(",")
    .map((value) => value.trim())
    .filter((value) => value.length)
    .map((value) => Number.parseInt(value, 10))
    .filter((value) => Number.isInteger(value) && value > 0);
};

export const fetchInformationPosts = async ({ perPage = 12 } = {}) => {
  const categories = resolveInformationCategoryFilter();

  const searchParams = {
    per_page: Math.min(Math.max(perPage, 1), 100),
    _embed: "1",
    status: "publish",
    order: "desc",
    orderby: "date",
  };

  if (categories.length) {
    searchParams.categories = categories.join(",");
  }

  const data = await fetchWordPressJson("/wp-json/wp/v2/posts", {
    searchParams,
    revalidate: 600,
  });

  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map(normalizePost)
    .filter((post) => post && (!categories.length || post.categories?.some((id) => categories.includes(id))));
};

export const fetchInformationBySlug = async (slug) => {
  if (!slug) {
    return null;
  }

  const data = await fetchWordPressJson("/wp-json/wp/v2/posts", {
    searchParams: {
      slug,
      _embed: "1",
      status: "publish",
      per_page: 1,
    },
    revalidate: 600,
  });

  if (!Array.isArray(data) || !data.length) {
    return null;
  }

  return normalizePost(data[0]);
};

export const fetchInformationSlugs = async ({ perPage = 20 } = {}) => {
  const categories = resolveInformationCategoryFilter();

  const searchParams = {
    per_page: Math.min(Math.max(perPage, 1), 100),
    _fields: "slug",
    status: "publish",
    order: "desc",
    orderby: "date",
  };

  if (categories.length) {
    searchParams.categories = categories.join(",");
  }

  const data = await fetchWordPressJson("/wp-json/wp/v2/posts", {
    searchParams,
    revalidate: 600,
  });

  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map((post) => (typeof post?.slug === "string" ? post.slug : null))
    .filter((slug) => typeof slug === "string" && slug.length);
};
