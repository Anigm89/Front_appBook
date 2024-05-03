import { LibrosContext } from '../hooks/LibrosContext';
import { useContext, useState} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../components/formularios.module.css'


const EditarLibro = ({token}) => {

    const { libros } = useContext(LibrosContext);
    const { id } = useParams();
    const { updateBook } = useContext(LibrosContext);
    const navigate = useNavigate();

    const libro = libros.find(libro => libro.id.toString() === id);


    if(!libro){
        return <p>El libro no existe</p>;
    }
    


const [titulo, setTitulo] = useState(libro.titulo);
const [ subtitulo, setSubtitulo ] = useState(libro.subtitulo);
const [ autor, setAutor ] = useState(libro.autor);
const [ sinopsis, setSinopsis ] = useState(libro.sinopsis);
const [ imagen, setImagen] = useState(libro.imagen);
const [ paginas, setPaginas] = useState(libro.paginas);
const [ genero, setGenero] = useState(libro.genero);
const [ keywords, setKeywords] = useState(libro.keywords);
const [ error, setError] = useState(null);



const handleUpdate = async (e) => {
    e.preventDefault();
    try{  
        await updateBook(id, titulo, subtitulo, autor, sinopsis, imagen, paginas, genero, keywords, token);
        navigate(`/${id}`)
    }
    catch(err){
        console.log(err)
        setError(err)
    }
}


return(
    <>
    <div className={styles.formulario}>
        <h3>Edita este libro</h3>
        <form onSubmit={handleUpdate}>
            <div className={styles.bloques}> 
                <label>Título:</label>
                <input type="text" placeholder="titulo" value={titulo} onChange={e => setTitulo(e.target.value)}  required />
            </div>
            <div className={styles.bloques}>
                <label>Subtítulo: </label>
                <input type="text" placeholder="subtitulo" value={subtitulo} onChange={e => setSubtitulo(e.target.value)} />
            </div>
            <div className={styles.bloques}>  
                <label>Autor:</label>
                <input type="text" placeholder="autor" value={autor} onChange={e => setAutor(e.target.value)} required />
            </div>
            <div className={styles.bloques}>
                <label>Sinopsis:</label>
                <textarea type="text" placeholder="" value={sinopsis} onChange={e => setSinopsis(e.target.value)} />
            </div>
            <div className={styles.bloques}>
                <label>Imagen:</label>
                <input type="text" placeholder="imagen" value={imagen} onChange={e => setImagen(e.target.value)} />
            </div>
            <div className={styles.bloques}>
                <label>Nº de Páginas:</label>
                <input type="number" placeholder="nº de páginas" value={paginas} onChange={e => setPaginas(e.target.value)} />
            </div>
            <div className={styles.bloques}>
                <label>Género:</label>
                <input type="text" placeholder="genero" value={genero} onChange={e => setGenero(e.target.value)} required />
            </div>
            <div className={styles.bloques}>
            <label>Palabras Clave:</label>
            <textarea type="text" placeholder="tesoro, viaje ..." value={keywords} onChange={e => setKeywords(e.target.value)} />
            </div>
            <button type="submit" className='marcar'>Guardar</button>
        </form>
        {error && <p className='error'>Error: {error}</p>}
    </div>
</>
)

};

export default EditarLibro;