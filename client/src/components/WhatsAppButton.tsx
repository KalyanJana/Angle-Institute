import React from "react";
import "./WhatsAppButton.css";

export default function WhatsAppButton() {
  const raw = import.meta.env.VITE_WHATSAPP_NUMBER || "+919088012311";
  const phone = raw.replace(/[^0-9]/g, "");
  const text = encodeURIComponent(
    "Hello, I would like to enquire about your courses.",
  );
  const href = `https://wa.me/${phone}?text=${text}`;

  return (
    <a className="whatsapp-btn" href={href} target="_blank" rel="noreferrer">
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M20.52 3.48A11.9 11.9 0 0012.02.04c-6.61 0-11.98 5.37-11.98 11.98 0 2.11.55 4.18 1.6 6.02L.5 23.5l5.66-1.48a11.86 11.86 0 006.86 2.01h.01c6.61 0 11.98-5.37 11.98-11.98 0-3.2-1.25-6.2-3.49-8.56z"
          fill="#25D366"
        />
        <path
          d="M17.3 14.1c-.3-.15-1.74-.86-2.01-.96-.27-.1-.46-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2 0-.38-.02-.53-.02-.15-.66-1.6-.9-2.19-.24-.57-.48-.5-.66-.51l-.56-.01c-.2 0-.52.07-.8.36-.28.29-1.07 1.05-1.07 2.55 0 1.5 1.1 2.95 1.26 3.15.17.2 2.18 3.36 5.29 4.71 3.11 1.36 3.11.9 3.67.85.56-.06 1.74-.71 1.99-1.39.25-.68.25-1.26.18-1.39-.07-.13-.27-.2-.56-.35z"
          fill="#fff"
        />
      </svg>
    </a>
  );
}
