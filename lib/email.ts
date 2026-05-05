import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "info@tierphysio-klauser.de";

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
  const { error } = await resend.emails.send({
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
  const { error } = await resend.emails.send({
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
