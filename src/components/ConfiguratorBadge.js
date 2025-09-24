"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const APPEAR_DELAY_MS = 5000;

function ConfiguratorBadge() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setIsVisible(true);
    }, APPEAR_DELAY_MS);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div
      className={`fixed right-3 top-1/2 z-[9999] -translate-y-1/2 transform transition-all duration-700 ease-out sm:right-4 ${
        isVisible
          ? "translate-x-0 opacity-100 pointer-events-auto"
          : "translate-x-6 opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2 rounded-full bg-slate-950/90 p-1 pl-0 pr-1 text-white shadow-2xl backdrop-blur">
        <Link
          href="https://www.skonfiguruj-garaz.pl/konfigurator/stylmetal"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Przejdź do Konfiguratora 3D (otworzy się w nowej karcie)"
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 px-3 py-2 text-sm font-semibold shadow-lg transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-200"
        >
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white">
            Nowość
          </span>
          <span className="whitespace-nowrap animate-pulse">Konfigurator 3D</span>
        </Link>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Zamknij wyróżnienie Konfiguratora 3D"
          className="group rounded-full p-1 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 text-white transition group-hover:scale-110"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ConfiguratorBadge;
