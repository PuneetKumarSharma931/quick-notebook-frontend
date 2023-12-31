import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (type, message)=>{

    setAlert({
      type,
      message
    });

    setTimeout(()=>{
      setAlert(null);
    }, 1700);
  }

  return (
    <>
    <NoteState showAlert={showAlert}>
      <Router>
        <Navbar />
        <div style={{height: '40px'}}>
        <Alert alert={alert} />
        </div>
        <div className="container my-2">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />}/>
          <Route exact path="/login" element={<Login showAlert={showAlert} />}/>
          <Route exact path="/signup" element={<Signup showAlert={showAlert} />}/>
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
