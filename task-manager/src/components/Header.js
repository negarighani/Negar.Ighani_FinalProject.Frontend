import './style.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {Navigate} from "react-router-dom";
import React, {useState} from "react";

const Header = (props) => {
    const title = props.title ? `Task Management >  ${props.title}` : 'Task Management';
    const showIcon = props.title !== "Login" && props.title !== "SignUp";
    const [navigateToLogin, setNavigateToLogin] = useState(false);

    function signOutAction() {
        localStorage.removeItem('user_id');
        localStorage.removeItem('role');
        setNavigateToLogin(true);
    }
    if (navigateToLogin) {
        return <Navigate to="/"/>;
    }
    return (
        <div className="header">
            {title}
            {showIcon && (
                <a className='sign-out-link' onClick={signOutAction}>
                    <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className='sign-out-icon'
                    />
                </a>
            )}
        </div>
    );
};

export default Header;