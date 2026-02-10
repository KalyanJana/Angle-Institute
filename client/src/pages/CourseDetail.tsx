import { useParams, Link } from "react-router-dom";
import { courses } from "../data/courses";
import Button from "../components/Button";
import "./CourseDetail.scss";

export default function CourseDetail() {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <main>
        <div className="course-not-found">
          <h1>Course not found</h1>
          <p>The course you're looking for doesn't exist.</p>
          <Link to="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="course-detail">
      <Link to="/courses" className="course-back-link">
        ← Back to Courses
      </Link>

      <h1 className="course-title">{course.title}</h1>

      <div className="course-content">
        <div className="course-main">
          <img src={course.image} alt={course.title} className="course-image" />
          <p className="course-description">{course.description}</p>

          <section className="course-section">
            <h3>Course Overview</h3>
            <ul>
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

          <section className="course-section">
            <h3>What You'll Learn</h3>
            <ul>
              <li>Foundational and advanced concepts</li>
              <li>Real-world case studies and projects</li>
              <li>Best practices and industry standards</li>
              <li>Tools and technologies in use today</li>
            </ul>
          </section>
        </div>

        <div className="course-sidebar">
          <div className="course-duration-card">
            <div className="course-duration-value">{course.duration}</div>
            <p className="course-duration-label">Course Duration</p>
          </div>

          <div className="course-level-section">
            <strong>Level</strong>
            <div className="course-level-badge">{course.level}</div>
          </div>

          <div className="course-buttons">
            <Link to="/contact">
              <Button variant="primary" size="lg">
                Enroll Now
              </Button>
            </Link>

            <Link to="/contact">
              <Button variant="outline" size="lg">
                Ask Question
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
