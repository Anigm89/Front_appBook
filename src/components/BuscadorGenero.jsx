import { useState, useContext, useEffect} from "react";
import { LibrosContext } from '../hooks/LibrosContext';


function BuscadorGenero({onSearchGenero }){

    const { BuscarGenero, BuscarLibrosGenero} = useContext(LibrosContext);
    const [generosUnicos, setGenerosUnicos] = useState([]);
    const [resultados, setResultados ] = useState([]);
    const [genero, setGenero] = useState('');
    const [ reslibros, setReslibros ] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
        const data = await BuscarGenero();
        setResultados(data[0]);
        };

        fetchData();
    }, [BuscarGenero]);

    useEffect(() => {
        if (resultados.length > 0) {
        const obtenerGenerosUnicos = () => {
            const generosUnicosSet = new Set();
            resultados.forEach(resultado => {
            if (resultado && resultado.genero) { 
                const generos = resultado.genero.split(',').map(genero => genero.trim()); 
                generos.forEach(genero => generosUnicosSet.add(genero.toLowerCase()));
            }
            });
            const generosUnicosArray = Array.from(generosUnicosSet);
            setGenerosUnicos(generosUnicosArray);
        };

        obtenerGenerosUnicos();
        }
    }, [resultados]);

    const handleGeneroChange = (e) => {
        setGenero(e.target.value);
    };

    useEffect(() =>{ 
        const buscar = async () => {
            const data = await BuscarLibrosGenero(genero);
            setReslibros(data);
            if (data && data.length > 0) {
                onSearchGenero(data);
                setGenero('');
            } 
        }
        if (genero !== '') {
            buscar();
        }
    },[genero])
  


    return (
        
        <select value={genero} onChange={handleGeneroChange}>
                <option value="">Selecciona un género</option>
                {generosUnicos.map((genero, index) => (
                <option key={index} value={genero}>
                    {genero}
                </option>
                ))}
        </select>

    );
}

export default BuscadorGenero;