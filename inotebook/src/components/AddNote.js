import { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

function AddNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "General" });
  const [error, setError] = useState("");

  const suggestedTags = ["General", "Work", "Personal", "Ideas", "Study"];

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleTagClick = (tag) => {
    setNote({ ...note, tag });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.title.trim().length < 3) {
      setError("Title must be at least 3 characters long.");
      return;
    }
    if (note.description.trim().length < 5) {
      setError("Description must be at least 5 characters long.");
      return;
    }

    addNote(note.title.trim(), note.description.trim(), note.tag.trim());
    setNote({ title: "", description: "", tag: "General" });
    setError("");
  };

  return (
    <div className="add-note-card">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="section-title mb-0">
          <i className="fa-solid fa-feather-pointed"></i> Create a New Note
        </h2>
        <span className="badge bg-light text-secondary border px-3 py-2">
          <i className="fa-solid fa-cloud-arrow-up me-1"></i> Auto-Save Enabled
        </span>
      </div>

      {error && (
        <div className="alert alert-danger py-2 px-3 mb-3 d-flex align-items-center" role="alert">
          <i className="fa-solid fa-circle-exclamation me-2"></i>
          <div>{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-8 mb-3">
            <label htmlFor="title" className="form-label-custom">
              Note Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-custom"
              id="title"
              name="title"
              value={note.title}
              onChange={handleChange}
              placeholder="e.g., Weekly Plan or React Architecture"
              required
              minLength={3}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="tag" className="form-label-custom">
              Tag / Category
            </label>
            <input
              type="text"
              className="form-control form-control-custom"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={handleChange}
              placeholder="General, Work, etc."
            />
          </div>
        </div>

        {/* Quick Tag Pills */}
        <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
          <small className="text-muted fw-semibold me-1">Quick Tags:</small>
          {suggestedTags.map((t) => (
            <button
              key={t}
              type="button"
              className={`btn btn-sm ${note.tag === t ? "btn-primary" : "btn-outline-secondary"} rounded-pill px-3`}
              style={{ fontSize: "0.85rem" }}
              onClick={() => handleTagClick(t)}
            >
              #{t}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="form-label-custom">
            Note Description <span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control form-control-custom"
            id="description"
            name="description"
            rows="4"
            value={note.description}
            onChange={handleChange}
            placeholder="Write your detailed note here..."
            required
            minLength={5}
          ></textarea>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            <i className="fa-solid fa-lock me-1"></i> End-to-end encrypted notes
          </small>
          <button
            type="submit"
            className="btn-primary-custom"
            disabled={note.title.trim().length < 3 || note.description.trim().length < 5}
          >
            <i className="fa-solid fa-plus"></i> Add Note
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNote;
