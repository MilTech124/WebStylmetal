
export const metadata = {
  title: "Kontakt - Stylmetal",
  description: "Stylmetal to firma produkująca garaże na zamówienie. Oferujemy szeroki wybór garaży, od klasycznych po nowoczesne. Nasze garaże są wykonane z najwyższej jakości materiałów i objęte gwarancją.",
  keywords: "garaże, garaże na zamówienie, garaże metalowe, garaże blaszane, garaże drewniane, garaże murowane",
  robots: "index, follow",
  author: "Jarosław Matusiak",
  viewport: "width=device-width, initial-scale=1",
  favicon: "favicon.ico",
};

function page() {
  return (
    <div className="pt-[200px] md:flex gap-5 max-w-screen-xl m-auto px-[8%]">
      <div className="md:basis-1/2">
        <h1 className="text-4xl pb-4">Kontakt</h1>
        <div>
          <div className="flex gap-2 items-center">
            <img src="/clock.svg" />
            <p className="text-md font-semibold">Godziny pracy</p>
          </div>
          <p className="text-slate-400 pt-2"> Pon-Sob. 8:00-18:00</p>
          <span className="border-b-2 w-full border-slate-400 inline-block"></span>
        </div>
        <div className="pt-10">
          <div className="flex gap-2 items-center">
            <img src="/oldphone.svg" />
            <p className="text-md font-semibold">Telefon</p>
          </div>
          <a href="tel:+48 792293364">
            <p className="text-slate-400 pt-2">+48 792293364</p>
          </a>
          <a href="tel:+48 795139224">
            <p className="text-slate-400 pt-2">+48 795139224</p>
          </a>
          <span className="border-b-2 w-full border-slate-400 inline-block"></span>
        </div>
        <div className="pt-10">
          <div className="flex gap-2 items-center">
            <img src="/email-contact.svg" />
            <p className="text-md font-semibold">E-mail</p>
          </div>
          <a href="mailto:biuro@stylmetal.pl">
            <p className="text-slate-400 pt-2">biuro@stylmetal.pl</p>
          </a>
          <span className="border-b-2 w-full border-slate-400 inline-block"></span>
        </div>
        <div className="pt-10">
          <div className="flex gap-2 items-center">
            <img src="/car.svg" />
            <p className="text-md font-semibold">Transport</p>
          </div>
          <p className="text-slate-400 pt-2 text-sm">
            Oferujemy kompleksowe usługi transportu garaży na terenie całego
            kraju. Bez względu na to, gdzie znajdujesz się i gdzie chcesz mieć
            dostarczony garaż, nasza firma zapewni Ci profesjonalne i niezawodne
            rozwiązania transportowe.
          </p>
          <span className="border-b-2 w-full border-slate-400 inline-block"></span>
        </div>
		<div className="pt-5 text-md font-semibold">
			<h3>Social Media</h3>
			<img src="/face.png"/>
		</div>
      </div>

      <img className="md:basis-1/2" src="/bigphone.png" alt="bg-phone" />
    </div>
  );
}

export default page;
