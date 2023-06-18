import Home from "../pages/Home";
import Edit from "../pages/Edit";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import path from "./path";

const routes = [
    {
        component: <Home />,
        path: path.home
    },
    {
        component: <Edit />,
        path: path.edit
    },
    {
        component: <Login />,
        path: path.login
    },
    {
        component: <SignUp />,
        path: path.signUp
    }
]
export default routes;
