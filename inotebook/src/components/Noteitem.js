import { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

function Noteitem(props) {
  const { note, updateNote } = props;
  const { deleteNote, showAlert } = useContext(NoteContext);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `${note.title}\n\n${note.description}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showAlert("Note copied to clipboard!", "info");
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    } catch {
      return "";
    }
  };

  return (
    <div className="col-md-6 col-12">
      <div className="note-item-card">
        <div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="note-tag-badge">
              <i className="fa-solid fa-tag"></i> {note.tag || "General"}
            </span>
            <div className="note-date">
              <i className="fa-regular fa-clock"></i> {formatDate(note.date)}
            </div>
          </div>

          <h5 className="note-title">{note.title}</h5>
          <p className="note-description">{note.description}</p>
        </div>

        <div className="d-flex justify-content-between align-items-center pt-3 border-top">
          <small className="text-muted">
            <i className="fa-solid fa-cloud-check text-success me-1"></i> Saved
          </small>

          <div className="note-actions">
            <button
              className="action-btn action-btn-copy"
              title="Copy Note"
              onClick={handleCopy}
            >
              <i className={copied ? "fa-solid fa-check text-success" : "fa-regular fa-copy"}></i>
            </button>

            <button
              className="action-btn action-btn-edit"
              title="Edit Note"
              onClick={() => updateNote(note)}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>

            <button
              className="action-btn action-btn-delete"
              title="Delete Note"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this note?")) {
                  deleteNote(note._id);
                }
              }}
            >
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
