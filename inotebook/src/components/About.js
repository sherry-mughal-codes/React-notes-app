function About() {
  return (
    <div className="main-wrapper">
      {/* Hero */}
      <div className="about-hero">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <h1 className="display-5 fw-bold mb-3">
              <i className="fa-solid fa-cloud-arrow-up me-2"></i> About iNotebook
            </h1>
            <p className="lead opacity-90 mb-0" style={{ fontSize: "1.15rem", lineHeight: "1.7" }}>
              iNotebook is a secure, modern cloud-based note-taking application designed to help you organize thoughts, project ideas, daily tasks, and study material seamlessly.
            </p>
          </div>
          <div className="col-lg-4 text-center mt-4 mt-lg-0">
            <i className="fa-solid fa-book-open-reader" style={{ fontSize: "5rem", opacity: 0.85 }}></i>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <h2 className="section-title mb-4">
        <i className="fa-solid fa-wand-magic-sparkles"></i> Key Capabilities
      </h2>

      <div className="row g-4 mb-5">
        <div className="col-md-6 col-lg-4">
          <div className="about-feature-card">
            <div className="feature-icon-box">
              <i className="fa-solid fa-pen-nib"></i>
            </div>
            <h4 className="fw-bold mb-2">Create & Categorize</h4>
            <p className="text-muted mb-0">
              Quickly draft notes with title, formatted descriptions, and dynamic category tags (Work, Ideas, Study, General).
            </p>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="about-feature-card">
            <div className="feature-icon-box">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <h4 className="fw-bold mb-2">Instant Search & Filter</h4>
            <p className="text-muted mb-0">
              Filter by category pills or search in real time across titles, descriptions, and tags with zero delay.
            </p>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="about-feature-card">
            <div className="feature-icon-box">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h4 className="fw-bold mb-2">Secure Cloud Sync</h4>
            <p className="text-muted mb-0">
              Your notes are safeguarded with token authentication, MongoDB cloud database persistence, and local backup storage.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack Info */}
      <div className="custom-card p-4">
        <h3 className="fw-bold mb-3">
          <i className="fa-solid fa-layer-group text-primary me-2"></i> Technology Stack
        </h3>
        <div className="row g-3">
          <div className="col-sm-6 col-md-3">
            <div className="border rounded p-3 bg-light text-center">
              <i className="fa-brands fa-react text-info fs-2 mb-2"></i>
              <h6 className="fw-bold mb-1">React 19</h6>
              <small className="text-muted">Components & Hooks</small>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="border rounded p-3 bg-light text-center">
              <i className="fa-brands fa-node-js text-success fs-2 mb-2"></i>
              <h6 className="fw-bold mb-1">Node & Express 5</h6>
              <small className="text-muted">REST API Backend</small>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="border rounded p-3 bg-light text-center">
              <i className="fa-solid fa-database text-warning fs-2 mb-2"></i>
              <h6 className="fw-bold mb-1">MongoDB</h6>
              <small className="text-muted">Mongoose Schema Storage</small>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="border rounded p-3 bg-light text-center">
              <i className="fa-brands fa-bootstrap text-primary fs-2 mb-2"></i>
              <h6 className="fw-bold mb-1">Bootstrap 5 + CSS</h6>
              <small className="text-muted">Modern UI & Typography</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
