import React, { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Layout from '../../Components/Layout'
import ErrorMessage from '../../Components/ErrorMessage/';
import { signInWithEmailPassword } from '../../Utils/firebase';
import { UserContext } from "../../Context/userContext";
import './Login.css';

const Login = () => {
  const contextIsUserAuth = useContext(UserContext);
  const navigate = useNavigate(); // Hook para la navegación

  const form = useRef(null);
  const [showErrorMessage, setShowErrorMessage] = useState("");

  // Función para manejar el cambio en el campo de email
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

  // Función para manejar el inicio de sesión
  const handleSignIn = async (email, password) => {
    try {
      // Llama a la función para iniciar sesión
      await signInWithEmailPassword(email, password);
      contextIsUserAuth.setUser(true); // Actualiza el estado de autenticación
      navigate('/'); // Redirige al usuario a la página de inicio
    } catch (error) {
      setShowErrorMessage(error.message.match(/\(([^)]+)\)/)[1]);
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
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

    handleSignIn(userdata.email, userdata.password); // Iniciar el proceso de inicio de sesión
  };

  return (
    <Layout>
      <div className="Login">
        <div className="Login-container">
          <img alt="logo" className="logo" />
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
            onClick={() => navigate('/signup')} // Utiliza useNavigate para redirigir
          >
            Sign up
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
