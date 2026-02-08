import "./OurCenter.css";

const centers = [
  {
    id: 1,
    name: "Angle Institute - Central",
    address: "123 Main Road, City Center",
    features: ["Classroom Coaching", "Doubt Clearing", "Placement Support"],
  },
  {
    id: 2,
    name: "Angle Institute - West",
    address: "45 West Avenue, Westside",
    features: ["Weekend Batches", "Mock Tests"],
  },
  {
    id: 3,
    name: "Angle Institute - East",
    address: "78 East Street, East End",
    features: ["Online + Offline", "Personal Mentors"],
  },
];

export default function OurCenter() {
  return (
    <div className="our-center-page">
      <div className="oc-hero">
        <h1>Our Centers</h1>
        <p>
          Find your nearest Angle Institute center providing quality coaching.
        </p>
      </div>

      <div className="oc-grid">
        {centers.map((c) => (
          <div className="oc-card" key={c.id}>
            <div className="oc-card-header">
              <h3>{c.name}</h3>
              <p className="oc-address">{c.address}</p>
            </div>
            <ul className="oc-features">
              {c.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <div className="oc-actions">
              <a href="/contact" className="oc-cta">
                Enquire
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
