import { AuthContext } from "../hooks/AuthContext.jsx";
import { useContext, useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { LibrosContext } from '../hooks/LibrosContext';
import Relacionados from "./Relacionados.jsx";



const ItemDetailPage = ({item}) => {
  const { usuario } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null); 
  const { eliminarLibro, MarcarLeido, MarcarPendiente, librosLeidos, eliminarLeido, librosPendientes  } = useContext(LibrosContext);
  const [isLeido, setIsLeido] = useState(false);
  const [leidosData, setLeidosData] = useState([]);
  const [leidos, setLeidos] = useState([]);
  const [isPendiente, setIsPendiente] = useState([]);
  const [pendientesData, setPendientesData] = useState([]);


  const handleDelete = async () =>{
    try {
      await eliminarLibro(item.id, usuario.accessToken);
      navigate('/');
    } catch (error) {
      setError('No se ha podido eliminar el libro');
    }
  };
  
  const handleLeido = async () => {
    try{
      await MarcarLeido(item.id, usuario.uid, usuario.accessToken);
      navigate('/profile');
    }
    catch (error) {
      setError('No se ha podido añadir el libro a leídos');
    }
  };
  

  const handlePendiente = async () => {
    try{
      await MarcarPendiente(item.id, usuario.uid, usuario.accessToken);
      navigate('/profile');
    }
    catch (error) {
      setError('No se ha podido añadir el libro a leídos');
    }
  }
  useEffect(() => {
    if (usuario) {
      const getLeidos2 = async () => {
        try {
          const leidosData = await librosLeidos(usuario.uid);
          const isRead = leidosData.some(libro => libro.id_libro === item.id);
          setIsLeido(isRead);
        } catch (error) {
          console.error('Error al obtener la lista de libros leídos:', error);
        }
      };
  
      getLeidos2();
    }
  }, [item.id, librosLeidos, usuario]);

  const handlequitar = async () => {
    try{
      await eliminarLeido(item.id, usuario.uid, usuario.accessToken);
    }
    catch (error) {
      setError('No se ha podido quitar de leídos');
    }
  };

  useEffect(() => {
    if (usuario) {
      const getPendientes = async () => {
        try {
          const pendientesData = await librosPendientes(usuario.uid);
          const isPending = pendientesData.some(libro => libro.id_libro === item.id);
          setIsPendiente(isPending);
        } catch (error) {
          console.error('Error al obtener la lista de libros pendientes:', error);
        }
      };
  
      getPendientes();
    }
  }, [item.id, librosPendientes, usuario]);
  
  

  return (
    <>
      <div className="product-cardId">
        <div className="izq">
          <h2>{item.titulo} </h2>
          <h3>{item.subtitulo} </h3>
          <h4>{item.autor} </h4>
          <img src={item.imagen} alt="{item.titulo}" />
        </div>

        <div className="detalles">
          <p>{item.sinopsis} </p>
          <p>Nº de Páginas: {item.paginas} </p>
          <p>Género: {item.genero} </p>
          <p>Palabras clave: <i>{item.keywords} </i></p>
       
          {usuario && usuario.email === 'admin@ejemplo.es' && (
            <div className="botones">
              <Link to={`/editBook/${item.id}`}> <button className="editar">Editar</button></Link>
              <button onClick={handleDelete} className="eliminar">Eliminar</button>
              {error && <p>Error: {error}</p>}
            </div>
          )}
          <div className="botones">
          {
          usuario && !isLeido &&
            (<>
              <button onClick={handleLeido} className="marcar">Marcar como leído</button>
            </>)
                     
          }
          {
            usuario && !isPendiente && !isLeido &&
            (
              <button onClick={handlePendiente} className="pendiente">Por leer</button>
            )
          }
          </div>
          {usuario && isLeido && 
            <div className="botones">
              <div className="leido">
                <p>leído</p>
                <img src="../cheque.png" alt="" />
              </div>
              <button onClick={() => handlequitar(item.id)} className="quitar">Quitar de leídos</button>
            </div>
          }
          {usuario && isPendiente && !isLeido && (
            <div className="leido">
              <p>Libro marcado como pendiente</p>
              <img src="../cheque.png" alt="" />
            </div>
          )}
          {error && <p className="error">Error: {error}</p>}
        </div>
      </div>
      <Relacionados genero={item.genero} autor={item.autor} />
    </>
 
  );
};

export default ItemDetailPage;
