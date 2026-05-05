/**
 * Lädt ein Foto-File von Telegram zu Cloudinary hoch.
 * Gibt die Cloudinary public_id zurück.
 */
export async function uploadTelegramPhotoToCloudinary(
  fileUrl: string
): Promise<string> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary-Zugangsdaten nicht konfiguriert.");
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const folder = "tierphysio/bot-uploads";

  // Signatur für den Upload
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = await generateSignature(paramsToSign, apiSecret);

  const formData = new FormData();
  formData.append("file", fileUrl);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  const data = await res.json() as { public_id?: string; error?: { message: string } };

  if (!res.ok || !data.public_id) {
    throw new Error(data.error?.message ?? "Cloudinary-Upload fehlgeschlagen");
  }

  return data.public_id;
}

async function generateSignature(paramsStr: string, secret: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(paramsStr + secret);
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
