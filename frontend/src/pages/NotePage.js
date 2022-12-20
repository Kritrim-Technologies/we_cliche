import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { BsArrowUpLeftSquareFill } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineDoneOutline } from "react-icons/md";

const NotePage = () => {
  let noteId = useParams().id;
  let navigate = useNavigate();

  let [note, setNote] = useState(null);

  useEffect(() => {
    async function getNote() {
      if (noteId === "new") return;
      let response = await fetch(`/api/notes/${noteId}`);
      let data = await response.json();
      setNote(data);
    }
    getNote()
  }, [noteId]);

  let createNote = async () => {
    fetch(`/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let updateNote = async () => {
    fetch(`/api/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let deleteNote = async () => {
    fetch(`/api/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  };

  let handleSubmit = () => {
    //console.log('NOTE:', note)
    if (noteId !== "new" && note.body === "") {
      deleteNote();
    } else if (noteId !== "new") {
      //console.log(note.body)
      updateNote();
    } else if (noteId === "new" && note.body !== null) {
      createNote();
    }
    navigate("/");
  };

  let handleChange = (value) => {
    setNote((note) => ({ ...note, body: value }));
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <BsArrowUpLeftSquareFill onClick={handleSubmit} />
        </h3>
        {noteId !== "new" ? (
          <RiDeleteBinLine onClick={deleteNote} />
        ) : (
          <MdOutlineDoneOutline onClick={handleSubmit} />
        )}
      </div>
      <textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
