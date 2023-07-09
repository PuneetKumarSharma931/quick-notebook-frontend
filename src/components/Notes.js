import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/NoteContext";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const { Notes, getAllNotes, updateNote, getUser } = useContext(NoteContext);

  const [state, setState] = useState({ _id: "", title: "", description: "", tag: "" });
  const navigate = useNavigate();

  useEffect(() => {

    if(localStorage.getItem('auth-token')) {
      getUser();
      getAllNotes();
    }
    else {
      navigate('/login');
    }

    // eslint-disable-next-line
    
  }, []);

  const handleOnChange = (e)=>{

    setState({...state, [e.target.name]: e.target.value});
  }

  const ref = useRef(null);
  const refClose = useRef(null);

  const editNote = (note) => {
    ref.current.click();
    setState(note);
  };

  const handleEditClick = ()=>{

    refClose.current.click();
    updateNote(state);
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      ></button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    aria-describedby="emailHelp"
                    name="title"
                    placeholder="Input title here"
                    onChange={handleOnChange}
                    value={state.title}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="description"
                    rows={10}
                    placeholder="Input description here"
                    onChange={handleOnChange}
                    value={state.description}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    aria-describedby="emailHelp"
                    name="tag"
                    placeholder="Input tag here"
                    onChange={handleOnChange}
                    value={state.tag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleEditClick} disabled={state.title.length<3 || state.description.length<5}>
                Edit Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        {Notes.length===0 && <h4 className="text-center my-2">No Notes to Display</h4>}
        {Notes.map((Note) => {
          return <Noteitem Note={Note} key={Note._id} editNote={editNote} />;
        })}
      </div>
    </>
  );
};

export default Notes;
