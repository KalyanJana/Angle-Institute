import { useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import "./Contact.scss";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CONTACT_PHONE = import.meta.env.VITE_CONTACT_PHONE || "+91-9088012311";
const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || "info@angleinstitute.com";
const CONTACT_ADDRESS =
  import.meta.env.VITE_CONTACT_ADDRESS || "1A, Khetra Das Lane, Kolkata-700012";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/submissions/contact`,
        form,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      const data = response.data;
      setStatus(
        data.message ||
          "Thank you! Your message has been submitted. Our team will review and get back to you shortly.",
      );
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });

      // Auto-reset status message after 5 seconds
      setTimeout(() => setStatus(null), 5000);
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>
          Have questions? We'd love to hear from you. Fill out the form below
          and we'll get back to you soon.
        </p>
      </div>

      <div className="contact-wrapper">
        <form onSubmit={submit} className="contact-form">
          <div className="form-group">
            <label>Name</label>
            <input
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              placeholder="your@email.com"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              placeholder="+91-xxxxxxxxxx"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input
              placeholder="Course enquiry / General question"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              placeholder="Tell us more..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
            />
          </div>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Sending..." : "Send Enquiry"}
          </Button>
        </form>

        <div className="info-item">
          <h2 style={{ marginBottom: 20 }}>Get in Touch</h2>
          <div>
            <h3>Address</h3>
            <p>{CONTACT_ADDRESS}</p>
          </div>
          <div style={{ marginTop: 20 }}>
            <h3>Contact</h3>
            <p>
              <strong>Phone:</strong>{" "}
              <a href={`tel:${CONTACT_PHONE}`}>{CONTACT_PHONE}</a>
              <br />
              <strong>Email:</strong>{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </div>
          <div style={{ marginTop: 20 }}>
            <h3>Hours</h3>
            <p>
              Monday - Friday: 9:00 AM - 6:00 PM
              <br />
              Saturday: 10:00 AM - 4:00 PM
              <br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>

      {status && (
        <div
          style={{
            marginTop: 20,
            padding: 16,
            background: status.includes("Thank") ? "#d4edda" : "#f8d7da",
            color: status.includes("Thank") ? "#155724" : "#721c24",
            borderRadius: 6,
            border: `1px solid ${status.includes("Thank") ? "#c3e6cb" : "#f5c6cb"}`,
          }}
        >
          {status}
        </div>
      )}
    </main>
  );
}
