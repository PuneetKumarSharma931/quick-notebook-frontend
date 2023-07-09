import React, { useContext }from "react";
import NoteContext from "../context/NoteContext";

const Noteitem = (props) => {
  const { title, description, _id , tag } = props.Note;
  const { editNote } = props;

  const { deleteNote } = useContext(NoteContext);

  return (
    <div className="card col-md-3 my-3 mx-5">
      <div className="card-body">
        <div className="d-flex">
          <h5 className="card-title">{title}</h5>
            <i className="fas fa-trash mx-3" onClick={()=>{deleteNote(_id)}}></i>
            <i className="fas fa-pen mx-3" onClick={()=>{editNote({_id, title, description, tag})}}></i>
        </div>
        <p className="card-text">{description}</p>
        <p className="card-text">{tag}</p>
      </div>
    </div>
  );
};

export default Noteitem;
