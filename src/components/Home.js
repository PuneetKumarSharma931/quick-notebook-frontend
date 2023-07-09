import React from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";

const Home = () => {
  return (
    <div>
      <AddNote />
      <div className="container my-3">
        <h2 className="text-center">Your Notes</h2>
        <Notes />
      </div>
    </div>
  );
};

export default Home;
