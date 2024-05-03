import { useState, useContext} from "react";
import { LibrosContext } from '../hooks/LibrosContext';
import { Link } from "react-router-dom";


function BuscadorKeyWords({onSearchKw }){
    const [palabra, setPalabra] = useState('');
    const [resultados, setResultados ] = useState([]);
    const { BuscarKeywords } = useContext(LibrosContext);


    const handleSearchKW = async (e) => {
        e.preventDefault();
       
        const data = await BuscarKeywords(palabra);
        setResultados(data);
        if (data && data.length > 0) {
            onSearchKw(data);
            setPalabra('');
        } 
    }
    return (
        <form >
          <input type="text" placeholder="tesoro, viaje..."  value={palabra} onChange={e => setPalabra(e.target.value)} required />
          <button onClick={handleSearchKW} >Buscar</button>
        </form>
    )
}

export default BuscadorKeyWords;