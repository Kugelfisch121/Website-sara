"use client";

import { useState } from "react";

const TIERARTEN = ["Hund", "Katze", "Pferd", "Sonstiges"];

export function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefon: "",
    tierart: "",
    tiername: "",
    anliegen: "",
    zeitraum: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json() as { success?: boolean; error?: string };
      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Unbekannter Fehler");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Etwas hat nicht geklappt.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="font-serif text-xl font-semibold text-green-800 mb-2">
          Anfrage erfolgreich gesendet!
        </h3>
        <p className="text-green-700">
          Danke, ich melde mich so schnell wie möglich bei dir zurück.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-brand-text mb-1.5">
            Dein Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Maria Musterfrau"
            className="w-full rounded-xl border border-accent-dark/50 px-4 py-3 text-brand-text placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-text mb-1.5">
            E-Mail <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="maria@beispiel.de"
            className="w-full rounded-xl border border-accent-dark/50 px-4 py-3 text-brand-text placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="telefon" className="block text-sm font-medium text-brand-text mb-1.5">
            Telefon <span className="text-red-500">*</span>
          </label>
          <input
            id="telefon"
            name="telefon"
            type="tel"
            required
            value={formData.telefon}
            onChange={handleChange}
            placeholder="+49 123 456789"
            className="w-full rounded-xl border border-accent-dark/50 px-4 py-3 text-brand-text placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label htmlFor="tierart" className="block text-sm font-medium text-brand-text mb-1.5">
            Tierart <span className="text-red-500">*</span>
          </label>
          <select
            id="tierart"
            name="tierart"
            required
            value={formData.tierart}
            onChange={handleChange}
            className="w-full rounded-xl border border-accent-dark/50 px-4 py-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors bg-white"
          >
            <option value="">Bitte wählen…</option>
            {TIERARTEN.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="tiername" className="block text-sm font-medium text-brand-text mb-1.5">
          Name deines Tieres <span className="text-brand-text-muted text-xs">(optional)</span>
        </label>
        <input
          id="tiername"
          name="tiername"
          type="text"
          value={formData.tiername}
          onChange={handleChange}
          placeholder="z.B. Bello"
          className="w-full rounded-xl border border-accent-dark/50 px-4 py-3 text-brand-text placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
        />
      </div>

      <div>
        <label htmlFor="anliegen" className="block text-sm font-medium text-brand-text mb-1.5">
          Anliegen / Beschreibung <span className="text-red-500">*</span>
        </label>
        <textarea
          id="anliegen"
          name="anliegen"
          required
          rows={4}
          value={formData.anliegen}
          onChange={handleChange}
          placeholder="Bitte beschreibe kurz, womit dein Tier Probleme hat oder was behandelt werden soll…"
          className="w-full rounded-xl border border-accent-dark/50 px-4 py-3 text-brand-text placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
        />
      </div>

      <div>
        <label htmlFor="zeitraum" className="block text-sm font-medium text-brand-text mb-1.5">
          Gewünschter Zeitraum <span className="text-red-500">*</span>
        </label>
        <input
          id="zeitraum"
          name="zeitraum"
          type="text"
          required
          value={formData.zeitraum}
          onChange={handleChange}
          placeholder="z.B. Nachmittags, KW 20 oder ab nächster Woche"
          className="w-full rounded-xl border border-accent-dark/50 px-4 py-3 text-brand-text placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 bg-red-50 rounded-xl px-4 py-3 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full btn-highlight text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Wird gesendet…" : "Terminanfrage absenden"}
      </button>

      <p className="text-xs text-brand-text-muted text-center">
        Mit dem Absenden stimmst du unserer{" "}
        <a href="/datenschutz" className="underline hover:text-primary">
          Datenschutzerklärung
        </a>{" "}
        zu.
      </p>
    </form>
  );
}
