import React from "react";
import "./Franchise.css";

export default function Franchise() {
  const items = [
    {
      title: "Become a Partner",
      desc: "Open a franchise with Angle Institute and bring quality coaching to your city.",
    },
    {
      title: "Support & Training",
      desc: "We provide initial training, curriculum, and placement support.",
    },
    {
      title: "Marketing Assistance",
      desc: "Local marketing assets and digital campaigns to help you grow.",
    },
  ];

  return (
    <div className="franchise-page">
      <div className="franchise-hero">
        <h1>Franchise Opportunities</h1>
        <p>Join hands with Angle Institute to expand quality education.</p>
      </div>

      <div className="franchise-grid">
        {items.map((it, idx) => (
          <div className="fr-card" key={idx}>
            <h3>{it.title}</h3>
            <p>{it.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
