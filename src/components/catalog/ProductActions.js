"use client";
import { useState } from "react";

const initialFormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  message: "",
};

const ProductActions = ({ hasPrice, priceHtml, inquiryEndpoint, productName }) => {
  const defaultMessage = productName ? `Dzien dobry, prosze o wycene produktu: ${productName}.` : "";
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(() => ({
    ...initialFormState,
    message: defaultMessage,
  }));
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  console.log("test",hasPrice, priceHtml, inquiryEndpoint, productName);
  

  const resetForm = () => {
    setFormData({ ...initialFormState, message: defaultMessage });
    setStatus("idle");
    setError("");
  };

  const toggleModal = (open) => {
    setModalOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inquiryEndpoint) {
      setError("Brak skonfigurowanego endpointu zapytania.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const response = await fetch(inquiryEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, productName }),
      });

      if (!response.ok) {
        throw new Error("Nie udalo sie wyslac formularza.");
      }

      setStatus("success");
      setFormData({ ...initialFormState, message: defaultMessage });
    } catch (submitError) {
      setStatus("error");
      setError(submitError.message || "Wystapil blad podczas wysylania.");
    }
  };

  return (
    <div className="mt-10 flex flex-col gap-6">
      {priceHtml && (
        <div
          className="text-2xl font-semibold text-slate-800"
          dangerouslySetInnerHTML={{ __html: priceHtml }}
        />
      )}

      {hasPrice ? (
        <a
          href="tel:792293364"
          className="inline-flex w-full items-center justify-center rounded-full bg-amber-500 px-8 py-4 text-center text-lg font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          Zamow
        </a>
      ) : (
        <button
          type="button"
          onClick={() => toggleModal(true)}
          className="inline-flex w-full items-center justify-center rounded-full border border-amber-500 px-8 py-4 text-center text-lg font-semibold uppercase tracking-[0.3em] text-amber-500 transition hover:bg-amber-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          Zamow wycene
        </button>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-10 backdrop-blur"
          role="dialog"
          aria-modal="true"
          onClick={() => toggleModal(false)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-white p-10 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => toggleModal(false)}
              className="absolute right-6 top-6 text-slate-400 transition hover:text-slate-600"
              aria-label="Zamknij formularz"
            >
              &#10005;
            </button>

            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-500">
                Zapytanie
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-800">
                Popros o wycene produktu
              </h3>
              {productName && (
                <p className="mt-2 text-sm text-slate-500">
                  Produkt: <span className="font-semibold text-slate-700">{productName}</span>
                </p>
              )}
            </div>

            <form className="grid gap-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  Imie
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-base text-slate-800 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  Nazwisko
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-base text-slate-800 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  Telefon
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-base text-slate-800 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  E-mail
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-base text-slate-800 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Wiadomosc
                <textarea
                  required
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-base text-slate-800 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </label>

              {error && <p className="text-sm text-red-500">{error}</p>}
              {status === "success" && (
                <p className="text-sm text-emerald-600">
                  Dziekujemy! Twoje zapytanie zostalo wyslane.
                </p>
              )}

              <div className="flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={() => toggleModal(false)}
                  className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                >
                  Zamknij
                </button>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "loading" ? "Wysylanie..." : "Wyslij"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductActions;
