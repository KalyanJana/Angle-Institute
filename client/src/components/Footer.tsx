import { Link } from "react-router-dom";
import "./Footer.scss";

export default function Footer() {
  const contactPhone = import.meta.env.VITE_CONTACT_PHONE;
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;
  const contactAddress = import.meta.env.VITE_CONTACT_ADDRESS;

  return (
    <footer>
      <div className="footer-content">
        <div>
          <h4>About Us</h4>
          <p>
            Angle Institute, established as a premier training institute for IT,
            design, for IT, networking, and skills development.
          </p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
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
          <h4>Contact Info</h4>
          <p>📞 {contactPhone}</p>
          <p>📧 {contactEmail}</p>
          <p>📍 {contactAddress}</p>
        </div>
      </div>
      <div className="footer-copyright">
        © {new Date().getFullYear()} Angle Institute. All rights reserved.
      </div>
    </footer>
  );
}
