import React from "react";
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
//public
import LayoutPublic from "./layouts/LayoutPublic";
import Home from "./pagePublic/Home";
import Login from "./pagePublic/Login";
//protected
import ProtectedRoutes from "./pageAuth/ProtectedRoutes";
//admin
import LayoutAdmin from "./layouts/LayoutAdmin";
import PanelAdmin from "./pageAdmin/PanelAdmin";
//chief
import LayoutChief from "./layouts/LayoutCheif";
//servicemanager
import LayoutServiceManager from "./layouts/LayoutServiceManager";


const App = () => {

    return(
        <BrowserRouter>
            <div className="App-Container">
                <div className="main-content-wrapper">
            <Routes>
                <Route path="/" element={<LayoutPublic />} >
                    <Route path="/login" element={<Login />} />
                    <Route index element={<Home />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/admin" element={<LayoutAdmin />} >
                        <Route index element={<PanelAdmin />} />
                    </Route>
                     <Route path="/chief" element={<LayoutChief />} >
                        <Route index element={<Home />} />
                    </Route>
                     <Route path="/servicemanager" element={<LayoutServiceManager />} >
                        <Route index element={<Home />} />
                    </Route>
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