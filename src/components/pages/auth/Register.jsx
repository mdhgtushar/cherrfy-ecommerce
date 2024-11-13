import React from 'react'
import { Link } from 'react-router-dom';

const Register = () => {

  return (  
    <>
    <h1>Register</h1>
    <form action="">
      <span>Email or phone </span>
      <input type="text" />
      <br />
      <br />
      <span>password </span>
      <input type="password" />
      <br />
      <br />
      <input type="button" value="Login" />
    </form>
    <p>
      Already user? <Link to="/">Login Now</Link>
    </p>
  </> 
  );
}

export default Register