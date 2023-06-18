import Header from "../../components/Header";
import React, {useState} from "react";
import {Navigate} from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [navigateToHome, setNavigateToHome] = useState(false);

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const loginAction = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        try {
            const response = await fetch("http://localhost/Negar.Ighani_FinalProject.Backend/login", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType.includes("application/json")) {

                    const responseText = await response.text();
                    const data = JSON.parse(responseText);
                    if (data.error) {
                        setUsername('');
                        setPassword('');
                        alert("Invalid username or password");
                    } else {
                        localStorage.setItem('user_id', data.id);
                        localStorage.setItem('role', data.role);
                        setNavigateToHome(true); // Set the flag to navigate to home
                    }
                }

            } else {
                throw new Error("Request failed");
            }
        } catch
            (error) {
            console.log(error);
        }
    };

    if (navigateToHome) {
        return <Navigate to="/home"/>; // Redirect to home page
    }
    return (
        <div className="body">
            <Header title="Login"/>
            <form>
                <h4 style={{color: 'black', paddingRight: 275}}>Welcome Back! </h4>
                <label htmlFor="uname">Username: </label>
                <br/>
                <input type="text" className="input-form" name="uname" placeholder="  Username" required
                       onChange={handleChangeUsername} value={username}/>
                <br/>
                <br/>
                <label htmlFor="pass">Password: </label>
                <br/>
                <input className="input-form" type="password" name="pass" placeholder="  Password" required
                       onChange={handleChangePassword} value={password}/>
                <br/>
                <br/>
                <button className="button_form" name="login-user" onClick={loginAction}>
                    Login
                </button>
                <p style={{color: 'black',}}>Dont have an account? <a href="./SignUp/"> Sign Up</a></p>
                <p style={{color: 'black',}}></p>
            </form>
        </div>);
}
export default Login;