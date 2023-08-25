import React, { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Layout from "../../Components/Layout";
import { signUpWithEmailAndPassword } from "../../Utils/firebase";
import ErrorMessage from "../../Components/ErrorMessage";
import Logo from '../../Components/Logo';
import './CreateAccount.css';

const CreateAccount = () => {
  const navigate = useNavigate(); // Hook para la navegación
  const form = useRef(null);
  const [showMessage, setShowMessage] = useState("");
  const [isClicked, setIsClicked] = useState(false);
 console.log(showMessage);
  const register = (e) => {
    setIsClicked(true); //desactivamos el onclick para evitar repetir ordenes
    e.preventDefault();

    const formData = new FormData(form.current);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };

    //si algun campo esta vacio mostramos ese error en ErrorMessage
    if (!data.name || !data.email || !data.password) {
      setShowMessage("Todos los campos deben ser completados");
      setIsClicked(false);
    } else {
      //si Todo esta en orden chequeamos si el correo ya esta en uso
      handleSignUp(data.email, data.password)
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      const user = await signUpWithEmailAndPassword(email, password);
      console.log("Registro exitoso",);
      navigate('/log-in-now'); // Redirige al login
      // Aquí puedes realizar las acciones necesarias después del registro exitoso
    } catch (error) {
      console.error("Error al registrarse:", error.message);
      const errorMessage = error.message.split("/")[1].trim(); 
      setShowMessage(errorMessage);// Manejo de errores
      setIsClicked(false);
    }
  };

  const handleInputEmail = (event) => {
    const { name, value } = event.target;
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|es|edu|gov|mil|io|info|etc)$/;
    if (!emailRegex.test(value)) {
      event.target.setCustomValidity("Ingresa un correo electrónico válido.");
    } else {
      event.target.setCustomValidity("");
    }
  };

  const handleInput = (event) => {
    const { value } = event.target;
    if (value.length < 4) {
      event.target.setCustomValidity("deber ser mayor a 4 caracteres");
    } else {
      event.target.setCustomValidity("");
    }
  };


  return (
    <Layout>
           <div className="CreateAccount">
      <div className="CreateAccount-container">
       <Logo/>
        <h1 className="title">Create acount</h1>
        <form action="/" className="form" ref={form} onSubmit={register}>
          <div>
            <label htmlFor="name" className="label">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Jose"
              className="input input-name"
              onChange={handleInput}
            />
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="joselacruz@example.com"
              className="input input-email"
              onChange={handleInputEmail}
            />
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="*********"
              className="input input-password"
              onChange={handleInput}
            />
          </div>
          <input
            type="submit"
            value="Create"
            className="primary-button login-button"
            disabled={isClicked}
          />
        </form>
       <div className="show-error-register">
        {!isClicked && <ErrorMessage message={showMessage} />}
       </div>
      
      </div>
    </div>
    </Layout>
 
  );
};

export default CreateAccount;