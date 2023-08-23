import React, { useContext, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Layout from '../../Components/Layout'
import ErrorMessage from '../../Components/ErrorMessage/';
import {signInWithEmailPassword} from '../../Utils/firebase';
import  './Login.css';



const Login = () => {
  const navigate = useNavigate();

  const form = useRef(null);
  const [showErrorMessage, setShowErrorMessage] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    const userdata = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    if (!userdata.email || !userdata.password) {
      setShowErrorMessage("Por favor, completa todos los campos.");
      return;
    } 
    handleSignIn(userdata.email, userdata.password);
  }

      
  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?!\d)/;
      if (!emailRegex.test(value)) {
        e.target.setCustomValidity("Ingresa un correo electrónico válido.");
      } else {
        e.target.setCustomValidity("");
      }
    }
  };

  
  const handleSignIn = async (email,password ) => {
    try {
      // Llama a la función para iniciar sesión
      await signInWithEmailPassword(email, password);
      navigate('/');
    } catch (error) {
      setShowErrorMessage(error.message.match(/\(([^)]+)\)/)[1]);
      console.error("Error al iniciar sesión:", error.message);
 
    }
  };



  return (
    <Layout>
          <div className="Login">
      <div className="Login-container">
        <img  alt="logo" className="logo" />
        {showErrorMessage && <ErrorMessage message={showErrorMessage} />}
        <form action="/" className="form" ref={form} onSubmit={handleSubmit}>
          <label htmlFor="email" className="label">
            Email address
          </label>
          <input
            type="text"
            name="email"
            placeholder="jose@example.cm"
            className="input input-email"
            onChange={handleInput}
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="*********"
            className="input input-password"
          />

           <button type="submit" className="primary-button login-button">
            Login
          </button>

          <a href="/password-recovery">Forgot my password</a>
        </form>
        <button
          className="secondary-button signup-button"
          onClick={() => (window.location = "/signup")}
        >
          Sign up
        </button>
      </div>
    </div>
    </Layout>
  );
};

export default Login;