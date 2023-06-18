import Header from "../../components/Header";
import React, {useState} from "react";
import {Navigate} from "react-router-dom";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [navigateToHome, setNavigateToHome] = useState(false);

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value);
    };
    const handleChangeLastName = (e) => {
        setLastName(e.target.value);
    };

    const signUpAction = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        try {
            const response = await fetch("http://localhost/Negar.Ighani_FinalProject.Backend/sign_up", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                    const responseText = await response.text();
                    const data = JSON.parse(responseText);
                        localStorage.setItem('user_id', data.id);
                        localStorage.setItem('role', data.role);
                        setNavigateToHome(true); // Set the flag to navigate to home
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
        <Header title="SignUp"/>
        <form>
            <h4 style={{color: 'black', paddingRight: 275}}>Create Account</h4>
            <label htmlFor="fname">First Name: </label>
            <input type="text" className="input-form" name="fname" placeholder="   First Name" required onChange={handleChangeFirstName}/>
            <label htmlFor="lname">Last Name: </label>
            <input type="text" className="input-form" name="lname" placeholder="   Last Name" required onChange={handleChangeLastName}/>
            <label htmlFor="uname">UserName: </label>
            <input type="text" className="input-form" name="uname" placeholder="   UserName" required onChange={handleChangeUsername}/>
            <label htmlFor="pass">Password: </label>
            <input type="text" className="input-form" name="pass" type="password" placeholder="   Password" required onChange={handleChangePassword}/>
            <button className="button_form" onClick={signUpAction}>
                Sign Up
            </button>
        </form>
        </div>);
}
export default SignUp;