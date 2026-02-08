import { Link } from "react-router-dom";
import Card from "../components/Card";
import { courses } from "../data/courses";

export default function Courses() {
  return (
    <main>
      <h1>All Courses</h1>
      <p style={{ fontSize: "1rem", color: "#666", marginBottom: 24 }}>
        Explore {courses.length}+ professional courses in IT, design, business,
        and more
      </p>
      <div className="courses-grid">
        {courses.map((c) => (
          <Link
            to={`/courses/${c.slug}`}
            key={c.slug}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card image={c.image} title={c.title} description={c.description}>
              <div
                style={{ marginTop: 12, fontSize: "0.85rem", color: "#999" }}
              >
                <div style={{ marginRight: 12 }}>⏱️ {c.duration}</div>
                <div>📚 {c.level}</div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
