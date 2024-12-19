import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Home from "./components/Home";
import Login from "./components/Login";
import Annonce from "./components/Annonce";
//import EditAnnonce from "./components/EditAnnonce";

const App = () => {
  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/annonce" element={<Annonce />} />
        </Routes>
      </Wrapper>
    </Router>
  );
};

export default App;
