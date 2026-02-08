export default function Placement() {
  return (
    <main>
      <h1>Placement & Career Support</h1>
      <p style={{ fontSize: "1.05rem", color: "#666" }}>
        We are committed to helping our students achieve their career goals
        through comprehensive placement support and industry connections.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          marginTop: 40,
        }}
      >
        <section>
          <h2>Placement Services</h2>
          <ul style={{ lineHeight: 2, fontSize: "1.05rem" }}>
            <li>✓ Career counseling and guidance</li>
            <li>✓ Resume building workshops</li>
            <li>✓ Interview preparation coaching</li>
            <li>✓ Job placement assistance</li>
            <li>✓ Industry partnerships</li>
            <li>✓ Alumni networking events</li>
            <li>✓ Skill development programs</li>
            <li>✓ Internship opportunities</li>
          </ul>
        </section>

        <section
          style={{ background: "#e7f1ff", padding: 24, borderRadius: 8 }}
        >
          <h2 style={{ marginTop: 0 }}>Placement Stats</h2>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "#0b5ed7",
                }}
              >
                85%
              </div>
              <p>Placement Rate</p>
            </div>
            <div>
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "#0b5ed7",
                }}
              >
                50+
              </div>
              <p>Industry Partners</p>
            </div>
            <div>
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "#0b5ed7",
                }}
              >
                1000+
              </div>
              <p>Placed Students</p>
            </div>
          </div>
        </section>
      </div>

      <section
        style={{
          marginTop: 48,
          background: "#fff",
          padding: 32,
          borderRadius: 8,
          border: "1px solid #e0e0e0",
        }}
      >
        <h2>Our Recruitment Partners</h2>
        <p>We collaborate with leading organizations across various sectors:</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 16,
            marginTop: 24,
          }}
        >
          <div
            style={{
              padding: 16,
              background: "#f5f5f5",
              borderRadius: 6,
              textAlign: "center",
            }}
          >
            IT Services
          </div>
          <div
            style={{
              padding: 16,
              background: "#f5f5f5",
              borderRadius: 6,
              textAlign: "center",
            }}
          >
            Finance
          </div>
          <div
            style={{
              padding: 16,
              background: "#f5f5f5",
              borderRadius: 6,
              textAlign: "center",
            }}
          >
            Healthcare
          </div>
          <div
            style={{
              padding: 16,
              background: "#f5f5f5",
              borderRadius: 6,
              textAlign: "center",
            }}
          >
            Manufacturing
          </div>
          <div
            style={{
              padding: 16,
              background: "#f5f5f5",
              borderRadius: 6,
              textAlign: "center",
            }}
          >
            E-commerce
          </div>
          <div
            style={{
              padding: 16,
              background: "#f5f5f5",
              borderRadius: 6,
              textAlign: "center",
            }}
          >
            Consulting
          </div>
        </div>
      </section>
    </main>
  );
}
