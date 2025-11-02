// src/components/FbLoginButton.jsx
import React from 'react';

const FbLoginButton = () => {
  const handleLogin = () => {
    // redirect browser to backend auth endpoint
    window.location.href = 'http://localhost:8080/api/auth/facebook';
  };

  return (
    <button onClick={handleLogin} className="btn">
      Login with Facebook
    </button>
  );
};

export default FbLoginButton;
