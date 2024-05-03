import { createContext, useState, useEffect } from "react";

export const LibrosContext = createContext();

export const LibrosProvider = ({children, id, token}) => {
    const [libros, setLibros] = useState([]);
    const [ error, setError] = useState(null);
    const [ leidos, setLeidos] = useState([]);


    const addBook = async (titulo, subtitulo, autor, sinopsis, imagen, paginas, genero, keywords, token) =>{
        const urlCreate = 'http://localhost:3000/create';
        
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
        const urlUpdate = `http://localhost:3000/edit/${id}`;
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
        const urlDelete = `http://localhost:3000/delete/${id}`;

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
        const urlLeidos = 'http://localhost:3000/leidos';
        
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
        const urlPendientes = 'http://localhost:3000/pendientes';
        console.log('idlpen',id_libro)
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
        const urlDeleteP = `http://localhost:3000/deletePendiente/${id}/${uid}`;

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
        const urlLeidos = `http://localhost:3000/leidos/${uid}`;
        try{
            const response = await fetch(urlLeidos);
            const resData = await response.json();
            return resData
        }
        catch(error){
            console.log(error)
        }
    };

    const eliminarLeido = async(id,uid, token) => {
        const urlDeleteL = `http://localhost:3000/deleteLeido/${id}/${uid}`;
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
        const urlPendientes= `http://localhost:3000/pendientes/${uid}`;
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
        const urltitulo = `http://localhost:3000/titulo/${titulo}`;
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
        const urlgenero = `http://localhost:3000/generos/`;
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
        const urlgenero = `http://localhost:3000/genero/${genero}`;
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
        const urlautor = `http://localhost:3000/autor/${autor}`;
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
        const urlkeywords = `http://localhost:3000/keywords/${palabra}`;
        try{
            const response = await fetch(urlkeywords);
            const data = await response.json();
            return data;
        }
        catch(error){
            console.log(error)
        }
    };

    const BuscarRelacionados = async (genero, autor, keywords) =>{
        const urlRelacionados = `http://localhost:3000/relacionados/${genero}/${autor}/${keywords}`;
        console.log(urlRelacionados)
        try{
            const response = await fetch(urlRelacionados);
            const data = await response.json();
            console.log('data', data)
            return data;
        }
        catch(error){
            console.log(error)
        }
    };

    const  fetchData = async () =>{
        const urlApi = 'http://localhost:3000';

        try{
            const response = await fetch(urlApi)
            const resData = await response.json();
            setLibros(resData);
            console.log('libro', resData)
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
        <LibrosContext.Provider value={{libros,fetchData, addBook, updateBook, eliminarLibro, MarcarLeido, MarcarPendiente, EliminarPendiente, librosLeidos, eliminarLeido, librosPendientes, Buscartitulo, BuscarGenero, BuscarLibrosGenero, BuscarLibrosAutor, BuscarKeywords}} >
            {children}
        </LibrosContext.Provider>
    )
    
}

export default LibrosContext;
