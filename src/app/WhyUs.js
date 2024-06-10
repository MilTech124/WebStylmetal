import React from "react";

function WhyUs() {
  return (
    <div className="flex justify-center relative max-sm:mt-10">
      {/* yellow line */}
      <span className="sticky top-[300px] left-[50%] h-full  w-1  px-2 py-3 bg-yellow-500"></span>
      {/* yellow line */}
      {/* left column */}
      <div className="flex flex-col text-right pr-5 gap-20 pt-20 basis-1/3">
        <div className="hover:scale-105 transition-all">
          <h3 className="md:text-xl font-bold underline">
            Doradztwo na najwyższym poziomie
          </h3>
          <p className="text-sm pt-2">
            Znajdź odpowiedzi na Twoje pytania! Nie trać czasu na poszukiwanie
            informacji, skonsultuj się z nami.
          </p>
        </div>
        <div className="hover:scale-105 transition-all">
          <h3 className="md:text-xl font-bold underline">Produkcja</h3>
          <p className="text-sm pt-2">
            Nasza produkcja w garażach blaszanych to gwarancja solidności i
            funkcjonalności. Tworzymy garaże blaszane przystosowane do Twoich
            potrzeb.{" "}
          </p>
        </div>
        <div className="hover:scale-105 transition-all">
          <h3 className="md:text-xl font-bold underline">Montaż</h3>
          <p className="text-sm pt-2">
            Nasza usługa montażu obejmuje kompleksowe działania. Nasz zespół
            posiada niezbędne narzędzia i umiejętności, aby zapewnić efektywny i
            bezproblemowy montaż.
          </p>
        </div>
      </div>
      {/* left column */}
      <span className="border border-black h-[500px] max-sm:h-[1100px]"></span>
      {/* right column */}
      <div className="flex pl-5 flex-col gap-20 basis-1/3">
        <div className="hover:scale-105 transition-all">
          <h3 className="md:text-xl font-bold underline">Kontakt</h3>
          <p className="text-sm pt-2">Twoj sukces zaczyna się tutaj !</p>
        </div>
        <div className="hover:scale-105 transition-all">
          <h3 className="md:text-xl font-bold underline">Konfiguracja garażu</h3>
          <p className="text-sm pt-2">
            Oferujemy szeroki zakres opcji konfiguracji garażu, abyś mógł
            dostosować go do swoich indywidualnych potrzeb. Możesz wybrać
            odpowiednią wielkość garażu, aby pomieścił Twój samochód, motocykl
            czy inne przedmioty,.
          </p>
        </div>
        <div className="hover:scale-105 transition-all">
          <h3 className="md:text-xl font-bold underline">Transport</h3>
          <p className="text-sm pt-2">
            Oferujemy kompleksowe usługi garaży z transportem, aby zapewnić Ci
            łatwość i wygodę .{" "}
          </p>
        </div>
      </div>
      {/* right column */}
    </div>
  );
}

export default WhyUs;
