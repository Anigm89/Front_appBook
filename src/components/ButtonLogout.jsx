import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../fb.js';
import { signOut } from "firebase/auth";
import { AuthContext } from "../hooks/AuthContext.jsx";
import { useContext } from 'react';




const ButtonLogout = () => {

  const { usuario } = useContext(AuthContext);


  const navigate = useNavigate();

  const handleLogout = () => { 
  
    signOut(auth).then(() => {
        navigate("/");
        console.log("Signed out successfully")
    })
    .catch((error) => {
        console.log('error al cerrar sesion', error)
    });
  }

  return(
    <>
    <Link to={'/profile'}>{usuario.email} </Link>
    <button onClick={handleLogout} className='logout'> Logout</button>
    
    </>
  )
}
export default ButtonLogout