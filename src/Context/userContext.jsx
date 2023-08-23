import { createContext, useState,useEffect} from "react";
import { FaSmile, FaSadTear, FaMeh, FaAngry } from "react-icons/fa";

import { checkUserAuth, readFirebase } from "../Utils/firebase.js";


export const UserContext = createContext();

const icons = {
  Feliz: <FaSmile size={64} color="#FFD700" />,
  Triste: <FaSadTear size={64} color="#6495ED" />,
  Neutral: <FaMeh size={64} color="#A9A9A9" />,
  Enojado: <FaAngry size={64} color="#FF6347" />,
  Horrible: <FaSadTear size={64} color="#8B0000" />,
};

export const UserProvider = ({ children }) => {
 
    //Usuario Autenticado cambia a True
    const [user , setUser] = useState(false);

    //Historial de Mood Usuario
    const [moodHistoyUser, setMoodHistoyUser] = useState([]);

  //Autenticacion Usuario

  //comprobar si el usuario fue esta Autenticado para guaradar su uid
  async function getUserUID() {
    try {
      const uid = await checkUserAuth(); // Aquí tendrás el valor de user.uid o null
      setUser(true); // actualizacion de estado usario Autenticado

      moodHistory(uid) //ejecucion funcion para obtener los datos del usuario
    } catch (error) {
      console.error(error);
    }
  }
  

//   Obtiene el Historial De Datos Del Usuario en Una Coleccion
//   Cuya Identificacion Sera El uid
    const  moodHistory = async (collectionName) => {
    const obtainNewData = await readFirebase(collectionName);

    //Agreguegos Icono al  la Coleccion Obtenida
    const addIconANewData = obtainNewData.map((item) => {
      let newPropertyValue;
      switch (item.value) {
        case "Feliz":
          newPropertyValue = icons.Feliz;
          break;
        case "Triste":
          newPropertyValue = icons.Triste;
          break;
        case "Neutral":
          newPropertyValue = icons.Neutral;
          break;
        case "Enojado":
          newPropertyValue = icons.Enojado;
          break;
        case "Horrible":
          newPropertyValue = icons.Horrible;
          break;
      }
      return { ...item, icon: newPropertyValue };
    });
    //Actualicemos el estado 
    setMoodHistoyUser(addIconANewData);
  };

  useEffect(()=> {
    getUserUID()
  }, []
  )


  return (
    <UserContext.Provider
      value={{
        user,
        moodHistoyUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
