import { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

function Notes() {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote, searchQuery, setSearchQuery, activeTag, setActiveTag } = context;

  const [currentNote, setCurrentNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  const updateNote = (note) => {
    setCurrentNote({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
      etag: note.tag || "General"
    });
    ref.current.click();
  };

  const handleEditChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  };

  const handleUpdateClick = () => {
    editNote(currentNote.id, currentNote.etitle, currentNote.edescription, currentNote.etag);
    refClose.current.click();
  };

  // Get unique tags for filter tabs
  const allTags = ["All", ...Array.from(new Set(notes.map((n) => n.tag || "General")))];

  // Filter notes based on active tag and search query
  const filteredNotes = notes.filter((note) => {
    const matchesTag = activeTag === "All" || (note.tag || "General").toLowerCase() === activeTag.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      (note.title && note.title.toLowerCase().includes(query)) ||
      (note.description && note.description.toLowerCase().includes(query)) ||
      (note.tag && note.tag.toLowerCase().includes(query));
    return matchesTag && matchesSearch;
  });

  return (
    <>
      {/* Hidden button for opening Bootstrap modal */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editNoteModal"
      >
        Launch edit modal
      </button>

      {/* Edit Note Modal */}
      <div
        className="modal fade"
        id="editNoteModal"
        tabIndex="-1"
        aria-labelledby="editNoteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "20px" }}>
            <div className="modal-header border-bottom p-4" style={{ background: "#f8fafc" }}>
              <h4 className="modal-title fw-bold" id="editNoteModalLabel">
                <i className="fa-solid fa-pen-to-square text-primary me-2"></i> Edit Note
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label-custom">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    id="etitle"
                    name="etitle"
                    value={currentNote.etitle}
                    onChange={handleEditChange}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label-custom">
                    Tag / Category
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    id="etag"
                    name="etag"
                    value={currentNote.etag}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label-custom">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control form-control-custom"
                    id="edescription"
                    name="edescription"
                    rows="5"
                    value={currentNote.edescription}
                    onChange={handleEditChange}
                    minLength={5}
                    required
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer border-top p-3 px-4 bg-light">
              <button
                ref={refClose}
                type="button"
                className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary px-4 py-2 rounded-pill fw-bold"
                onClick={handleUpdateClick}
                disabled={
                  currentNote.etitle.trim().length < 3 || currentNote.edescription.trim().length < 5
                }
              >
                <i className="fa-solid fa-floppy-disk me-2"></i> Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modern 2-Column Responsive Dashboard Layout */}
      <div className="row g-4">
        {/* Left Column: Add Note Card */}
        <div className="col-lg-5 col-xl-4">
          <div className="sticky-add-note">
            <AddNote />
          </div>
        </div>

        {/* Right Column: Notes Explorer */}
        <div className="col-lg-7 col-xl-8">
          {/* Search & Category Header */}
          <div className="card p-3 p-md-4 mb-4 border-0 shadow-sm" style={{ borderRadius: "18px" }}>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
              <div>
                <h2 className="section-title mb-1">
                  <i className="fa-solid fa-notes-medical"></i> Your Saved Notes
                </h2>
                <span className="badge bg-primary-subtle text-primary border px-3 py-2 fs-6 rounded-pill">
                  {notes.length} Total Notes
                </span>
              </div>

              {/* In-page Quick Search */}
              <div className="input-group" style={{ maxWidth: "340px" }}>
                <span className="input-group-text bg-light border-end-0">
                  <i className="fa-solid fa-magnifying-glass text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Quick search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setSearchQuery("")}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="d-flex align-items-center gap-2 flex-wrap pt-2 border-top">
              <span className="text-muted fw-bold me-1">Categories:</span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`btn btn-sm tag-filter-btn ${
                    activeTag.toLowerCase() === tag.toLowerCase()
                      ? "btn-dark text-white fw-bold shadow-sm"
                      : "btn-light text-secondary border"
                  } rounded-pill`}
                  onClick={() => setActiveTag(tag)}
                >
                  {tag === "All" ? "🏷️ All Notes" : `#${tag}`}
                </button>
              ))}
            </div>
          </div>

          {/* Notes Grid or Empty State */}
          <div className="row g-4">
            {filteredNotes.length === 0 ? (
              <div className="col-12">
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <i className="fa-regular fa-folder-open"></i>
                  </div>
                  <h3 className="empty-state-title">
                    {searchQuery || activeTag !== "All"
                      ? "No matching notes found"
                      : "No notes created yet"}
                  </h3>
                  <p className="empty-state-text">
                    {searchQuery || activeTag !== "All"
                      ? "Try clearing your search query or selecting a different category filter."
                      : "Fill out the form on the left to create your first note."}
                  </p>
                </div>
              </div>
            ) : (
              filteredNotes.map((note) => (
                <Noteitem key={note._id} updateNote={updateNote} note={note} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;
