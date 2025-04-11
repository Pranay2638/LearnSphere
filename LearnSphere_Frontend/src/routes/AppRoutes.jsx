import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Dashboard from "../Pages/Dashboard";
//import { Home } from "lucide-react";
import Home from "../Pages/Home.jsx";
import Notes from "../Pages/Notes.jsx";
import Videos from "../Pages/Videos.jsx";
import Discussions from "../Pages/Discussion.jsx";
import Resources from "../Pages/Resources.jsx";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path = "/" element = {<Home />} />
                <Route path = "/login" element = {<Login />} />
                <Route path = "/signup" element = {<Signup />} />
                <Route path = "/dashboard" element = {<Dashboard />} />
                <Route path = "/notes" element = {<Notes />} />
                <Route path = "/videos" element = {<Videos />} />
                <Route path = "/discussions" element = {<Discussions />} />
                <Route path = "/resources" element = {<Resources />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;