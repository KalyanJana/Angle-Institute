import { Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import { courses } from "../data/courses";
import "./Home.scss";

export default function Home() {
  const featuredCourses = courses.slice(0, 4);

  return (
    <main>
      <div className="hero">
        <div className="hero-content">
          <img src="/images/col-3.jpg" alt="banner" className="hero-image" />
          <div className="hero-text">
            <h1>Welcome to Angle Institute</h1>
            <p>
              Leading training institute for IT, networking, multimedia and
              professional development. We've been empowering students since
              1998 with world-class training and certifications.
            </p>
            <Link to="/courses">
              <Button variant="primary" size="lg">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <section style={{ marginTop: 32, marginBottom: 32 }}>
        <h2>Featured Courses</h2>
        <p style={{ fontSize: "1rem", color: "#666" }}>
          Choose from our wide range of professional and skill development
          courses
        </p>
        <div className="courses-grid">
          {featuredCourses.map((course) => (
            <Link
              key={course.slug}
              to={`/courses/${course.slug}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                image={course.image}
                title={course.title}
                description={course.description}
              >
                <div
                  style={{ marginTop: 12, fontSize: "0.85rem", color: "#999" }}
                >
                  <span style={{ marginRight: 12 }}>⏱️ {course.duration}</span>
                  <span>📚 {course.level}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-features">
        <h2>Why Choose Angle Institute?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">🎓</div>
            <h4>Expert Instructors</h4>
            <p>Industry professionals with years of experience</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📜</div>
            <h4>Certification</h4>
            <p>Recognized courses with industry-backed certifications</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💼</div>
            <h4>Placement Support</h4>
            <p>Career guidance and placement assistance</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🌍</div>
            <h4>Flexible Learning</h4>
            <p>Online and offline modes available</p>
          </div>
        </div>
      </section>
    </main>
  );
}
