import React from "react";

function About() {
  return (
    <div id="info" className="w-full md:p-20 bg-slate-800">
      <div className="flex flex-wrap justify-center gap-10">
        <img src="/logo.png" className=" max-w-[286px] max-h-[100px]" />
        <div className="md:basis-1/2 max-sm:text-center">
          <h2 className="text-slate-400 md:text-xl font-semibold underline pb-5">Producent Garaży Blaszanych</h2>
          <p className="text-white">
            Od lat specjalizujemy się w produkcji wysokiej jakości garaży
            blaszanych, które zapewniają nie tylko ochronę dla Twojego pojazdu,
            ale także funkcjonalną i estetyczną przestrzeń do przechowywania.<br></br><br></br>
            Jako producent STYLMETAL, dążymy do doskonałości w każdym detalu
            naszych garaży blaszanych. Wykorzystujemy tylko najlepsze materiały,
            które są trwałe, odporne na warunki atmosferyczne i łatwe w
            utrzymaniu. Nasze garaże są solidnie wykonane i zaprojektowane tak,
            aby sprostać Twoim potrzebom przechowywania.<br></br><br></br> Produkty marki
            STYLMETAL cieszą się uznaniem klientów za ich niezawodność, trwałość
            i estetykę. Niezależnie od tego, czy potrzebujesz garażu prywatnego,
            czy szukasz rozwiązania dla swojej firmy, nasze garaże blaszane są
            idealnym wyborem. Zaufaj producentowi STYLMETAL i ciesz się solidnym
            i funkcjonalnym garażem blaszanym, który spełni Twoje oczekiwania
            pod względem jakości, wytrzymałości i designu.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About;
