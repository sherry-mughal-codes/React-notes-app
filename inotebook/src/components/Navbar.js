import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";

function Navbar() {
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useContext(NoteContext);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top">
      <div className="container-fluid px-lg-4">
        {/* Brand */}
        <Link className="navbar-brand navbar-brand-custom" to="/">
          <span className="navbar-brand-icon">
            <i className="fa-solid fa-book-bookmark"></i>
          </span>
          <span>iNotebook</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav items & search */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-1">
            <li className="nav-item">
              <Link
                className={`nav-link nav-link-custom ${location.pathname === "/" ? "active" : ""}`}
                aria-current="page"
                to="/"
              >
                <i className="fa-solid fa-house me-1"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link nav-link-custom ${location.pathname === "/about" ? "active" : ""}`}
                to="/about"
              >
                <i className="fa-solid fa-circle-info me-1"></i> About
              </Link>
            </li>
          </ul>

          {/* Search Bar (Active on Home) */}
          <form className="d-flex align-items-center gap-2" onSubmit={handleSearch}>
            <div className="position-relative">
              <input
                className="form-control navbar-search-input pe-4"
                type="search"
                placeholder="Search notes..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-white p-0 me-2"
                  style={{ textDecoration: "none", fontSize: "0.85rem" }}
                  onClick={() => setSearchQuery("")}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>

            <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 px-3 py-2 rounded-pill d-none d-md-inline-flex align-items-center gap-1">
              <span className="p-1 bg-success rounded-circle"></span> Online
            </span>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
