"use client";

import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json() as { success?: boolean; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? "Fehler");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Etwas hat nicht geklappt.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <div className="text-3xl mb-2">✅</div>
        <h3 className="font-serif text-lg font-semibold text-green-800 mb-1">
          Nachricht gesendet!
        </h3>
        <p className="text-green-700 text-sm">Ich melde mich bald bei dir.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="c-name" className="block text-sm font-medium text-brand-text mb-1.5">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="c-name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Dein Name"
          className="w-full rounded-xl border border-accent-dark/50 px-4 py-3 text-brand-text placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
        />
      </div>
      <div>
        <label htmlFor="c-email" className="block text-sm font-medium text-brand-text mb-1.5">
          E-Mail <span className="text-red-500">*</span>
        </label>
        <input
          id="c-email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="deine@email.de"
          className="w-full rounded-xl border border-accent-dark/50 px-4 py-3 text-brand-text placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
        />
      </div>
      <div>
        <label htmlFor="c-message" className="block text-sm font-medium text-brand-text mb-1.5">
          Nachricht <span className="text-red-500">*</span>
        </label>
        <textarea
          id="c-message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Wie kann ich dir helfen?"
          className="w-full rounded-xl border border-accent-dark/50 px-4 py-3 text-brand-text placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
        />
      </div>
      {status === "error" && (
        <p className="text-red-600 bg-red-50 rounded-xl px-4 py-3 text-sm">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full btn-primary py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Wird gesendet…" : "Nachricht senden"}
      </button>
    </form>
  );
}
