import { useEffect, useContext ,useState} from "react";
import { LibrosContext } from '../hooks/LibrosContext';
import { Link } from "react-router-dom";



function LibrosPendientes({uid, actualizarLeidos, token}){
  
    const [ pendientes, setPendientes] = useState([]);
    const { librosPendientes, MarcarLeido, EliminarPendiente, librosLeidos } = useContext(LibrosContext);

    useEffect(() =>{
        const fetchPendientes = async () => {
            try {
                const pendientes = await librosPendientes(uid);
                if (pendientes) {
                    setPendientes(pendientes);
                }
            } catch (error) {
                console.error("Error al traer libros por leer:", error);
            }
        }
        fetchPendientes();
    }, [uid]);


    const handleUpdate = async (id) => {
        
        try{
          await MarcarLeido(id, uid);
          await EliminarPendiente(id, uid, token);
          setPendientes(prevPendientes => prevPendientes.filter(pendiente => pendiente.id_libro !== id));
          await actualizarLeidos();

        }
        catch (error) {
          throw new Error ('No se ha podido añadir el libro a leídos');
        }
      }

      

    return(
        <>
        <div >
        {pendientes.length > 0 ?
            (<ul className="ullistapendientes">
                {pendientes.map((pendiente, index) =>(
                    <li key={index} className="listadopendientes">
                        <Link to={`/${pendiente.id_libro}`}>
                            <img src={pendiente.imagen} alt={pendiente.titulo} />
                            <button onClick={() => handleUpdate(pendiente.id_libro)} className="marcar">Marcar como leído</button>
                        </Link>
                    </li>
                    ))}
            </ul>)
            :
            (<p>No tienes ningún libro pendiente para leer</p>) }   
        </div>
        </>
    )

}

export default LibrosPendientes;