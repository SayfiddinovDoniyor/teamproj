import React, { useState } from 'react';
import './NoteTaker.css';

function NoteTaker() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [noteHeader, setNoteHeader] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);

  function handleNewNote() {
    setShowForm(true);
    setNoteHeader('');
    setNoteBody('');
  }

  function handleSaveNote() {
    if (noteHeader.trim()) {
      setNotes([...notes, { header: noteHeader, body: noteBody }]);
      setShowForm(false);
    }
  }

  function handleOpenNote(note) {
    setSelectedNote(note);
  }

  function handleClosePopup() {
    setSelectedNote(null);
  }

  function handleDeleteNote(index) {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    setSelectedNote(null);
  }

  return (
    <div className="note-taker">
      <h1>Note Taker</h1>
      <button onClick={handleNewNote}>New Note</button>
      
      {showForm && (
        <div className="note-form">
          <input
            type="text"
            placeholder="Note Title"
            value={noteHeader}
            onChange={(e) => setNoteHeader(e.target.value)}
          />
          <textarea
            placeholder="Note Body"
            value={noteBody}
            onChange={(e) => setNoteBody(e.target.value)}
          ></textarea>
          <button onClick={handleSaveNote}>Save</button>
        </div>
      )}
      
      <div className="notes-list">
        {notes.map((note, index) => (
          <div key={index} className="note-item">
            <span onClick={() => handleOpenNote(note)}>{note.header}</span>
            <span className="delete-button" onClick={() => handleDeleteNote(index)}>🗑</span>
          </div>
        ))}
      </div>

      {selectedNote && (
        <div className="note-popup">
          <div className="popup-content">
            <h2>{selectedNote.header}</h2>
            <p>{selectedNote.body}</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteTaker;
