import React from "react";
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pagePublic/Login";
import ProtectedRoutes from "./pageAuth/ProtectedRoutes";
import Home from "./pageAuth/Home";

const App = () => {

    return(
        <BrowserRouter>
            <div className="App-Container">
                <div className="main-content-wrapper">
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes>
            </div>
            </div>
        </BrowserRouter>
    )
}

export default App

if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
        <App/>
    )
}