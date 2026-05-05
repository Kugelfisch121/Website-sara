import { Resend } from "resend";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "info@tierphysio-klauser.de";

// Lazy initialization – Resend wirft sofort beim Konstruktor wenn kein API-Key da ist.
// Daher erst beim tatsächlichen Aufruf instanziieren, nicht beim Modul-Load.
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY ist nicht konfiguriert.");
  return new Resend(apiKey);
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface AppointmentFormData {
  name: string;
  email: string;
  telefon: string;
  tierart: string;
  tiername?: string;
  anliegen: string;
  zeitraum: string;
}

export async function sendContactEmail(data: ContactFormData) {
  const { error } = await getResend().emails.send({
    from: "Website <noreply@tierphysio-klauser.de>",
    to: CONTACT_EMAIL,
    replyTo: data.email,
    subject: `Neue Kontaktanfrage von ${data.name}`,
    html: `
      <h2>Neue Kontaktanfrage</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>E-Mail:</strong> ${data.email}</p>
      <p><strong>Nachricht:</strong></p>
      <p style="white-space: pre-wrap;">${data.message}</p>
    `,
  });

  if (error) throw new Error(error.message);
}

export async function sendAppointmentEmail(data: AppointmentFormData) {
  const { error } = await getResend().emails.send({
    from: "Website <noreply@tierphysio-klauser.de>",
    to: CONTACT_EMAIL,
    replyTo: data.email,
    subject: `Neue Terminanfrage von ${data.name} – ${data.tierart}`,
    html: `
      <h2>Neue Terminanfrage</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>E-Mail:</strong> ${data.email}</p>
      <p><strong>Telefon:</strong> ${data.telefon}</p>
      <p><strong>Tierart:</strong> ${data.tierart}</p>
      ${data.tiername ? `<p><strong>Tiername:</strong> ${data.tiername}</p>` : ""}
      <p><strong>Anliegen:</strong></p>
      <p style="white-space: pre-wrap;">${data.anliegen}</p>
      <p><strong>Gewünschter Zeitraum:</strong> ${data.zeitraum}</p>
    `,
  });

  if (error) throw new Error(error.message);
}
