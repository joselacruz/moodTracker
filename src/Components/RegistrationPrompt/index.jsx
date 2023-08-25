import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './RegistrationPrompt.css'

const RegistrationPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  
 useEffect(() =>{
  setTimeout(()=> {
    setIsVisible(true);
  },5000)
 },[])

  const handleClose = () => {
    setIsVisible(false);
  };


  return (
    <>
      {isVisible && (
        <div className="registration-prompt">
          <div className="registration-prompt-content">
            <h2>¡Bienvenido a Mood Tracker!</h2>
            <p>
              ¡Regístrate para guardar el historial de tus emociones y tener un seguimiento completo de tu bienestar!
            </p>
            <div className="registration-prompt-buttons">
              <button className="registration-button primary">
                <NavLink to="/signup">Registrarse</NavLink>
              </button>
              <button className="registration-button secondary" onClick={handleClose}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegistrationPrompt;
