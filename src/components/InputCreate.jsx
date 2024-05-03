import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LibrosContext } from '../hooks/LibrosContext';
import styles from '../components/formularios.module.css'



function InputCreate ({token}) {

    const navigate = useNavigate();

    const [titulo, setTitulo] = useState('');
    const [ subtitulo, setSubtitulo ] = useState('');
    const [ autor, setAutor ] = useState('');
    const [ sinopsis, setSinopsis ] = useState('');
    const [ imagen, setImagen] = useState('');
    const [ paginas, setPaginas] = useState('');
    const [ genero, setGenero] = useState('');
    const [ keywords, setKeywords] = useState('');
    const [ error, setError] = useState(null);


    const { addBook } = useContext(LibrosContext);

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        try{  
            await addBook(titulo, subtitulo, autor, sinopsis, imagen, paginas, genero, keywords, token);    
            navigate('/')           
        }
        catch(err){
            console.log(err)
            setError('Ha ocurrido un error', err)
        }
    }
    
    return (
        <>
            <div className={styles.formulario}>
                <h3>Añade un libro</h3>
                <form onSubmit={handleSubmit}>
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
                        <textarea type="text" value={sinopsis} onChange={e => setSinopsis(e.target.value)} /> 
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
                    <button type="submit" className={styles.add}>Añadir</button>
                </form>
            </div>
            
            {error && <p className="error">Error: {error}</p>}

        </>
    )
}

export default InputCreate;