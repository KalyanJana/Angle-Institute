import React, { useState } from "react";
import axios from "axios";
import "./Franchise.css";

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

export default function Franchise() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    location: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/api/submissions/franchise`,
        form,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      const data = response.data;
      setStatus("success");
      setForm({ name: "", email: "", phone: "", address: "", location: "" });

      // Auto-reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  }

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

      <div className="franchise-form-wrap">
        <div className="fr-form-card">
          <h2>Get In Touch With Us</h2>
          <p>
            Interested in owning a franchise? Share your details and we'll
            contact you.
          </p>

          <form className="franchise-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Phone
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Address
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={2}
              />
            </label>

            <label>
              Location (City / Area)
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
              />
            </label>

            <div className="fr-form-actions">
              <button
                type="submit"
                className="btn btn--primary"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Submit"}
              </button>
              {status === "success" && (
                <span className="fr-success">
                  Thanks — we'll contact you soon.
                </span>
              )}
              {status === "error" && (
                <span className="fr-error">
                  Something went wrong. Please try again.
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
