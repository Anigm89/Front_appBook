import { createContext, useState, useEffect } from "react";

export const LibrosContext = createContext();

export const LibrosProvider = ({children, id, token}) => {
    const [libros, setLibros] = useState([]);
    const [ error, setError] = useState(null);
    const [ leidos, setLeidos] = useState([]);


    const addBook = async (titulo, subtitulo, autor, sinopsis, imagen, paginas, genero, keywords, token) =>{
        
        const urlCreate = import.meta.env.VITE_APP_API_URL+'create';
        
        try{  
            const response = await fetch(urlCreate, {
                method: 'POST', 
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({titulo, subtitulo, autor, sinopsis, imagen, paginas, genero, keywords}), 
            });
            if(response.ok){
                fetchData();
                setError(null)
            }
        }
        catch(err){
            console.log(err)
            setError(err)
        }
    };
    
    const updateBook = async (id,titulo, subtitulo, autor, sinopsis, imagen, paginas, genero, keywords, token) => {
        const urlUpdate = import.meta.env.VITE_APP_API_URL + `edit/${id}`;
        try{  
        const response = await fetch(urlUpdate, {
            method: 'PUT', 
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({id,titulo, subtitulo, autor, sinopsis, imagen, paginas, genero, keywords}), 
        });
            if(response.ok){
                fetchData();
                setError(null)
            }
            else{
                setError('algo ha fallado')
            }
        }
        catch(err){
            console.log(err)
            setError(err)
        }
    };
        
    const eliminarLibro = async(id,token) => {
        const urlDelete = import.meta.env.VITE_APP_API_URL + `delete/${id}`;

            try{  
                const confirmDelete = window.confirm("¿Está seguro de que desea eliminar este libro?");
                if(confirmDelete){
                    const response = await fetch(urlDelete, {
                        method: 'DELETE', 
                        headers: {
                            'Authorization': `Bearer ${token}`, 
                            'Content-Type': 'application/json', 
                        }
                    });
                    if(response.ok){
                        fetchData();
                        setError(null)
                    }
                    else {
                        setError('Error al eliminar el libro');
                    }
                }
            }
            catch(err){
                console.log(err)
                setError('Error al eliminar el libro', err);
            }
    };

    const MarcarLeido = async (id_libro, uid, token) =>{
        const urlLeidos = import.meta.env.VITE_APP_API_URL + 'leidos';
        
        try{  
            const response = await fetch(urlLeidos, {
                method: 'POST', 
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({id_libro, uid}), 
            });
            if(response.ok){
                fetchData();
                setError(null)
            }
        }
        catch(err){
            console.log(err)
            setError(err)
        }
    };
    const MarcarPendiente = async (id_libro, uid, token) =>{
        const urlPendientes = import.meta.env.VITE_APP_API_URL + 'pendientes';
        try{  
            const response = await fetch(urlPendientes, {
                method: 'POST', 
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({id_libro, uid}), 
            });
            if(response.ok){
                fetchData();
                setError(null)
            }
        }
        catch(err){
            console.log(err)
            setError(err)
        }
    };

    const EliminarPendiente = async(id,uid, token) => {
        const urlDeleteP = import.meta.env.VITE_APP_API_URL + `deletePendiente/${id}/${uid}`;

            try{  
                const response = await fetch(urlDeleteP, {
                    method: 'DELETE', 
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json', 
                    }
                });
                if(response.ok){
                    fetchData();
                    setError(null)
                }
                else {
                    setError('Error al marcar como pendiente el libro');
                }
            }
            catch(err){
                console.log(err)
                setError('Error al eliminar de esta lista', err);
            }
    };
       
    const librosLeidos = async (uid) => {
        const urlLeidos = import.meta.env.VITE_APP_API_URL + `leidos/${uid}`;
        try{
            const response = await fetch(urlLeidos);
            if (!response.ok) {
                throw new Error(`Error al cargar los libros leídos: ${response.status}`);
            }
            const resData = await response.json();
            return resData
        }
        catch(error){
            console.error("Error en la llamada a la API:", error);
        }
    };

    const eliminarLeido = async(id,uid, token) => {
        const urlDeleteL =  import.meta.env.VITE_APP_API_URL + `deleteLeido/${id}/${uid}`;
            try{  
                const response = await fetch(urlDeleteL, {
                    method: 'DELETE', 
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json', 
                    }
                });
                if(response.ok){
                    fetchData();
                    setError(null)
                }
                else {
                    setError('Error al eliminar leído ');
                }
            }
            catch(err){
                console.log(err)
                setError('Error al eliminar de esta lista', err);
            }
    };
    
    const librosPendientes = async (uid) => {
        const urlPendientes= import.meta.env.VITE_APP_API_URL + `pendientes/${uid}`;
        try{
            const response = await fetch(urlPendientes);
            const resData = await response.json();
            return resData;
        }
        catch(error){
            console.log(error)
        }
    };

    const Buscartitulo = async (titulo) =>{
        const urltitulo = import.meta.env.VITE_APP_API_URL + `titulo/${titulo}`;
        try{
            const response = await fetch(urltitulo);
            const data = await response.json();
           
            return data;
        }
        catch(error){
            console.log(error)
        }
    };

    const BuscarGenero = async () =>{
        const urlgenero = import.meta.env.VITE_APP_API_URL + `generos/`;
        try{
            const response = await fetch(urlgenero);
            const data = await response.json();
            return data;
        }
        catch(error){
            console.log(error)
        }
    };
    const BuscarLibrosGenero = async (genero) =>{
        const urlgenero = import.meta.env.VITE_APP_API_URL + `genero/${genero}`;
        try{
            const response = await fetch(urlgenero);
            const data = await response.json();
            return data;
        }
        catch(error){
            console.log(error)
        }
    };
    
    const BuscarLibrosAutor = async (autor) =>{
        const urlautor = import.meta.env.VITE_APP_API_URL + `autor/${autor}`;
        try{
            const response = await fetch(urlautor);
            const data = await response.json();
            return data;
        }
        catch(error){
            console.log(error)
        }
    };

    const BuscarKeywords = async (palabra) =>{
        const urlkeywords = import.meta.env.VITE_APP_API_URL + `keywords/${palabra}`;
        try{
            const response = await fetch(urlkeywords);
            const data = await response.json();
            return data;
        }
        catch(error){
            console.log(error)
        }
    };

    const valorado = async (id_libro, uid, puntos, token) =>{
        const urlValorados = import.meta.env.VITE_APP_API_URL + 'valorados';
        try{  
            const response = await fetch(urlValorados, {
                method: 'POST', 
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({id_libro, uid, puntos}), 
            });
            if(response.ok){
             const data = await response.json();
             setError(null)
            }
        }
        catch(err){
            console.log(err)
            setError(err)
        }
    };

    const getValor = async (id_libro, uid) => {
        const urlValor= import.meta.env.VITE_APP_API_URL + `valorado/${id_libro}/${uid}`;
        try{
            const response = await fetch(urlValor);
            const resData = await response.json();
            return resData;
        }
        catch(error){
            console.log(error)
            setError('No se ha podido obtener la valoración');
        }
    };
    const  fetchData = async () =>{
        const urlApi = import.meta.env.VITE_APP_API_URL;
        try{
            const response = await fetch(urlApi)
            const resData = await response.json();
            setLibros(resData);
            return resData;
        }
        catch(error){
            console.log(error)
        }
    }
  
    useEffect(() => {
        fetchData()
    }, [])

    return(
        <LibrosContext.Provider value={{libros,fetchData, addBook, updateBook, eliminarLibro, MarcarLeido, MarcarPendiente, EliminarPendiente, librosLeidos, eliminarLeido, librosPendientes, Buscartitulo, BuscarGenero, BuscarLibrosGenero, BuscarLibrosAutor, BuscarKeywords, valorado, getValor}} >
            {children}
        </LibrosContext.Provider>
    )
    
}

export default LibrosContext;
