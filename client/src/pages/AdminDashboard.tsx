import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button";
import CourseModal from "../components/CourseModal";
import { courses as dummyCourses } from "../data/courses";
import "./AdminDashboard.scss";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

interface Submission {
  _id: string;
  submissionId: string;
  type: "contact" | "franchise" | "enquiry";
  name: string;
  email: string;
  phone: string;
  message?: string;
  subject?: string;
  address?: string;
  location?: string;
  emailSent: boolean;
  retryCount: number;
  createdAt: string;
  sentAt?: string;
}

interface Course {
  _id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: string;
  price?: number;
  createdAt: string;
  updatedAt?: string;
}

export default function AdminDashboard() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard State
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [filterType, setFilterType] = useState<
    "all" | "contact" | "franchise" | "enquiry"
  >("all");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // Course State
  const [courses, setCourses] = useState<Course[]>([]);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [courseLoading, setCoureLoading] = useState(false);
  const [addCourseLoading, setAddCourseLoading] = useState(false);
  const [deleteCourseLoading, setDeleteCourseLoading] = useState<string | null>(
    null,
  );

  // View State (submissions or courses)
  const [currentView, setCurrentView] = useState<"submissions" | "courses">(
    "submissions",
  );

  // Check if already authenticated
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      fetchSubmissions();
      fetchCourses();
    }
  }, [token]);

  // Fetch courses when view changes
  useEffect(() => {
    if (currentView === "courses" && isAuthenticated) {
      fetchCourses();
    }
  }, [currentView, isAuthenticated]);

  // Handle Login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        loginForm,
      );

      const { token: newToken } = response.data;
      localStorage.setItem("adminToken", newToken);
      setToken(newToken);
      setIsAuthenticated(true);
      setLoginForm({ username: "", password: "" });
    } catch (err: any) {
      setLoginError(
        err.response?.data?.error || "Login failed. Please try again.",
      );
    } finally {
      setLoginLoading(false);
    }
  }

  // Handle Logout
  function handleLogout() {
    localStorage.removeItem("adminToken");
    setToken("");
    setIsAuthenticated(false);
    setSubmissions([]);
    setSelectedSubmission(null);
    setCourses([]);
    setCurrentView("submissions");
  }

  // Fetch Submissions
  async function fetchSubmissions() {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/admin/submissions`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setSubmissions(response.data.submissions || []);
    } catch (err: any) {
      console.error("Failed to fetch submissions:", err);
      if (err.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }

  // Delete Submission
  async function handleDelete(submissionId: string) {
    if (!window.confirm("Are you sure you want to delete this submission?"))
      return;

    setDeleteLoading(submissionId);
    try {
      await axios.delete(
        `${API_BASE_URL}/api/admin/submissions/${submissionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setSubmissions((prev) =>
        prev.filter((s) => s.submissionId !== submissionId),
      );
      if (selectedSubmission?.submissionId === submissionId) {
        setSelectedSubmission(null);
      }
    } catch (err: any) {
      console.error("Failed to delete submission:", err);
      alert("Failed to delete submission");
    } finally {
      setDeleteLoading(null);
    }
  }

  // Fetch Courses
  async function fetchCourses() {
    setCoureLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCourses(response.data.courses || []);
    } catch (err: any) {
      console.error("Failed to fetch courses, using dummy data:", err);
      // Use dummy data if API fails
      setCourses(
        dummyCourses.map((course, index) => ({
          ...(course as any),
          _id: `dummy-${index}`,
          createdAt: new Date().toISOString(),
        })),
      );
    } finally {
      setCoureLoading(false);
    }
  }

  // Add Course
  async function handleAddCourse(formData: any) {
    setAddCourseLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/admin/courses`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const newCourse = response.data.course;
      setCourses((prev) => [newCourse, ...prev]);
      setShowCourseForm(false);
      alert("Course added successfully!");
    } catch (err: any) {
      console.error("Failed to add course:", err);
      throw new Error(
        err.response?.data?.error || "Failed to add course. Please try again.",
      );
    } finally {
      setAddCourseLoading(false);
    }
  }

  // Delete Course
  async function handleDeleteCourse(courseId: string) {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    setDeleteCourseLoading(courseId);
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCourses((prev) => prev.filter((c) => c._id !== courseId));
      alert("Course deleted successfully!");
    } catch (err: any) {
      console.error("Failed to delete course:", err);
      alert("Failed to delete course");
    } finally {
      setDeleteCourseLoading(null);
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="admin-dashboard">
        <div className="admin-login-card">
          <h1 className="admin-login-title">Admin Login</h1>
          <p className="admin-login-sub">
            Enter your credentials to access the admin panel
          </p>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div>
              <label className="form-label">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
                required
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                required
                className="form-input"
              />
            </div>

            {loginError && <div className="form-error">{loginError}</div>}

            <Button
              type="submit"
              variant="primary"
              disabled={loginLoading}
              className="full-width"
            >
              {loginLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </main>
    );
  }

  const filteredSubmissions =
    filterType === "all"
      ? submissions
      : submissions.filter((s) => s.type === filterType);

  const contactCount = submissions.filter((s) => s.type === "contact").length;
  const franchiseCount = submissions.filter(
    (s) => s.type === "franchise",
  ).length;
  const enquiryCount = submissions.filter((s) => s.type === "enquiry").length;

  return (
    <main className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* View Switcher */}
      <div className="admin-view-switcher">
        <Button
          variant={currentView === "submissions" ? "primary" : "outline"}
          onClick={() => setCurrentView("submissions")}
        >
          📋 Submissions
        </Button>
        <Button
          variant={currentView === "courses" ? "primary" : "outline"}
          onClick={() => setCurrentView("courses")}
        >
          📚 Courses
        </Button>
      </div>

      {currentView === "submissions" ? (
        <>
          <p>Manage form submissions from Contact and Franchise pages.</p>

          <div className="admin-content-grid">
            {/* Sidebar */}
            <div className="admin-sidebar">
              <h3 style={{ marginTop: 0 }}>Filter by Type</h3>
              <div style={{ display: "grid", gap: 8 }}>
                <div
                  style={{
                    padding: "8px 12px",
                    background: filterType === "all" ? "#0b5ed7" : "#f5f5f5",
                    color: filterType === "all" ? "#fff" : "#000",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                  onClick={() => setFilterType("all")}
                >
                  All ({submissions.length})
                </div>
                <div
                  style={{
                    padding: "8px 12px",
                    background:
                      filterType === "contact" ? "#0b5ed7" : "#f5f5f5",
                    color: filterType === "contact" ? "#fff" : "#000",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                  onClick={() => setFilterType("contact")}
                >
                  Contact ({contactCount})
                </div>
                <div
                  style={{
                    padding: "8px 12px",
                    background:
                      filterType === "franchise" ? "#0b5ed7" : "#f5f5f5",
                    color: filterType === "franchise" ? "#fff" : "#000",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                  onClick={() => setFilterType("franchise")}
                >
                  Franchise ({franchiseCount})
                </div>
                <div
                  style={{
                    padding: "8px 12px",
                    background:
                      filterType === "enquiry" ? "#0b5ed7" : "#f5f5f5",
                    color: filterType === "enquiry" ? "#fff" : "#000",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                  onClick={() => setFilterType("enquiry")}
                >
                  Enquiry ({enquiryCount})
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="admin-main-content">
              {loading ? (
                <p>Loading submissions...</p>
              ) : filteredSubmissions.length === 0 ? (
                <p
                  style={{
                    background: "#fff",
                    padding: 20,
                    borderRadius: 8,
                    border: "1px solid #e0e0e0",
                  }}
                >
                  No submissions found.
                </p>
              ) : (
                <div className="submissions-columns">
                  {/* List */}
                  <div>
                    <h3>Submissions ({filteredSubmissions.length})</h3>
                    <div style={{ display: "grid", gap: 12 }}>
                      {filteredSubmissions.map((s) => (
                        <div
                          key={s._id}
                          onClick={() => setSelectedSubmission(s)}
                          style={{
                            padding: 12,
                            background:
                              selectedSubmission?._id === s._id
                                ? "#e7f1ff"
                                : "#fff",
                            border:
                              selectedSubmission?._id === s._id
                                ? "2px solid #0b5ed7"
                                : "1px solid #e0e0e0",
                            borderRadius: 6,
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          <div style={{ fontWeight: 600 }}>{s.name}</div>
                          <div style={{ fontSize: "0.85rem", color: "#666" }}>
                            {s.email}
                          </div>
                          <div
                            style={{
                              fontSize: "0.85rem",
                              color: "#999",
                              marginTop: 4,
                            }}
                          >
                            {s.phone}
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
                                  s.type === "contact"
                                    ? "#17a2b8"
                                    : s.type === "franchise"
                                      ? "#ffc107"
                                      : "#6c757d",
                                color: "#fff",
                                borderRadius: 3,
                              }}
                            >
                              {s.type}
                            </span>
                            {s.emailSent && (
                              <span
                                style={{
                                  fontSize: "0.75rem",
                                  padding: "2px 8px",
                                  background: "#28a745",
                                  color: "#fff",
                                  borderRadius: 3,
                                }}
                              >
                                Email Sent
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detail */}
                  {selectedSubmission && (
                    <div
                      style={{
                        background: "#fff",
                        padding: 20,
                        borderRadius: 8,
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <h3 style={{ marginTop: 0 }}>Submission Details</h3>
                      <div style={{ display: "grid", gap: 12 }}>
                        <div>
                          <strong>Type:</strong> {selectedSubmission.type}
                        </div>
                        <div>
                          <strong>Name:</strong> {selectedSubmission.name}
                        </div>
                        <div>
                          <strong>Email:</strong>
                          <a href={`mailto:${selectedSubmission.email}`}>
                            {selectedSubmission.email}
                          </a>
                        </div>
                        <div>
                          <strong>Phone:</strong>
                          <a href={`tel:${selectedSubmission.phone}`}>
                            {selectedSubmission.phone}
                          </a>
                        </div>

                        {selectedSubmission.subject && (
                          <div>
                            <strong>Subject:</strong>{" "}
                            {selectedSubmission.subject}
                          </div>
                        )}

                        {selectedSubmission.message && (
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
                              {selectedSubmission.message}
                            </p>
                          </div>
                        )}

                        {selectedSubmission.address && (
                          <div>
                            <strong>Address:</strong>{" "}
                            {selectedSubmission.address}
                          </div>
                        )}

                        {selectedSubmission.location && (
                          <div>
                            <strong>Location:</strong>{" "}
                            {selectedSubmission.location}
                          </div>
                        )}

                        <div>
                          <strong>Email Status:</strong>
                          <div
                            style={{
                              marginTop: 8,
                              padding: 8,
                              background: selectedSubmission.emailSent
                                ? "#d4edda"
                                : "#f8d7da",
                              color: selectedSubmission.emailSent
                                ? "#155724"
                                : "#721c24",
                              borderRadius: 6,
                              fontSize: "0.9rem",
                            }}
                          >
                            {selectedSubmission.emailSent
                              ? `✓ Email sent at ${new Date(selectedSubmission.sentAt || "").toLocaleString()}`
                              : `✗ Email not sent (Retries: ${selectedSubmission.retryCount})`}
                          </div>
                        </div>

                        <div>
                          <strong>Submitted:</strong> <br />
                          {new Date(
                            selectedSubmission.createdAt,
                          ).toLocaleString()}
                        </div>

                        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleDelete(selectedSubmission.submissionId)
                            }
                            disabled={deleteLoading === selectedSubmission._id}
                          >
                            {deleteLoading === selectedSubmission._id
                              ? "Deleting..."
                              : "Delete"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        // Courses view
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <h2 style={{ margin: 0 }}>Courses ({courses.length})</h2>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="outline" onClick={() => setShowCourseForm(true)}>
                + Add Course
              </Button>
              <Button variant="outline" onClick={() => fetchCourses()}>
                ⟳ Refresh
              </Button>
            </div>
          </div>

          {courseLoading ? (
            <p>Loading courses...</p>
          ) : courses.length === 0 ? (
            <p
              style={{
                background: "#fff",
                padding: 20,
                borderRadius: 8,
                border: "1px solid #e0e0e0",
              }}
            >
              No courses found.
            </p>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {courses.map((c) => (
                <div
                  key={c._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 12,
                    background: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: 8,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700 }}>{c.title}</div>
                    <div style={{ fontSize: "0.9rem", color: "#666" }}>
                      {c.description}
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: "0.85rem",
                        color: "#333",
                      }}
                    >
                      {c.duration} • {c.level} {c.price ? `• ₹${c.price}` : ""}
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", gap: 8, alignItems: "center" }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(c.image, "_blank")}
                    >
                      View Image
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigator.clipboard?.writeText(c.slug)}
                    >
                      Copy Slug
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCourse(c._id)}
                      disabled={deleteCourseLoading === c._id}
                    >
                      {deleteCourseLoading === c._id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <CourseModal
            isOpen={showCourseForm}
            onClose={() => setShowCourseForm(false)}
            onSubmit={handleAddCourse}
            isLoading={addCourseLoading}
          />
        </>
      )}
    </main>
  );
}
