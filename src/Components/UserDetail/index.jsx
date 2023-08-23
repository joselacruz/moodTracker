import { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import { signOutUser } from "../../Utils/firebase";
import { useNavigate } from "react-router-dom";
import "./UserDetail.css";

const UserDetail = () => {
  const navigate = useNavigate();
  const contexUserIsAuth = useContext(UserContext);
  const typeButton = () => {
    if (contexUserIsAuth.user) {
      return <li onClick={handleClick}>SignOut</li>;
    } else {
      return <li onClick={handleClick}>SingIn</li>;
    }
  };
  const handleClick = () => {
    if (contexUserIsAuth.user) {
      const handleLogout = async () => {
        try {
          await signOutUser(); //Cierre de seccion
          //actualizamos es contexto user a false  para dar a conocer
          //a todos los componentes que  nuestra seccion culmino
          contexUserIsAuth.setUser(false);
          contexUserIsAuth.setUserEmail(""); //sin email para mostrar
          navigate('/');
        } catch (error) {
          // Manejo de errores si es necesario
        }
      };
      handleLogout();
    } else {
      return (navigate('/login'));
    }
  };
  return (
    <ul className="UserDetail">
      <li>{contexUserIsAuth.userEmail}</li>
      {typeButton()}
    </ul>
  );
};
export default UserDetail;
