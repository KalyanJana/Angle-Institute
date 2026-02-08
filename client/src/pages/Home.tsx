import { Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import { courses } from "../data/courses";

export default function Home() {
  const featuredCourses = courses.slice(0, 4);

  return (
    <main>
      <div className="hero">
        <div
          style={{
            display: "flex",
            gap: 40,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <img
            src="/images/col-3.jpg"
            alt="banner"
            style={{
              height: 200,
              borderRadius: 8,
              objectFit: "cover",
              flex: "0 1 300px",
            }}
          />
          <div style={{ flex: 1, minWidth: 300 }}>
            <h1>Welcome to Lalani Academy</h1>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
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

      <section style={{ marginTop: 48, marginBottom: 48 }}>
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

      <section
        style={{
          background: "#e7f1ff",
          padding: "40px 24px",
          borderRadius: 8,
          textAlign: "center",
          marginBottom: 48,
        }}
      >
        <h2>Why Choose Lalani Academy?</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 24,
            marginTop: 24,
          }}
        >
          <div>
            <div style={{ fontSize: "2rem", marginBottom: 8 }}>🎓</div>
            <h4>Expert Instructors</h4>
            <p>Industry professionals with years of experience</p>
          </div>
          <div>
            <div style={{ fontSize: "2rem", marginBottom: 8 }}>📜</div>
            <h4>Certification</h4>
            <p>Recognized courses with industry-backed certifications</p>
          </div>
          <div>
            <div style={{ fontSize: "2rem", marginBottom: 8 }}>💼</div>
            <h4>Placement Support</h4>
            <p>Career guidance and placement assistance</p>
          </div>
          <div>
            <div style={{ fontSize: "2rem", marginBottom: 8 }}>🌍</div>
            <h4>Flexible Learning</h4>
            <p>Online and offline modes available</p>
          </div>
        </div>
      </section>
    </main>
  );
}
