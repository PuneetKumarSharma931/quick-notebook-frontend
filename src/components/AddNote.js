import React, { useContext, useState } from "react";
import NoteContext from "../context/NoteContext";

const AddNote = () => {

    const { addNote } = useContext(NoteContext);

    const [state, setState] = useState({title: "", description: "", tag: ""});

    const handleOnChange = (e)=>{

        setState({...state, [e.target.name]: e.target.value});
    }

    const handleOnClick = (e)=>{

        e.preventDefault();

        addNote(state);
        setState({title: "", description: "", tag: ""});
    }

  return (
    <div>
      <div className="container my-3">
        <h2 className="text-center">Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              name="title"
              placeholder="Input title here"
              onChange={handleOnChange}
              value={state.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              rows={10}
              placeholder="Input description here"
              onChange={handleOnChange}
              value={state.description}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              aria-describedby="emailHelp"
              name="tag"
              placeholder="Input tag here"
              onChange={handleOnChange}
              value={state.tag}
            />
          </div>
          <button disabled={state.title.length<3 || state.description.length<5} type="submit" className="btn btn-primary" onClick={handleOnClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
