import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 40,
        }}
      >
        <div>
          <h4 style={{ marginTop: 0 }}>About Us</h4>
          <p>
            Angle Institute, established as a premier training institute for IT,
            design, for IT, networking, and skills development.
          </p>
        </div>
        <div>
          <h4 style={{ marginTop: 0 }}>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginTop: 0 }}>Contact Info</h4>
          <p>📞 +91-9088012311</p>
          <p>📧 ho@lalaniacademy.in</p>
          <p>📍 Kolkata, India</p>
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.2)",
          paddingTop: 20,
          marginTop: 30,
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} Angle Institute. All rights reserved.
      </div>
    </footer>
  );
}
