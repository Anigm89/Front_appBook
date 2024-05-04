import { useEffect ,useState, useContext} from "react";
import LibrosPendientes from "../components/LibrosPendientes.jsx";
import { Link } from "react-router-dom";
import { LibrosContext } from '../hooks/LibrosContext';
import ReactPaginate from 'react-paginate';


 function Profileuser({uid, token}){

    const { librosLeidos  } = useContext(LibrosContext); 
    const [leidos, setLeidos] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const resultsPerPage = 8; 
    const pageCount = Math.ceil(leidos.length / resultsPerPage);
    const offset = pageNumber * resultsPerPage;
    const currentPageBooks = leidos.slice(offset, offset + resultsPerPage);
    
  


    useEffect(() => {
    const fetchLeidos = async () => {
        try {
            const leidosData = await librosLeidos(uid);
            if (leidosData) {
                setLeidos(leidosData);
            }
        } catch (error) {
            console.error("Error fetching leidos:", error);
        }
    };
    fetchLeidos();
    }, [uid]);
         
    const actualizarLeidos = async () => {
        try {
            const nuevosLeidos = await librosLeidos(uid);
            setLeidos(nuevosLeidos);
        } catch (error) {
            console.error("Error actualizando leidos:", error);
        }
    };
    return(
        <>
            <div className="relacionados">
                <h2>Mis libros leídos</h2>
                {leidos && leidos.length > 0 ?
                (
                    <ul className="leidosperfil">
                    {
                        currentPageBooks.map((leido, index) =>(
                            <li key={index} className="card">
                               <Link to={`/${leido.id_libro}`}>
                               
                               <img src={leido.imagen} alt={leido.titulo} />
                               </Link>
                            </li>
                        ))
                    }
                    </ul>
                )
                :
                (<p>No has marcado ningún libro como leído</p>) }
            
                <ReactPaginate
                    previousLabel={'Anterior'}
                    nextLabel={'Siguiente'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={({ selected }) => setPageNumber(selected)}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>
            <div className="relacionados">
                <h2>Libros que quiero leer</h2>
                <LibrosPendientes uid={uid} actualizarLeidos={actualizarLeidos} token={token} />
            </div>
        </>
      
    )
}

export default Profileuser;

