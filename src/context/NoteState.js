import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props)=>{

    const host = "http://localhost:2000";

      const [Notes, setNotes] = useState([]);
      const [user, setUser] = useState({name: "", email: ""});

      //Fetch User Details from the database

      const getUser = async ()=>{

        const response = await fetch(`${host}/api/auth/getuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
          }
        });

        const responseData = await response.json();
        setUser({name: responseData.userData.name, email: responseData.userData.email});

      }

      //Fetch all Notes From the database

      const getAllNotes = async ()=>{

        const response = await fetch(`${host}/api/notes/getallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token') 
          }
        });

        const fetchedNotes = await response.json();

        setNotes(fetchedNotes);
      }

      // Add a New Note

      const addNote = async ({ title, description, tag })=>{

        let bodyData;

        if(tag.length===0)
          bodyData = JSON.stringify({
            title,
            description
          });

          if(tag.length>0)
            bodyData = JSON.stringify({
              title,
              description,
              tag
            });

        const response = await fetch(`${host}/api/notes/createnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
          },
          body: bodyData
        });

        const newNote = await response.json();
        setNotes(Notes.concat(newNote));
        props.showAlert('success', 'New Note Successfully Added!');
      } 

      // Delete a Note

      const deleteNote = async (id)=>{

        const newNotes = Notes.filter((note)=>{return note._id!==id});

        setNotes(newNotes);

        await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
          }
        });

        props.showAlert('success', 'Note Successfully Deleted!');
      }

      //Update a Note

      const updateNote = async ({ _id, title, description, tag })=>{


        await fetch(`${host}/api/notes/updatenote/${_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
          },
          body: JSON.stringify({
            title,
            description,
            tag
          })
        });

        const newNotes = JSON.parse(JSON.stringify(Notes));

        let index;

        newNotes.forEach((note, ind)=>{

          if(note._id===_id) {
            index = ind;
          }
        });

        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        setNotes(newNotes);

        props.showAlert('success', 'Note Successfully Updated!');
      }

    return (

        <NoteContext.Provider value={{Notes, user, addNote, deleteNote, getAllNotes, updateNote, getUser}}>
            {props.children};
        </NoteContext.Provider>
    )
  }

export default NoteState;