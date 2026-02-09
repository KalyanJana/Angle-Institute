// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import Card from "../components/Card";
import { courses as dummyCourses } from "../data/courses";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export default function Courses() {
  // const [coursesList, setCoursesList] = useState<typeof dummyCourses>(dummyCourses);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   async function fetchCourses() {
  //     setLoading(true);
  //     try {
  //       const res = await axios.get(`${API_BASE_URL}/api/courses`);
  //       if (
  //         res.data &&
  //         Array.isArray(res.data.courses) &&
  //         res.data.courses.length > 0
  //       ) {
  //         // Normalize: server returns objects with slug/title/description/image/duration/level
  //         setCoursesList(
  //           res.data.courses.map((c: any) => ({
  //             slug: c.slug,
  //             title: c.title,
  //             description: c.description,
  //             image: c.image,
  //             duration: c.duration,
  //             level: c.level,
  //           })),
  //         );
  //         return;
  //       }
  //     } catch (err) {
  //       // fall through to use dummy data
  //       console.warn("Courses API failed, using dummy data", err);
  //     } finally {
  //       setLoading(false);
  //     }

  //     // fallback
  //     setCoursesList(dummyCourses);
  //   }

  //   fetchCourses();
  // }, []);

  return (
    <main>
      <h1>All Courses</h1>
      <p style={{ fontSize: "1rem", color: "#666", marginBottom: 24 }}>
        Explore {dummyCourses.length}+ professional courses in IT, design,
        business, and more
      </p>

      {/* {loading ? (
        <p>Loading courses...</p>
      ) : ( */}
      <div className="courses-grid">
        {dummyCourses.map((c) => (
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
      {/* )} */}
    </main>
  );
}
