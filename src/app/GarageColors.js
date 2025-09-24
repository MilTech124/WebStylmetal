"use client";

import { useState } from "react";

const PALETTES = {
  ral: {
    title: "Kolory RAL",
    description:
      "Najczesciej zamawiane odcienie lakierowane proszkowo. Pozwalaja precyzyjnie dopasowac garaz do elewacji, dachu i stolarki okiennej.",
    colors: [
      {
        code: "RAL 9010",
        name: "Biel polarna",
        hex: "#F4F5F0",
        image: null,
        description: "Czysty, neutralny kolor swietnie sprawdza sie przy lekkich, minimalistycznych brylach.",
        tags: ["uniwersalny", "jasny"]
      },
      {
        code: "RAL 7040",
        name: "Szary popiel",
        hex: "#9DA3AD",
        image: null,
        description: "Delikatny, chlodny szary tworzacy spokojne tlo dla mocniejszych akcentow.",
        tags: ["nowoczesny", "neutralny"]
      },
      {
        code: "RAL 6003",
        name: "Zielen oliwkowa",
        hex: "#4F5B3A",
        image: null,
        description: "Stonowana zielen dobrze laczy sie z otoczeniem ogrodowym i ciemnym drewnem.",
        tags: ["naturalny", "ogrod"]
      },
      {
        code: "RAL 7016",
        name: "Antracyt",
        hex: "#2F3338",
        image: null,
        description: "Klasyczny wybor do nowoczesnych budynkow z grafitowa dachowka lub czarna stolarka.",
        tags: ["premium", "kontrast"]
      },
      {
        code: "RAL 8019",
        name: "Braz czekoladowy",
        hex: "#322422",
        image: null,
        description: "Ciemny braz idealny do polaczen z cegla, kamieniem i naturalnym drewnem.",
        tags: ["cieply", "klasyka"]
      },
      {
        code: "RAL 8023",
        name: "Pomarancz brazowy",
        hex: "#A4571C",
        image: null,
        description: "Dodaje bryle energii i kontrastu, czesto wybierany do zabudow gospodarczych.",
        tags: ["akcent", "cieply"]
      },
      {
        code: "RAL 3004",
        name: "Czerwien purpurowa",
        hex: "#651E2B",
        image: null,
        description: "Gleboki bordowy ton, ktory podkresla elegancje budynku.",
        tags: ["dekor", "premium"]
      },
      {
        code: "RAL 7021",
        name: "Szary czarny",
        hex: "#2C2F33",
        image: null,
        description: "Solidny, ciemny odcien dajacy efekt monolitu w polaczeniu z grafitowym dachem.",
        tags: ["monochrom", "nowoczesny"]
      }
    ]
  },
  wood: {
    title: "Kolory Drewnopodobne",
    description:
      "Strukturalne pokrycia imitujace naturalne drewno. Sprawdzaja sie przy domach tradycyjnych i nowoczesnych, bez potrzeby dodatkowych oklein.",
    colors: [
      {
        code: "Zloty Dab",
        name: "Zloty dab",
        hex: "#BB8034",
        image: "/colors/wood-zloty-dab.png",
        description: "Cieple zlociste drewno, ktore najlepiej wyglada w polaczeniu z biala lub grafitowa elewacja.",
        tags: ["drewno", "cieply"]
      },
      {
        code: "Orzech",
        name: "Orzech",
        hex: "#4B321E",
        image: "/colors/wood-orzech.png",
        description: "Gleboki, nasycony braz przypominajacy olejowane deski. Dobrze gra z czarna stolarka.",
        tags: ["drewno", "premium"]
      },
      {
        code: "Grafitowy Dab",
        name: "Grafitowy dab",
        hex: "#1E1F27",
        image: "/colors/wood-grafitowy-dab.png",
        description: "Nowoczesna interpretacja drewna, laczy fakture slojow z grafitowym tonem.",
        tags: ["drewno", "nowoczesny"]
      },
      {
        code: "Multigloss",
        name: "Multigloss",
        hex: "#B17449",
        image: "/colors/wood-multigloss.png",
        description: "Energetyczny odcien inspirowany cedrem, dodaje bryle przytulnosci.",
        tags: ["drewno", "akcent"]
      }
    ]
  }
};

function GarageColors() {
  const [paletteKey, setPaletteKey] = useState("ral");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const palette = PALETTES[paletteKey];
  const selectedColor = palette.colors[selectedIndex] ?? palette.colors[0];
  const isWoodPalette = paletteKey === "wood";

  const handlePaletteChange = (nextKey) => {
    setPaletteKey(nextKey);
    setSelectedIndex(0);
  };

  const getSwatchStyle = (item) =>
    item.image
      ? {
          backgroundImage: `url(${item.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }
      : {
          backgroundColor: item.hex
        };

  return (
    <section id="kolory" className="relative isolate overflow-hidden bg-slate-950 py-24 text-white sm:py-28 lg:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 lg:flex-row lg:gap-20">
        <div className="flex flex-col gap-8 lg:w-2/5">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
              Kolorystyka
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Dobierz kolor swojego garazu
            </h2>
            <p className="text-sm text-slate-200/90 sm:text-base">
              Przegladaj popularne zestawy RAL oraz drewnopodobne wybarwienia. Kliknij probke, aby zobaczyc opis i sugestie laczen.
            </p>
          </div>

          <div className="inline-flex self-start rounded-full border border-white/10 bg-white/5 p-1 text-xs uppercase tracking-[0.35em]">
            {Object.keys(PALETTES).map((key) => {
              const isActive = key === paletteKey;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handlePaletteChange(key)}
                  className={`relative rounded-full px-5 py-2 font-semibold transition duration-200 ${
                    isActive
                      ? "bg-amber-500 text-slate-950 shadow-[0_10px_30px_-15px_rgba(245,158,11,0.7)]"
                      : "text-slate-200/80 hover:text-white"
                  }`}
                >
                  {PALETTES[key].title}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-slate-400">
            Kolory prezentowane na ekranie moga roznic sie od rzeczywistych probek. Przed finalna decyzja zapewniamy
            wysylke wzornikow lub konsultacje z doradca StylMetal.
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-10 rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-xl">
          {isWoodPalette ? (
            <>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-[0_25px_70px_-35px_rgba(15,23,42,0.8)]">
                <img
                  src="/colors/Drewnopodobne.jpeg"
                  alt="Przeglad drewnopodobnych kolorow StylMetal"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {palette.colors.map((color) => (
                  <div
                    key={color.code}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                  >
                    <span
                      className="h-12 w-12 flex-none overflow-hidden rounded-full border border-white/20 shadow-inner"
                      style={getSwatchStyle(color)}
                      aria-hidden
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">{color.name}</p>
                      <p className="text-xs text-slate-200/75">{color.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {palette.colors.map((color, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={color.code}
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className={`group relative overflow-hidden rounded-2xl border border-white/10 p-4 transition focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                        isSelected ? "ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900" : "hover:-translate-y-1 hover:shadow-lg"
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div
                        className="h-24 w-full rounded-xl border border-white/10 shadow-inner transition group-hover:scale-[1.02]"
                        style={getSwatchStyle(color)}
                      />
                      <div className="mt-4 text-left">
                        <p className="text-sm font-semibold text-white">{color.code}</p>
                        <p className="text-xs text-slate-200/80">{color.name}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col gap-4 rounded-2xl bg-slate-900/80 p-6 shadow-inner shadow-black/40">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Wybrany kolor</p>
                    <h3 className="mt-1 text-2xl font-bold text-white">{selectedColor.code}</h3>
                    <p className="text-sm text-slate-200/90">{selectedColor.name}</p>
                  </div>
                  <span
                    className="h-16 w-16 rounded-full border border-white/10 shadow-inner"
                    style={getSwatchStyle(selectedColor)}
                    aria-hidden
                  />
                </div>
                <p className="text-sm text-slate-200/90">{selectedColor.description}</p>
                {selectedColor.tags && selectedColor.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedColor.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default GarageColors;
