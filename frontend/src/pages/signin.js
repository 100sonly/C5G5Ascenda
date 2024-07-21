import React, { useState } from 'react';
import '../components/signin.css'; // We'll create this file for styles


function SignIn(){
    const [isActive, setIsActive] = useState(false);
    const handleLogin = () => setIsActive(false);
    const handleRegister = () => setIsActive(true);
  
  return (
    <>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
    <link rel="stylesheet" href="style.css" />
    <title> Login Page</title>
    <div className={`container ${isActive ? 'active': ''}`} id="container">


        <div className="form-container sign-up">
            <form>
                <h1>Create Account</h1>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="button">Sign Up</button>
            </form>
        </div>

        <div className="form-container sign-in">
            <form>
                <h1>Sign In</h1>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <a href="#">Forget Your Password?</a>
                <button type="button">Sign In</button>
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
            <button className="hidden" onClick={handleRegister}>Sign UP</button>
            </div>
        </div>
        </div>
    </div>
    </>
    );
}

export default SignIn;

