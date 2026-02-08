import { Link } from "react-router-dom";
import "./TopBanner.css";

export default function TopBanner() {
  const contactPhone = import.meta.env.VITE_CONTACT_PHONE || "+91-9088012311";
  const contactEmail =
    import.meta.env.VITE_CONTACT_EMAIL || "ho@lalaniacademy.in";

  return (
    <div className="top-banner">
      <div className="banner-container">
        {/* Left Side - Contact Info */}
        <div className="banner-left">
          <div className="banner-section">
            <span className="banner-icon">📞</span>
            <div className="banner-text">
              <a href={`tel:${contactPhone}`} className="banner-link">
                {contactPhone}
              </a>
            </div>
          </div>
          <div className="banner-divider"></div>
          <div className="banner-section">
            <span className="banner-icon">✉️</span>
            <div className="banner-text">
              <a href={`mailto:${contactEmail}`} className="banner-link">
                {contactEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Navigation Links */}
        <div className="banner-right">
          <Link to="/student-zone" className="banner-nav-link">
            Student Zone
          </Link>
          <Link to="/placement" className="banner-nav-link">
            Placement
          </Link>
          <Link to="/franchise" className="banner-nav-link">
            Franchise
          </Link>
          <Link to="/our-center" className="banner-nav-link">
            Our Centers
          </Link>
          <Link to="/contact" className="banner-nav-link">
            Support
          </Link>
        </div>
      </div>
    </div>
  );
}
