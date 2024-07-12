import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../hooks/AuthContext.jsx";
import { LibrosContext } from "../hooks/LibrosContext.jsx";
import { isLoggedIn } from "../components/AuhtService.js";
import Home from '../pages/Home.jsx';
import Profileuser from "../pages/ProfileUser.jsx";
import ItemDetailPage from "../components/ItemDetailPage.jsx";
import InputCreate from "../components/InputCreate.jsx";
import FormLogIn from "../components/FormLogIn.jsx";
import FormNewUser from '../components/FormNewUser.jsx';
import ButtonLogout from "../components/ButtonLogout.jsx";
import EditarLibro from "../components/EditarLibro.jsx";
import Books from "../pages/Books.jsx";


function RoutesApp () {

    const { usuario } = useContext(AuthContext);
    const { libros } = useContext(LibrosContext);

    return (
    <Router>
      
        <header>
            <nav>
              <Link to="/">Inicio</Link>
              <Link to="/books">Libros</Link>

              {!usuario ?
              <>
                <Link to="/login">LogIn</Link>
                <Link to="/registro">Registrarse</Link>
              </>
              :
              <>
                <Link to="/create">Añadir libro</Link>
                <ButtonLogout />
              </>
              }            
            </nav>
        </header>
        <div className="content">
        {libros.length == 0 ? 
          (<div className="load">
            <p>Cargando el back</p>
            <img src="loading.gif" alt="cargando gif"  width="10vw"/>
          </div>) 
        : 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/login" element={<FormLogIn />} />
            <Route path="/registro" element={<FormNewUser />} />
           
            {libros.map(item => (
              <Route key={item.id} path={`/${item.id}`} element={<ItemDetailPage item={item} />} />
              ))
            }
        
            {isLoggedIn() ? (
                <>
                    <Route path="/create" element={<InputCreate token={usuario.accessToken} />} />
                    <Route path="/editBook/:id" element={<EditarLibro token={usuario.accessToken} />} />
                    <Route path="/profile" element={<Profileuser uid={usuario.uid} token={usuario.accessToken} />} />
                </>
              ) : (
                <>
                    <Route path="/create" element={<Navigate to="/login" />} />
                    <Route path="/editBook/:id" element={<Navigate to="/login" />} />
                    <Route path="/profile" element={<Navigate to="/login" />} />

                </>
              )
            }         
          </Routes>
        }
      </div>
      <footer>
        <p>Proyecto creado y desarrollado por Ani González Moreno </p>
        <a href="https://github.com/Anigm89/appBook">
          <img src='github.png' alt="github" target="_blank" />
        </a>
      </footer>
    </Router>
  )
}

export default RoutesApp
