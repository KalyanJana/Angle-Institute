import "./About.scss";

export default function About() {
  return (
    <main className="about-page">
      <h1 className="about-title">About Angle Institute</h1>

      <div className="about-story-section">
        <div className="about-story-content">
          <h2>Our Story</h2>
          <p>
            Established in 1998, Angle Computer Academy is a premier training
            institute in Mediniput, Wb, India. Over 23+ years, we have become a
            trusted name in IT, networking, multimedia, and professional skills
            training, attracting thousands of students seeking career
            advancement.
          </p>
          <p>
            We are proud members of the Angle Institute and have maintained our
            commitment to delivering world-class education and industry-relevant
            skills.
          </p>
        </div>
        <img
          src="https://res.cloudinary.com/diwn8dfxk/image/upload/v1770719855/welcome_qurxck.webp"
          alt="About us"
          className="about-story-image"
        />
      </div>

      <section className="about-mission-section">
        <h2>Our Mission & Values</h2>
        <div className="mission-grid">
          <div>
            <h4>🎯 Mission</h4>
            <p>
              To empower individuals with cutting-edge skills and certifications
              for career growth in IT and professional domains.
            </p>
          </div>
          <div>
            <h4>⭐ Excellence</h4>
            <p>
              We maintain the highest standards in curriculum design,
              instruction quality, and student outcomes.
            </p>
          </div>
          <div>
            <h4>🤝 Community</h4>
            <p>
              We foster a supportive learning environment where every student
              can thrive and succeed.
            </p>
          </div>
        </div>
      </section>

      <section className="about-benefits-section">
        <h2>Why Students Choose Us</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <span className="benefit-icon">👨‍🏫</span>
            <h4>Expert Faculty</h4>
            <p>
              Industry professionals with extensive experience and credentials
            </p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">📚</span>
            <h4>Updated Curriculum</h4>
            <p>Regularly updated courses aligned with latest industry trends</p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">📜</span>
            <h4>Certifications</h4>
            <p>
              Industry-recognized certifications that boost career prospects
            </p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">💼</span>
            <h4>Placement Support</h4>
            <p>Career guidance and placement assistance for graduates</p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">🌍</span>
            <h4>Flexible Learning</h4>
            <p>Online, offline, and hybrid learning options available</p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">🏆</span>
            <h4>Track Record</h4>
            <p>23+ years of excellence with thousands of successful students</p>
          </div>
        </div>
      </section>
    </main>
  );
}
