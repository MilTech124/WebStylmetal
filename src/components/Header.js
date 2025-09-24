"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";

const navLinkClass = "hover:text-red-500 transition-colors";
const navItemClass = "py-2";

function Header() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await fetch("/api/woo/categories");

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const payload = await response.json();

        if (!ignore) {
          setCategories(Array.isArray(payload.categories) ? payload.categories : []);
        }
      } catch (error) {
        console.error("Nie udalo sie pobrac kategorii menu:", error);
        if (!ignore) {
          setCategories([]);
        }
      } finally {
        if (!ignore) {
          setIsLoadingCategories(false);
        }
      }
    };

    loadCategories();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setProductsOpen(false);
    }
  }, [open]);

  const toggleMenu = () => setOpen((prev) => !prev);
  const toggleProducts = () => setProductsOpen((prev) => !prev);

  const closeMobileMenu = () => {
    setOpen(false);
    setProductsOpen(false);
  };

  const renderCategoryLinks = (linkClass) => {
    if (isLoadingCategories) {
      return <span className="px-3 py-2 text-xs text-slate-400">Ladowanie...</span>;
    }

    if (!categories.length) {
      return <span className="px-3 py-2 text-xs text-slate-400">Brak kategorii</span>;
    }

    return categories.map((category) => (
      <Link
        key={category.id ?? category.slug}
        href={`/kategoria/${category.slug}`}
        className={linkClass}
        onClick={closeMobileMenu}
      >
        {category.name}
      </Link>
    ));
  };

  const desktopCategoryLinkClass =
    "rounded-xl px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900";
  const mobileCategoryLinkClass =
    "rounded-xl bg-slate-900/40 px-4 py-2 text-sm text-white transition hover:bg-slate-900/60";

  return (
    <header className="fixed z-50 w-full">
      <div className="flex w-full justify-between bg-yellow-500 shadow-md max-sm:flex-wrap max-sm:justify-center md:px-[8%]">
        <div className="flex gap-5">
          <div className="flex items-center gap-2 py-1 transition-all hover:scale-105">
            <img src="/phone.svg" className="h-[25px] w-[25px]" alt="phone" />
            <Link href="tel:+48792293364" className="text-xs font-semibold text-white">
              792293364
            </Link>
          </div>
          <div className="flex items-center gap-2 py-1 transition-all hover:scale-105">
            <img src="/phone.svg" className="h-[25px] w-[25px]" alt="phone" />
            <Link href="tel:+48795139224" className="text-xs font-semibold text-white">
              795139224
            </Link>
          </div>
          <div className="flex items-center gap-2 py-1 transition-all hover:scale-105">
            <img src="/Email.svg" className="h-[25px] w-[25px]" alt="email" />
            <Link href="mailto:biuro@stylmetal.pl" className="text-xs font-semibold text-white">
              biuro@stylmetal.pl
            </Link>
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center gap-4 py-1">
            <Link
              className="transition-all hover:scale-110"
              href="https://www.facebook.com/profile.php?id=100083640406301"
            >
              <img src="/Facebook.svg" className="h-[25px] w-[25px]" alt="facebook" />
            </Link>
            <Link className="transition-all hover:scale-110" href="#">
              <img src="/Google.svg" className="h-[25px] w-[25px]" alt="google" />
            </Link>
          </div>
        </div>
      </div>
      <nav className="m-auto flex items-center justify-between bg-slate-950 p-5 text-white shadow-md max-md:flex-wrap md:mx-[8%]">
        <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
          <img src="/logo.png" className="h-[70px] w-[200px]" alt="StylMetal" />
        </Link>
        <FiMenu className="block h-6 w-6 lg:hidden" onClick={toggleMenu} />
        <ul
          className={`${
            open ? "block" : "hidden"
          } w-full text-md font-semibold uppercase max-md:space-y-4 lg:flex lg:w-auto lg:items-center lg:gap-10 lg:space-y-0 lg:justify-evenly`}
        >
          <li className={navItemClass}>
            <Link href="/" className={navLinkClass} onClick={closeMobileMenu}>
              Strona glowna
            </Link>
          </li>
          <li className={navItemClass}>
            <Link
              href="https://www.skonfiguruj-garaz.pl/konfigurator/stylmetal"
              target="_blank"
              className={navLinkClass}
            >
              Konfigurator
            </Link>
          </li>
          <li className={navItemClass}>
            <Link href="/realizacje" className={navLinkClass} onClick={closeMobileMenu}>
              Realizacje
            </Link>
          </li>
          <li className={navItemClass}>
            <Link href="/informacje" className={navLinkClass} onClick={closeMobileMenu}>
              Informacje
            </Link>
          </li>
          <li className={`${navItemClass} relative group`}>
            <div className="flex items-center gap-2">
              <Link href="/kategorie" className={navLinkClass} onClick={closeMobileMenu}>
                Produkty
              </Link>
              <button
                type="button"
                className="rounded-full border border-white/30 px-2 py-1 text-xs uppercase tracking-wide text-white transition hover:border-white lg:hidden"
                onClick={toggleProducts}
                aria-expanded={productsOpen}
                aria-controls="mobile-products-menu"
              >
                {productsOpen ? "-" : "+"}
              </button>
            </div>

            <div className={`${productsOpen ? "mt-3 flex flex-col gap-2" : "hidden"} lg:hidden`} id="mobile-products-menu">
              {renderCategoryLinks(mobileCategoryLinkClass)}
            </div>

            <div className="absolute left-1/2 top-full z-40 hidden w-72 -translate-x-1/2 flex-col gap-2 rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-xl transition duration-200 ease-out group-hover:flex">
              {renderCategoryLinks(desktopCategoryLinkClass)}
            </div>
          </li>
          <li className={navItemClass}>
            <Link href="/kontakt" className={navLinkClass} onClick={closeMobileMenu}>
              Kontakt
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
