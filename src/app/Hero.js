import Link from "next/link";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white mb-10 pt-5">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_#1e293b,_#020617_70%)]" aria-hidden />
      </div>
      <div className="absolute inset-x-0 top-[12%] flex justify-center" aria-hidden>
        <div className="h-52 w-[42rem] rounded-full bg-amber-500/10 blur-3xl" />
      </div>
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 pb-24 pt-24 sm:px-10 lg:flex-row lg:items-center lg:gap-16 lg:px-12 lg:pb-28 lg:pt-32">
        <div className="relative w-full max-w-xl self-stretch rounded-3xl border border-white/10 bg-slate-900/75 p-8 shadow-[0_25px_80px_-30px_rgba(15,23,42,0.9)] backdrop-blur-xl lg:w-1/2 lg:border-none lg:bg-transparent lg:shadow-none lg:backdrop-blur-none">
          <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
            StylMetal
          </span>
          <div className="mt-6 space-y-5">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Garaz na Twoich warunkach
            </h1>
            <p className="text-base text-slate-200 sm:text-lg">
              Nowoczesne garaże i wiaty
              Trwała konstrukcja, szybki montaż i możliwość pełnej personalizacji dopasowanej do Twoich potrzeb.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#oferta"
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-amber-400"
            >
              Zobacz oferte
            </Link>
            <Link
              href="/kategorie"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/40 hover:text-amber-200"
            >
              Sprawdz realizacje
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em] text-slate-200">
            <span className="rounded-full bg-white/5 px-4 py-2">Segmentowe bramy</span>           
            <span className="rounded-full bg-white/5 px-4 py-2">Wykonczenia w cenie</span>
          </div>
        </div>
        <div className="relative flex w-full items-center justify-center overflow-visible lg:w-1/2">
          <div className="pointer-events-none absolute inset-0 rounded-[4rem] bg-amber-500/10 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-14 left-6 h-48 w-48 rounded-full bg-amber-500/25 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -top-20 right-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" aria-hidden />
          <div className="relative w-full max-w-4xl lg:max-w-none">
            <div className="absolute inset-x-10 bottom-[-6%] h-56 rounded-full bg-slate-900/80 blur-3xl" aria-hidden />
            <div className="relative w-full max-w-none scale-x-[-1] lg:w-[130%] lg:translate-x-16 xl:w-[150%] xl:translate-x-28">
              <img
                src="/garage-hero.webp"
                alt="StylMetal garaz premium"
                className="hero-garage relative z-10 w-full drop-shadow-[0_45px_80px_rgba(5,10,25,0.6)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
