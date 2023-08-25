import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';
import { signOutUser } from '../../Utils/firebase';
import { MoodContext } from '../../Context';
import './UserDetail.css';

const UserDetail = () => {
  const navigate = useNavigate();
  const context = useContext(MoodContext);
  const contexUserIsAuth = useContext(UserContext);
  const typeButton = () => {
    if (contexUserIsAuth.user) {
      return <li onClick={handleClick}>Sign Out</li>;
    } else {
      return <li onClick={handleClick}>Sign In</li>;
    }
  };
  const handleClick = () => {
    context.setMenuMobile(false);

    if (contexUserIsAuth.user) {
      const handleLogout = async () => {
        try {
          await signOutUser(); //Cierre de seccion
          //actualizamos es contexto user a false  para dar a conocer
          //a todos los componentes que  nuestra seccion culmino
          contexUserIsAuth.setUser(false);
          contexUserIsAuth.setUserEmail(''); //sin email para mostrar
          window.location.pathname = '/';
        } catch (error) {
          // Manejo de errores si es necesario
        }
      };
      handleLogout();
    } else {
      return navigate('/login');
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
