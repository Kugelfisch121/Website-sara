"use client";

import { useState } from "react";
import { FaFacebook, FaWhatsapp, FaGoogle, FaInstagram } from "react-icons/fa";
import { HiCheck, HiClipboard } from "react-icons/hi";

interface ShareButtonsProps {
  title: string;
  excerpt?: string;
  url: string;
  imageUrl?: string;
}

export function ShareButtons({ title, excerpt, url, imageUrl }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://tierphysio-klauser.de"}${url}`;
  const shareText = excerpt ?? title;

  // Facebook Share
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;

  // WhatsApp Share
  const whatsappText = `${title}\n\n${shareText}\n\n🔗 ${fullUrl}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;

  // Google Business – Link zum Erstellen eines neuen Beitrags
  // Phase 2: Hier kann die Google Business API für automatisches Posten integriert werden
  const googleBusinessUrl =
    "https://business.google.com/create-post";

  // Instagram: Kopiert Caption + Link in die Zwischenablage
  const instagramCaption = `${title}\n\n${shareText}\n\n🔗 ${fullUrl}\n\n#Tierphysiotherapie #Tierphysio #Hund #Katze #Pferd #Tiergesundheit`;

  const handleInstagramCopy = async () => {
    try {
      await navigator.clipboard.writeText(instagramCaption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback für ältere Browser
      const textarea = document.createElement("textarea");
      textarea.value = instagramCaption;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-accent rounded-2xl p-6">
      <h3 className="font-serif text-lg font-semibold text-brand-text mb-1">
        Diesen Beitrag teilen
      </h3>
      <p className="text-sm text-brand-text-muted mb-5">
        Teile diesen Beitrag auf deinen sozialen Kanälen und erreiche noch mehr Tierbesitzer.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Facebook */}
        {/* Phase 2: facebook.com/sharer durch die Facebook Graph API ersetzen.
            Siehe docs/social-api-integration.md für Details. */}
        <a
          href={facebookShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-accent-dark/30 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
          aria-label="Auf Facebook teilen"
        >
          <FaFacebook size={24} className="text-blue-600" />
          <span className="text-xs font-medium text-brand-text-light group-hover:text-blue-700">
            Facebook
          </span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-accent-dark/30 hover:border-green-300 hover:bg-green-50 transition-colors group"
          aria-label="Via WhatsApp teilen"
        >
          <FaWhatsapp size={24} className="text-green-600" />
          <span className="text-xs font-medium text-brand-text-light group-hover:text-green-700">
            WhatsApp
          </span>
        </a>

        {/* Google Business */}
        {/* Phase 2: Direktes Posten über die Google My Business API.
            Siehe docs/social-api-integration.md für Details. */}
        <a
          href={googleBusinessUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-accent-dark/30 hover:border-orange-300 hover:bg-orange-50 transition-colors group"
          aria-label="Bei Google Business posten"
        >
          <FaGoogle size={24} className="text-orange-500" />
          <span className="text-xs font-medium text-brand-text-light group-hover:text-orange-600">
            Google
          </span>
        </a>

        {/* Instagram – kopiert Caption */}
        {/* Phase 2: Instagram Graph API für direktes Posten (Business Account erforderlich).
            Siehe docs/social-api-integration.md für Details. */}
        <button
          onClick={handleInstagramCopy}
          className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-accent-dark/30 hover:border-pink-300 hover:bg-pink-50 transition-colors group"
          aria-label="Instagram Caption kopieren"
        >
          {copied ? (
            <>
              <HiCheck size={24} className="text-green-500" />
              <span className="text-xs font-medium text-green-600">Kopiert!</span>
            </>
          ) : (
            <>
              <FaInstagram size={24} className="text-pink-600" />
              <span className="text-xs font-medium text-brand-text-light group-hover:text-pink-700">
                Instagram
              </span>
            </>
          )}
        </button>
      </div>

      {copied && (
        <p className="mt-3 text-xs text-green-700 bg-green-50 rounded-lg px-3 py-2 flex items-center gap-1.5">
          <HiClipboard size={14} />
          Caption & Link wurden kopiert – jetzt in Instagram einfügen!
        </p>
      )}
    </div>
  );
}
