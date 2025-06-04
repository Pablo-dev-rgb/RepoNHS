import React from "react";
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Router, Routes } from "react-router-dom";
import LayoutPublic from "./layout/LayoutPublic";

const App = () => {

    return(
        <Router>
            <div className="App-Container">
                <div className="main-content-wrapper">
            <Routes>
                <Route path="/" element={<LayoutPublic/>}>
                </Route>
            </Routes>
            </div>
            </div>
        </Router>
    )
}

export default App

if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
        <App/>
    )
}