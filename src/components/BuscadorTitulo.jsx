import { useState, useContext} from "react";
import { LibrosContext } from '../hooks/LibrosContext';

function BuscadorTitulo({onSearchT}){

    const [titulo, setTitulo] = useState('');
    const [resultados, setResultados ] = useState([]);
    const { Buscartitulo } = useContext(LibrosContext);


    const handleSearch = async (e) => {
        e.preventDefault();
       
        const data = await Buscartitulo(titulo);
        setResultados(data);
        if (data && data.length > 0) {
            onSearchT(data);
            setTitulo('');
        } 
    }
    return (
        <form >
          <input type="text" placeholder="Busca por titulo"  value={titulo} onChange={e => setTitulo(e.target.value)} required />
          <button onClick={handleSearch} >Buscar</button>
        </form>
    )
   
}

export default BuscadorTitulo;