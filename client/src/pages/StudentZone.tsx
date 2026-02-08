import Button from "../components/Button";

export default function StudentZone() {
  return (
    <main>
      <h1>Student Zone</h1>
      <p style={{ fontSize: "1.05rem", color: "#666" }}>
        Access resources, connect with fellow students, and maximize your
        learning experience.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
          marginTop: 40,
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: 24,
            borderRadius: 8,
            border: "1px solid #e0e0e0",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: 12 }}>📚</div>
          <h3 style={{ marginTop: 0 }}>Course Materials</h3>
          <p>
            Access downloadable course notes, assignments, and study materials.
          </p>
          <Button variant="secondary">Access Now</Button>
        </div>

        <div
          style={{
            background: "#fff",
            padding: 24,
            borderRadius: 8,
            border: "1px solid #e0e0e0",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: 12 }}>💬</div>
          <h3 style={{ marginTop: 0 }}>Discussion Forum</h3>
          <p>Connect with peers, ask questions, and collaborate on projects.</p>
          <Button variant="secondary">Join Forum</Button>
        </div>

        <div
          style={{
            background: "#fff",
            padding: 24,
            borderRadius: 8,
            border: "1px solid #e0e0e0",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: 12 }}>🎓</div>
          <h3 style={{ marginTop: 0 }}>Assignments</h3>
          <p>View and submit your coursework, track grades and feedback.</p>
          <Button variant="secondary">Check Assignments</Button>
        </div>

        <div
          style={{
            background: "#fff",
            padding: 24,
            borderRadius: 8,
            border: "1px solid #e0e0e0",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: 12 }}>🏆</div>
          <h3 style={{ marginTop: 0 }}>Certifications</h3>
          <p>Track your progress and download completed certificates.</p>
          <Button variant="secondary">View Certs</Button>
        </div>

        <div
          style={{
            background: "#fff",
            padding: 24,
            borderRadius: 8,
            border: "1px solid #e0e0e0",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: 12 }}>👥</div>
          <h3 style={{ marginTop: 0 }}>Mentorship</h3>
          <p>Get guidance from experienced mentors in your field.</p>
          <Button variant="secondary">Find Mentor</Button>
        </div>

        <div
          style={{
            background: "#fff",
            padding: 24,
            borderRadius: 8,
            border: "1px solid #e0e0e0",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: 12 }}>📝</div>
          <h3 style={{ marginTop: 0 }}>Study Groups</h3>
          <p>Form or join study groups with other students.</p>
          <Button variant="secondary">Browse Groups</Button>
        </div>
      </div>

      <section
        style={{
          marginTop: 48,
          background: "#e7f1ff",
          padding: 32,
          borderRadius: 8,
        }}
      >
        <h2 style={{ marginTop: 0 }}>Quick Links</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          <div>
            <h4>Academic Calendar</h4>
            <p>Important dates and deadlines for your course</p>
          </div>
          <div>
            <h4>Fee Payment</h4>
            <p>View fees and make online payments</p>
          </div>
          <div>
            <h4>IT Support</h4>
            <p>Technical assistance for course platform</p>
          </div>
          <div>
            <h4>Contact Coordinator</h4>
            <p>Reach out to your course coordinator</p>
          </div>
        </div>
      </section>
    </main>
  );
}
