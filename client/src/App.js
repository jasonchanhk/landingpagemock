import './App.css';
import React from "react";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Register from "./components/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  
  return (
    <div className="App">
        <BrowserRouter>
            <Routes> 
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
 