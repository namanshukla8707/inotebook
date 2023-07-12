/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://127.0.0.1:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  // Get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYTc2YWRjMmU0MGRhZDliMDBlOWZjIn0sImlhdCI6MTY4ODkyNjk4M30.tv-i9PT3Qcj8JIibUvc2iOiAuiJbvsL0pRlH_hoglj4",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  // ADD a note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYTc2YWRjMmU0MGRhZDliMDBlOWZjIn0sImlhdCI6MTY4ODkyNjk4M30.tv-i9PT3Qcj8JIibUvc2iOiAuiJbvsL0pRlH_hoglj4",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = {
      _id: "64ad38eec3773ec187f81723",
      user: "64aa76adc2e40dad9b00e9fc",
      title: title,
      description: description,
      tag: tag,
      date: "2023-07-11T11:11:42.164Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  // Delete a note
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYTc2YWRjMmU0MGRhZDliMDBlOWZjIn0sImlhdCI6MTY4ODkyNjk4M30.tv-i9PT3Qcj8JIibUvc2iOiAuiJbvsL0pRlH_hoglj4",
      },
    });
    const json = await response.json();
    console.log(json);
    console.log("Deleting the note using id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // Edit a note
  const editnote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYTc2YWRjMmU0MGRhZDliMDBlOWZjIn0sImlhdCI6MTY4ODkyNjk4M30.tv-i9PT3Qcj8JIibUvc2iOiAuiJbvsL0pRlH_hoglj4",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
      }
      break;
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addnote, deletenote, editnote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
