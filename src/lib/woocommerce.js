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

const decodeHtmlEntities = (value = "") => value.replace(/&([^;]+);/g, decodeHtmlEntity);

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

const fetchJson = async (path, { searchParams, revalidate = 600 } = {}) => {
  const url = buildUrl(path, searchParams);
  const response = await fetch(url.toString(), { next: { revalidate } });

  if (!response.ok) {
    const reason = await response.text().catch(() => response.statusText);
    throw new Error(`WooCommerce request failed (${response.status}): ${reason}`);
  }

  return response.json();
};

const sortCategories = (categories) => {
  if (!Array.isArray(categories)) {
    return [];
  }

  return [...categories].sort((a, b) => {
    const orderA = typeof a?.menu_order === "number" ? a.menu_order : Number.MAX_SAFE_INTEGER;
    const orderB = typeof b?.menu_order === "number" ? b.menu_order : Number.MAX_SAFE_INTEGER;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    const nameA = a?.name ?? "";
    const nameB = b?.name ?? "";

    return nameA.localeCompare(nameB, "pl", { sensitivity: "base" });
  });
};

const normalizeCategory = (category) => ({
  id: category?.id,
  name: decodeHtmlEntities(category?.name ?? ""),
  slug: category?.slug ?? "",
  description: category?.description ?? "",
  image: category?.image ?? null,
  count: category?.count ?? 0,
});

const normalizeProduct = (product) => ({
  ...product,
  name: decodeHtmlEntities(product?.name ?? ""),
  categories: Array.isArray(product?.categories)
    ? product.categories.map((category) => ({
        ...category,
        name: decodeHtmlEntities(category?.name ?? ""),
      }))
    : [],
});

export const fetchProductCategories = async () => {
  const data = await fetchJson("/wp-json/wc/store/products/categories", {
    searchParams: {
      per_page: 100,
      hide_empty: true,
    },
    revalidate: 1800,
  });

  const sorted = sortCategories(data);

  return sorted.map(normalizeCategory);
};

export const fetchCategoryBySlug = async (slug) => {
  if (!slug) {
    return null;
  }

  const categories = await fetchProductCategories();
  return categories.find((category) => category.slug === slug) ?? null;
};

export const fetchProductsByCategoryId = async (categoryId) => {
  if (!categoryId) {
    return [];
  }

  const data = await fetchJson("/wp-json/wc/store/products", {
    searchParams: {
      category: categoryId,
      per_page: 100,
      order: "asc",
      orderby: "menu_order",
    },
    revalidate: 900,
  });

  return Array.isArray(data) ? data.map(normalizeProduct) : [];
};

export const fetchProductBySlug = async (slug) => {
  if (!slug) {
    return null;
  }

  const data = await fetchJson("/wp-json/wc/store/products", {
    searchParams: { slug, per_page: 1 },
    revalidate: 900,
  });

  if (!Array.isArray(data) || !data.length) {
    return null;
  }

  return normalizeProduct(data[0]);
};

export const extractProductGallery = (product) => {
  if (!product || !Array.isArray(product.images)) {
    return [];
  }

  return product.images
    .map((image) => ({
      id: image?.id ?? null,
      src: image?.src ?? "",
      alt: image?.alt ?? product.name ?? "",
    }))
    .filter((image) => image.src);
};

export const extractProductPrice = (product) => {
  if (!product) {
    return {
      hasPrice: false,
      priceHtml: "",
      amount: null,
      currency: "",
    };
  }

  const prices = product?.prices ?? {};
  const priceHtmlSource = typeof product?.price_html === "string" ? product.price_html : prices.price_html;
  const priceHtml = typeof priceHtmlSource === "string" ? priceHtmlSource : "";

  const rawAmount = prices.price;
  const amountString =
    typeof rawAmount === "string"
      ? rawAmount.trim()
      : typeof rawAmount === "number"
        ? String(rawAmount)
        : "";
  const amountNumber = Number(amountString);
  const hasNumericAmount = Number.isFinite(amountNumber) && amountNumber > 0;

  return {
    hasPrice: Boolean(priceHtml.trim()) || hasNumericAmount,
    priceHtml,
    amount: hasNumericAmount ? amountString : null,
    currency: prices.currency_symbol ?? "",
  };
};

