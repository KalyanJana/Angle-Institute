import { useState } from "react";
import axios from "axios";
import Button from "../components/Button";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
const API_ENQUIRIES_ENDPOINT =
  import.meta.env.VITE_API_ENQUIRIES_ENDPOINT || "/api/enquiries";
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
      <h1>Contact Us</h1>
      <p>
        Have questions? We'd love to hear from you. Fill out the form below and
        we'll get back to you soon.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          marginTop: 40,
        }}
      >
        <form onSubmit={submit} style={{ display: "grid", gap: 16 }}>
          <div>
            <label
              style={{ display: "block", marginBottom: 4, fontWeight: 600 }}
            >
              Name
            </label>
            <input
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #e0e0e0",
                borderRadius: 6,
                fontFamily: "inherit",
              }}
            />
          </div>
          <div>
            <label
              style={{ display: "block", marginBottom: 4, fontWeight: 600 }}
            >
              Email
            </label>
            <input
              placeholder="your@email.com"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #e0e0e0",
                borderRadius: 6,
                fontFamily: "inherit",
              }}
            />
          </div>
          <div>
            <label
              style={{ display: "block", marginBottom: 4, fontWeight: 600 }}
            >
              Phone
            </label>
            <input
              placeholder="+91-xxxxxxxxxx"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #e0e0e0",
                borderRadius: 6,
                fontFamily: "inherit",
              }}
            />
          </div>
          <div>
            <label
              style={{ display: "block", marginBottom: 4, fontWeight: 600 }}
            >
              Subject
            </label>
            <input
              placeholder="Course enquiry / General question"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #e0e0e0",
                borderRadius: 6,
                fontFamily: "inherit",
              }}
            />
          </div>
          <div>
            <label
              style={{ display: "block", marginBottom: 4, fontWeight: 600 }}
            >
              Message
            </label>
            <textarea
              placeholder="Tell us more..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #e0e0e0",
                borderRadius: 6,
                fontFamily: "inherit",
                resize: "vertical",
              }}
            />
          </div>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Sending..." : "Send Enquiry"}
          </Button>
        </form>

        <div
          style={{
            background: "#fff",
            padding: 24,
            borderRadius: 8,
            border: "1px solid #e0e0e0",
          }}
        >
          <h3>Get in Touch</h3>
          <div style={{ marginTop: 20 }}>
            <h4 style={{ marginTop: 0 }}>Address</h4>
            <p>{CONTACT_ADDRESS}</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>
              <strong>Phone:</strong>{" "}
              <a href={`tel:${CONTACT_PHONE}`}>{CONTACT_PHONE}</a>
              <br />
              <strong>Email:</strong>{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </div>
          <div>
            <h4>Hours</h4>
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
