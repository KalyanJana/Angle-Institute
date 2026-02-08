import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
const API_ENQUIRIES_ENDPOINT =
  import.meta.env.VITE_API_ENQUIRIES_ENDPOINT || "/api/enquiries";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "new" | "read" | "replied";
}

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [filter, setFilter] = useState<"all" | "new" | "read" | "replied">(
    "all",
  );

  useEffect(() => {
    fetchEnquiries();
  }, []);

  async function fetchEnquiries() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}${API_ENQUIRIES_ENDPOINT}`,
      );
      setEnquiries(response.data.enquiries || []);
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(
    id: string,
    newStatus: "new" | "read" | "replied",
  ) {
    try {
      await axios.patch(`${API_BASE_URL}${API_ENQUIRIES_ENDPOINT}/${id}`, {
        status: newStatus,
      });
      setEnquiries(
        enquiries.map((e) => (e.id === id ? { ...e, status: newStatus } : e)),
      );
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  }

  async function deleteEnquiry(id: string) {
    if (!window.confirm("Are you sure you want to delete this enquiry?"))
      return;
    try {
      await axios.delete(`${API_BASE_URL}${API_ENQUIRIES_ENDPOINT}/${id}`);
      setEnquiries(enquiries.filter((e) => e.id !== id));
      setSelectedEnquiry(null);
    } catch (err) {
      console.error("Failed to delete enquiry:", err);
    }
  }

  const filteredEnquiries =
    filter === "all" ? enquiries : enquiries.filter((e) => e.status === filter);
  const newCount = enquiries.filter((e) => e.status === "new").length;

  return (
    <main>
      <h1>Admin Dashboard</h1>
      <p>Manage student enquiries and applications.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "250px 1fr",
          gap: 24,
          marginTop: 32,
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 8,
            border: "1px solid #e0e0e0",
            height: "fit-content",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Filters</h3>
          <div style={{ display: "grid", gap: 8 }}>
            <div
              style={{
                padding: "8px 12px",
                background: filter === "all" ? "#0b5ed7" : "#f5f5f5",
                color: filter === "all" ? "#fff" : "#000",
                borderRadius: 6,
                cursor: "pointer",
              }}
              onClick={() => setFilter("all")}
            >
              All ({enquiries.length})
            </div>
            <div
              style={{
                padding: "8px 12px",
                background: filter === "new" ? "#0b5ed7" : "#f5f5f5",
                color: filter === "new" ? "#fff" : "#000",
                borderRadius: 6,
                cursor: "pointer",
              }}
              onClick={() => setFilter("new")}
            >
              New ({newCount})
            </div>
            <div
              style={{
                padding: "8px 12px",
                background: filter === "read" ? "#0b5ed7" : "#f5f5f5",
                color: filter === "read" ? "#fff" : "#000",
                borderRadius: 6,
                cursor: "pointer",
              }}
              onClick={() => setFilter("read")}
            >
              Read
            </div>
            <div
              style={{
                padding: "8px 12px",
                background: filter === "replied" ? "#0b5ed7" : "#f5f5f5",
                color: filter === "replied" ? "#fff" : "#000",
                borderRadius: 6,
                cursor: "pointer",
              }}
              onClick={() => setFilter("replied")}
            >
              Replied
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div>
          {loading ? (
            <p>Loading enquiries...</p>
          ) : filteredEnquiries.length === 0 ? (
            <p
              style={{
                background: "#fff",
                padding: 20,
                borderRadius: 8,
                border: "1px solid #e0e0e0",
              }}
            >
              No enquiries found.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
              }}
            >
              {/* List */}
              <div>
                <h3>Enquiries ({filteredEnquiries.length})</h3>
                <div style={{ display: "grid", gap: 12 }}>
                  {filteredEnquiries.map((e) => (
                    <div
                      key={e.id}
                      onClick={() => setSelectedEnquiry(e)}
                      style={{
                        padding: 12,
                        background:
                          selectedEnquiry?.id === e.id ? "#e7f1ff" : "#fff",
                        border:
                          selectedEnquiry?.id === e.id
                            ? "2px solid #0b5ed7"
                            : "1px solid #e0e0e0",
                        borderRadius: 6,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>{e.name}</div>
                      <div style={{ fontSize: "0.85rem", color: "#666" }}>
                        {e.email}
                      </div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "#999",
                          marginTop: 4,
                        }}
                      >
                        {e.subject}
                      </div>
                      <div
                        style={{
                          marginTop: 8,
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.75rem",
                            padding: "2px 8px",
                            background:
                              e.status === "new"
                                ? "#ffc107"
                                : e.status === "read"
                                  ? "#17a2b8"
                                  : "#28a745",
                            color: "#fff",
                            borderRadius: 3,
                          }}
                        >
                          {e.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detail */}
              {selectedEnquiry && (
                <div
                  style={{
                    background: "#fff",
                    padding: 20,
                    borderRadius: 8,
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <h3 style={{ marginTop: 0 }}>Enquiry Details</h3>
                  <div style={{ display: "grid", gap: 12 }}>
                    <div>
                      <strong>Name:</strong> {selectedEnquiry.name}
                    </div>
                    <div>
                      <strong>Email:</strong> {selectedEnquiry.email}
                    </div>
                    <div>
                      <strong>Phone:</strong> {selectedEnquiry.phone}
                    </div>
                    <div>
                      <strong>Subject:</strong> {selectedEnquiry.subject}
                    </div>
                    <div>
                      <strong>Message:</strong>
                      <p
                        style={{
                          background: "#f5f5f5",
                          padding: 12,
                          borderRadius: 6,
                          marginTop: 8,
                        }}
                      >
                        {selectedEnquiry.message}
                      </p>
                    </div>
                    <div>
                      <strong>Submitted:</strong>{" "}
                      {new Date(selectedEnquiry.createdAt).toLocaleString()}
                    </div>
                    <div>
                      <strong>Status:</strong>
                      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                        <Button
                          variant={
                            selectedEnquiry.status === "new"
                              ? "primary"
                              : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            updateStatus(selectedEnquiry.id, "new")
                          }
                        >
                          New
                        </Button>
                        <Button
                          variant={
                            selectedEnquiry.status === "read"
                              ? "primary"
                              : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            updateStatus(selectedEnquiry.id, "read")
                          }
                        >
                          Read
                        </Button>
                        <Button
                          variant={
                            selectedEnquiry.status === "replied"
                              ? "primary"
                              : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            updateStatus(selectedEnquiry.id, "replied")
                          }
                        >
                          Replied
                        </Button>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteEnquiry(selectedEnquiry.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
