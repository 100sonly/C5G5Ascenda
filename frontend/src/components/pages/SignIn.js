import React, { useEffect } from 'react';
import './SignIn.css';
import AuthForm from "../AuthForm";

export default function SignIn() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="auth-form-container">
      <AuthForm className="auth-form" />
    </div>
  );
}
