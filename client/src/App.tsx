import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Roles from './components/pages/Roles';

function App() {
  return (
    <Router>
        <Fragment>
            <Navbar />
            {/*Create route for Home*/}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/roles" element={<Roles />} />
            </Routes>
        </Fragment>
      </Router>
  );
}

export default App;
