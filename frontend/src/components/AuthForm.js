import React, { useState } from 'react';
import './AuthForm.css'; // We'll create this file for styles
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
    const [isActive, setIsActive] = useState(false);
    const handleLogin = () => setIsActive(false);
    const handleRegister = () => setIsActive(true);

    const [signUpUsername, setSignUpUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');

    const [signInUsername, setSignInUsername] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    const navigate = useNavigate();

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        const regDetails = {
            username: signUpUsername,
            name,
            email,
            password: signUpPassword 
        };
        fetch('http://localhost:3001/customers/reg',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(regDetails)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                toast.success(data.message);
                console.log("Registration successful");
            } else if (data.error) {
                toast.error(data.error)
            }
        })
        .catch((error) => {
            toast.error("An error occured during registration");
            console.error("Registration error:", error);
        });
    };
        
    const handleSignInSubmit = (e) => {
        e.preventDefault();
        const regDetails = {
            username: signInUsername,
            password: signInPassword 
        };
        fetch('http://localhost:3001/customers/login',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(regDetails)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                toast.success(data.message);
                console.log("Login successful");

                 // Store login state and username in localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', signInUsername);

                // Navigate to home page
                navigate('/');
            } else if (data.error) {
                toast.error(data.error)
            }
        })
        .catch((error) => {
            toast.error("An error occured during login");
            console.error("Login error:", error);
        });
    };

    return (
        <div className="sign-in-page">
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="style.css" />
            <title>Login Page</title>
            <div className={`container ${isActive ? 'active' : ''}`} id="container">
                <div className="form-container sign-up">
                    <form onSubmit={handleSignUpSubmit}>
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Username" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)}/>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)}/>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>

                <div className="form-container sign-in">
                    <form onSubmit={handleSignInSubmit}>
                        <h1>Sign In</h1>
                        <input type="username" placeholder="Username" value={signInUsername} onChange={(e) => setSignInUsername(e.target.value)}/>
                        <input type="password" placeholder="Password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)}/>
                        <a href="#">Forget Your Password?</a>
                        <button type="submit">Sign In</button>
                    </form>
                </div>

                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back Traveller!</h1>
                            <p>Sign in to access your points and exclusive deals.</p>
                            <button className="hidden" onClick={handleLogin}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Welcome!</h1>
                            <p>Unlock a world of exclusive travel benefits and experiences.</p>
                            <button className="hidden" onClick={handleRegister}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
