import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.scss";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-container">
        <div className="site-logo">
          <img
            src="https://res.cloudinary.com/diwn8dfxk/image/upload/v1770721018/logo-student_df8jow.svg"
            alt="Angle Institute logo"
          />
          {/* <div style={{ fontWeight: 700 }}>Angle Institute</div> */}
        </div>

        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="#222"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12h18M3 6h18M3 18h18"
                stroke="#222"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        <nav
          className={`site-nav ${open ? "mobile-open" : ""}`}
          onClick={() => setOpen(false)}
        >
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {/* <Link to="/our-center">Our Centers</Link> */}
          <Link to="/admin/dashboard">Admin</Link>
          {/* <Link to="/admin/register">Admin Register</Link> */}
        </nav>
      </div>
    </header>
  );
}
