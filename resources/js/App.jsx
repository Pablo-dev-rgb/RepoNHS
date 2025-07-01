import React from "react";
import '../css/app.css';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
//public
import LayoutPublic from "./layouts/LayoutPublic";
import Home from "./pagePublic/Home";
import Login from "./pagePublic/Login";
import AccesoDenegado from "./pagePublic/AccesoDenegado";
import Footer from "./components/Footer";
//protected
import ProtectedRoutes from "./pageAuth/ProtectedRoutes";
//admin
import LayoutAdmin from "./layouts/LayoutAdmin";
import PanelAdmin from "./pageAdmin/PanelAdmin";
import Register from "./pageAdmin/UserRegister";
import UserAll from "./pageAdmin/UserAll";
import UserUpdate from "./pageAdmin/UserUpdate";
import ServiceAll from "./pageAdmin/ServiceAll";
import ServiceUpdate from "./pageAdmin/ServiceUpdate";
import ServiceStrore from "./pageAdmin/ServiceStore";
//chief
import LayoutChief from "./layouts/LayoutCheif";
import PanelChief from "./pageChief/PanelChief";
import NoticeAll from "./pageChief/NoticeAll";
import NoticeCreate from "./pageChief/NoticeCreate";
import NoticeEdit from "./pageChief/NoticeEdit";
import TaskAll from "./pageChief/TaskAll";
import TaskCreate from "./pageChief/TaskCreate";
import TaskEdit from "./pageChief/TaskEdit";
//servicemanager
import LayoutServiceManager from "./layouts/LayoutServiceManager";
import PanelServiceManager from "./pageServiceManager/PanelServiceManager";
import TaskAllSM from "./pageServiceManager/TaskAll";





const App = () => {

    return(
        <BrowserRouter>
            <div className="App-Container">
                <div className="main-content-wrapper">
            <Routes>
                <Route path="/" element={<LayoutPublic />} >
                    <Route path="/login" element={<Login />} />
                    <Route index element={<Home />} />
                    <Route path="/denegado" element={<AccesoDenegado />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/admin" element={<LayoutAdmin />} >
                        <Route index element={<Home />} />
                        <Route path="register" element={<Register />} />
                        <Route path="user" element={<UserAll />} />
                        <Route path="user/edit/:id" element={<UserUpdate/>} />
                        <Route path="service" element={<ServiceAll/>} />
                        <Route path="service/edit/:id" element={<ServiceUpdate/>} />
                        <Route path="service/create" element={<ServiceStrore/>} />
                    </Route>
                     <Route path="/chief" element={<LayoutChief />} >
                        <Route index element={<Home />} />
                        <Route path="notice" element={<NoticeAll />} />
                        <Route path="notice/create" element={<NoticeCreate />} />
                        <Route path="notice/edit/:id" element={<NoticeEdit />} />
                        <Route path="task" element={<TaskAll />} />
                        <Route path="task/create" element={<TaskCreate />} />
                        <Route path="task/edit/:id" element={<TaskEdit />} />
                    </Route>
                     <Route path="/servicemanager" element={<LayoutServiceManager />} >
                        <Route index element={<Home />} />
                        <Route path="/servicemanager/task" element={<TaskAllSM />} />
                    </Route>
                </Route>
            </Routes>
            </div>
            <Footer />
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