import { useParams, Link } from "react-router-dom";
import { courses } from "../data/courses";
import Button from "../components/Button";

export default function CourseDetail() {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <main>
        <h1>Course not found</h1>
        <p>The course you're looking for doesn't exist.</p>
        <Link to="/courses">
          <Button>Back to Courses</Button>
        </Link>
      </main>
    );
  }

  return (
    <main>
      <Link to="/courses" style={{ marginBottom: 20, display: "inline-block" }}>
        ← Back to Courses
      </Link>

      <h1>{course.title}</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 40,
          marginTop: 24,
        }}
      >
        <div>
          <img
            src={course.image}
            alt={course.title}
            style={{
              width: "100%",
              height: 300,
              objectFit: "cover",
              borderRadius: 8,
              marginBottom: 24,
            }}
          />
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            {course.description}
          </p>

          <section style={{ marginTop: 32 }}>
            <h3>Course Overview</h3>
            <ul style={{ lineHeight: 2 }}>
              <li>
                <strong>Duration:</strong> {course.duration}
              </li>
              <li>
                <strong>Level:</strong> {course.level}
              </li>
              <li>Comprehensive curriculum with hands-on projects</li>
              <li>Assessments and milestone evaluations</li>
              <li>Industry-recognized certification</li>
              <li>Placement support and career guidance</li>
            </ul>
          </section>

          <section style={{ marginTop: 32 }}>
            <h3>What You'll Learn</h3>
            <ul>
              <li>Foundational and advanced concepts</li>
              <li>Real-world case studies and projects</li>
              <li>Best practices and industry standards</li>
              <li>Tools and technologies in use today</li>
            </ul>
          </section>
        </div>

        <div
          style={{
            background: "#fff",
            padding: 24,
            borderRadius: 8,
            border: "1px solid #e0e0e0",
            height: "fit-content",
          }}
        >
          <div
            style={{
              background: "#e7f1ff",
              padding: 16,
              borderRadius: 6,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#0b5ed7",
                marginBottom: 8,
              }}
            >
              {course.duration}
            </div>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#666" }}>
              Course Duration
            </p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <strong style={{ display: "block", marginBottom: 4 }}>Level</strong>
            <div
              style={{
                background: "#f5f5f5",
                padding: "8px 12px",
                borderRadius: 6,
                display: "inline-block",
              }}
            >
              {course.level}
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            style={{ width: "100%", marginTop: 20 }}
          >
            Enroll Now
          </Button>

          <Link to="/contact">
            <Button
              variant="outline"
              size="lg"
              style={{ width: "100%", marginTop: 12 }}
            >
              Ask Question
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
