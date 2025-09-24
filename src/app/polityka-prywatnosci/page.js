export const metadata = {
  title: "Polityka prywatności - Stylmetal",
  description:
    "Polityka prywatności firmy STYLMETAL Dawid Załubski. Dowiedz się, jakie dane przetwarzamy, w jakim celu oraz jakie prawa Ci przysługują.",
  robots: "index, follow",
};

const sections = [
  {
    title: "1. Administrator danych",
    body: [
      "Administratorem Twoich danych osobowych jest STYLMETAL Dawid Załubski z siedzibą w Przyszowej 153, 34-604 Przyszowa, NIP: 7372234548, REGON: 522758997 (dalej: \"Stylmetal\" lub \"Administrator\").",
    ],
  },
  {
    title: "2. Dane kontaktowe",
    body: [
      "W sprawach związanych z ochroną danych osobowych możesz kontaktować się z nami telefonicznie pod numerami +48 792 293 364 lub +48 795 139 224, mailowo pod adresem biuro@stylmetal.pl, a także listownie na adres: Przyszowa 153, 34-604 Przyszowa.",
    ],
  },
  {
    title: "3. Zakres przetwarzanych danych",
    body: [
      "Przetwarzamy dane osobowe przekazywane przez Ciebie w ramach korzystania z naszych usług, w szczególności: dane identyfikacyjne (np. imię i nazwisko), dane kontaktowe (adres e-mail, numer telefonu, adres korespondencyjny), dane dotyczące prowadzonej działalności (o ile są udostępniane), a także informacje zawarte w korespondencji oraz dane dotyczące realizowanych zamówień.",
    ],
  },
  {
    title: "4. Cele i podstawy prawne przetwarzania",
    body: [
      "a) przygotowanie i realizacja zamówień oraz świadczenie usług oferowanych przez Stylmetal (art. 6 ust. 1 lit. b RODO);",
      "b) prowadzenie korespondencji, obsługa zapytań i formularzy kontaktowych (art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes Administratora polegający na komunikacji z Klientami);",
      "c) realizacja obowiązków podatkowych, księgowych oraz archiwizacyjnych (art. 6 ust. 1 lit. c RODO);",
      "d) dochodzenie i obrona przed roszczeniami (art. 6 ust. 1 lit. f RODO);",
      "e) prowadzenie działań marketingowych, w tym przesyłanie informacji handlowych drogą elektroniczną – w przypadku wyrażenia zgody (art. 6 ust. 1 lit. a RODO).",
    ],
  },
  {
    title: "5. Odbiorcy danych",
    body: [
      "Dane mogą być przekazywane zaufanym podmiotom współpracującym ze Stylmetal wyłącznie w zakresie niezbędnym do realizacji celów przetwarzania, w szczególności firmom kurierskim i transportowym, dostawcom systemów IT, podmiotom świadczącym usługi księgowe oraz podmiotom uprawnionym na podstawie przepisów prawa. Wszystkie podmioty przetwarzające dane na nasze zlecenie działają na podstawie zawartych umów powierzenia danych osobowych i zobowiązane są do zapewnienia odpowiednich środków bezpieczeństwa.",
    ],
  },
  {
    title: "6. Przekazywanie danych do państw trzecich",
    body: [
      "Co do zasady nie przekazujemy Twoich danych poza Europejski Obszar Gospodarczy. Jeżeli jednak taka konieczność się pojawi, poinformujemy Cię o tym oraz zapewnimy odpowiednie zabezpieczenia zgodne z obowiązującymi przepisami prawa.",
    ],
  },
  {
    title: "7. Okres przechowywania danych",
    body: [
      "Dane przetwarzane w celach związanych z realizacją umowy przechowujemy przez okres jej obowiązywania oraz do czasu przedawnienia roszczeń. Dane związane z obowiązkami podatkowymi i księgowymi przechowujemy przez okres wynikający z przepisów prawa. Dane przetwarzane na podstawie zgody – do czasu jej wycofania. Dane gromadzone na podstawie prawnie uzasadnionego interesu przechowujemy do czasu zgłoszenia skutecznego sprzeciwu lub ustania tego interesu.",
    ],
  },
  {
    title: "8. Prawa osób, których dane dotyczą",
    body: [
      "Przysługuje Ci prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych, wniesienia sprzeciwu wobec przetwarzania oraz prawo do cofnięcia zgody w dowolnym momencie. Wycofanie zgody nie wpływa na zgodność z prawem przetwarzania, którego dokonano przed jej cofnięciem. Przysługuje Ci również prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa), jeśli uznasz, że przetwarzamy Twoje dane niezgodnie z prawem.",
    ],
  },
  {
    title: "9. Informacja o wymogu podania danych",
    body: [
      "Podanie danych jest dobrowolne, jednak brak ich przekazania może uniemożliwić realizację usług, udzielenie odpowiedzi na zapytania lub zawarcie umowy.",
    ],
  },
  {
    title: "10. Profilowanie i zautomatyzowane podejmowanie decyzji",
    body: [
      "Nie stosujemy zautomatyzowanego podejmowania decyzji, w tym profilowania, które wywoływałoby wobec Ciebie skutki prawne lub w podobny sposób istotnie na Ciebie wpływało.",
    ],
  },
  {
    title: "11. Pliki cookies i technologie śledzące",
    body: [
      "Nasza strona internetowa może wykorzystywać pliki cookies w celu zapewnienia jej prawidłowego działania, analizy ruchu oraz dopasowania treści. W zakresie, w jakim pliki cookies niezbędne są do funkcjonowania strony, podstawą przetwarzania jest nasz prawnie uzasadniony interes. W przypadku pozostałych cookies podstawą przetwarzania jest Twoja zgoda, którą możesz w każdej chwili wycofać poprzez zmianę ustawień przeglądarki lub odpowiednie narzędzia dostępne na stronie.",
    ],
  },
  {
    title: "12. Zmiany polityki prywatności",
    body: [
      "Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce prywatności. Aktualna wersja dokumentu jest dostępna na stronie internetowej stylmetal.pl. O istotnych zmianach będziemy informować poprzez stosowne komunikaty na stronie lub drogą mailową.",
    ],
  },
];

const LastUpdate = "Aktualizacja: 23 września 2025 r.";

function PrivacyPolicyPage() {
  return (
    <div className="pt-[200px] pb-24 px-[8%] max-w-screen-xl m-auto text-slate-800">
      <h1 className="text-4xl font-semibold mb-6">Polityka prywatności Stylmetal</h1>
      <p className="text-sm text-slate-500 mb-12">{LastUpdate}</p>
      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.title} className="space-y-4">
            <h2 className="text-2xl font-semibold">{section.title}</h2>
            <div className="space-y-2 text-base leading-relaxed">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
