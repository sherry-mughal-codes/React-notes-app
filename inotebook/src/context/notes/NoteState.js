import NoteContext from "./noteContext";
import { useState, useEffect, useCallback } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  
  const initialNotes = [
    {
      _id: "demo-note-1",
      title: "Welcome to iNotebook! 🚀",
      description: "This is your personal secure cloud notebook. You can create, edit, search, and delete your notes seamlessly.",
      tag: "General",
      date: new Date().toISOString()
    },
    {
      _id: "demo-note-2",
      title: "React 19 & Express Architecture",
      description: "Frontend built with React 19, Context API, and modern responsive design. Backend powered by Express 5 & MongoDB database.",
      tag: "Tech",
      date: new Date(Date.now() - 3600000).toISOString()
    },
    {
      _id: "demo-note-3",
      title: "Meeting Notes: Project Review",
      description: "1. Review sprint deliverables\n2. Prepare design system improvements\n3. Optimize user notes management workflow.",
      tag: "Work",
      date: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  // Load from localStorage or use initial notes
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("inotebook_notes");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialNotes;
      }
    }
    return initialNotes;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = "success") => {
    setAlert({ msg: message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("inotebook_notes", JSON.stringify(notes));
  }, [notes]);

  // Fetch all notes from backend if auth-token exists
  const getNotes = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        }
      });
      if (response.ok) {
        const json = await response.json();
        if (Array.isArray(json)) {
          setNotes(json);
        }
      }
    } catch (err) {
      console.log("Using local notes storage:", err.message);
    }
  }, [host]);

  // Add a Note
  const addNote = async (title, description, tag) => {
    const noteTag = tag && tag.trim() !== "" ? tag.trim() : "General";
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
          },
          body: JSON.stringify({ title, description, tag: noteTag })
        });
        if (response.ok) {
          const note = await response.json();
          setNotes((prevNotes) => [note, ...prevNotes]);
          showAlert("Note added successfully to cloud!", "success");
          return true;
        }
      } catch (err) {
        console.error("Backend error adding note, saving locally:", err);
      }
    }

    // Local fallback/instant state update
    const newNote = {
      _id: "note-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9),
      title,
      description,
      tag: noteTag,
      date: new Date().toISOString()
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    showAlert("Note added successfully!", "success");
    return true;
  };

  // Delete a Note
  const deleteNote = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
          }
        });
      } catch (err) {
        console.error("Error deleting note from backend:", err);
      }
    }

    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    showAlert("Note deleted successfully!", "info");
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    const noteTag = tag && tag.trim() !== "" ? tag.trim() : "General";
    const token = localStorage.getItem("token");

    if (token) {
      try {
        await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
          },
          body: JSON.stringify({ title, description, tag: noteTag })
        });
      } catch (err) {
        console.error("Error editing note on backend:", err);
      }
    }

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === id
          ? { ...note, title, description, tag: noteTag, date: new Date().toISOString() }
          : note
      )
    );
    showAlert("Note updated successfully!", "success");
    return true;
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        searchQuery,
        setSearchQuery,
        activeTag,
        setActiveTag,
        alert,
        showAlert
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
