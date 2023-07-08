function Hero() {
  return (
    <>
      <div className="bg-[url('/hero.webp')] w-full h-[600px] flex items-center justify-end bg-no-repeat bg-cover">
        <div className=" text-white md:pr-[10%]">
          <h1 className="text-4xl text-right font-bold">Producent Garaży</h1>
          <p className="max-w-xl text-right">
            Twój spokój i bezpieczeństwo. Najwyższa jakość wykonania i trwałość.
            Ochrona przed warunkami atmosferycznymi i kradzieżą.<br></br> Zaufaj
            nam i naszym produktom.
          </p>
        </div>
      </div>
      <img src="/garage-hero.webp" className="mt-[-300px] max-sm:mt-[-200px] hover:translate-x-10 hover:scale-105 transition-all duration-300" />
    </>
  );
}

export default Hero;
