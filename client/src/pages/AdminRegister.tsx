import { useState } from "react";
import axios from "axios";
import Button from "../components/Button";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export default function AdminRegister() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    mobileNo: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/signup`, form, {
        headers: { "Content-Type": "application/json" },
      });
      setStatus("Admin created successfully. You can now login.");
      setForm({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        mobileNo: "",
      });
      setTimeout(() => setStatus(null), 5000);
    } catch (err: any) {
      console.error("Signup error:", err);
      setStatus(err?.response?.data?.error || "Failed to create admin");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-register">
      <h1>Register Admin</h1>
      <p>Create an admin account for the dashboard.</p>

      <form onSubmit={submit} className="admin-register-form">
        <label>
          Email (username)
          <input
            type="email"
            required
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>

        <label>
          First name
          <input
            required
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
        </label>

        <label>
          Last name
          <input
            required
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </label>

        <label>
          Mobile
          <input
            required
            value={form.mobileNo}
            onChange={(e) => setForm({ ...form, mobileNo: e.target.value })}
          />
        </label>

        <div style={{ marginTop: 8 }}>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Creating..." : "Create Admin"}
          </Button>
        </div>
      </form>

      {status && <div className="admin-register-status">{status}</div>}
    </main>
  );
}
