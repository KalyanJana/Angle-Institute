export default function About() {
  return (
    <main>
      <h1>About Lalani Academy</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          alignItems: "center",
          marginTop: 32,
        }}
      >
        <div>
          <h2>Our Story</h2>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
            Established in 1998, Lalani Computer Academy is a premier training
            institute in Kolkata, India. Over 23+ years, we have become a
            trusted name in IT, networking, multimedia, and professional skills
            training, attracting thousands of students seeking career
            advancement.
          </p>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
            We are proud members of the Lalani Group and have maintained our
            commitment to delivering world-class education and industry-relevant
            skills.
          </p>
        </div>
        <img
          src="/images/unnamed.png"
          alt="About us"
          style={{ borderRadius: 8, width: "100%", objectFit: "contain" }}
        />
      </div>

      <section
        style={{
          marginTop: 48,
          background: "#e7f1ff",
          padding: "40px 24px",
          borderRadius: 8,
        }}
      >
        <h2 style={{ marginTop: 0 }}>Our Mission & Values</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 24,
          }}
        >
          <div>
            <h4 style={{ color: "#0b5ed7" }}>🎯 Mission</h4>
            <p>
              To empower individuals with cutting-edge skills and certifications
              for career growth in IT and professional domains.
            </p>
          </div>
          <div>
            <h4 style={{ color: "#0b5ed7" }}>⭐ Excellence</h4>
            <p>
              We maintain the highest standards in curriculum design,
              instruction quality, and student outcomes.
            </p>
          </div>
          <div>
            <h4 style={{ color: "#0b5ed7" }}>🤝 Community</h4>
            <p>
              We foster a supportive learning environment where every student
              can thrive and succeed.
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 48 }}>
        <h2>Why Students Choose Us</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 24,
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
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>👨‍🏫</div>
            <h4>Expert Faculty</h4>
            <p>
              Industry professionals with extensive experience and credentials
            </p>
          </div>
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 8,
              border: "1px solid #e0e0e0",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>📚</div>
            <h4>Updated Curriculum</h4>
            <p>Regularly updated courses aligned with latest industry trends</p>
          </div>
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 8,
              border: "1px solid #e0e0e0",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>📜</div>
            <h4>Certifications</h4>
            <p>
              Industry-recognized certifications that boost career prospects
            </p>
          </div>
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 8,
              border: "1px solid #e0e0e0",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>💼</div>
            <h4>Placement Support</h4>
            <p>Career guidance and placement assistance for graduates</p>
          </div>
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 8,
              border: "1px solid #e0e0e0",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>🌍</div>
            <h4>Flexible Learning</h4>
            <p>Online, offline, and hybrid learning options available</p>
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
            <h4>Track Record</h4>
            <p>23+ years of excellence with thousands of successful students</p>
          </div>
        </div>
      </section>
    </main>
  );
}
