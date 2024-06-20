import { useState, useContext, useEffect, useMemo} from "react";
import { Link } from "react-router-dom";
import { LibrosContext } from '../hooks/LibrosContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
}
if (window.innerWidth < 768) { 
    settings.slidesToShow = 2; 
}
function Relacionados({genero, autor, id}){
    const { BuscarLibrosGenero, BuscarLibrosAutor  } = useContext(LibrosContext); 
    const [relacionadosgenero, setRelacionadosgenero] = useState([]);
    const [ relacionadosautor, setRelacionadosautor] = useState([]);

    //const generos= genero.split(',').map(palabra => palabra.trim().toLowerCase());
    const generos = useMemo(() => genero.split(',').map(palabra => palabra.trim().toLowerCase()), [genero]);

        useEffect(() => {
            const fetchGenero = async () => {
                try {
                  /*  const relacionadosgenero = await BuscarLibrosGenero(generos[0]);
                    if (relacionadosgenero) {
                        const filtrados = relacionadosgenero[0].filter(relacionado => relacionado.id !== id )
                        setRelacionadosgenero(filtrados);
                    }
                        */
                    let todosGeneros = [];
                    let idSet = new Set();

                    for(const gen of generos){
                        const relacionadosGen = await BuscarLibrosGenero(gen);

                        if (relacionadosGen && relacionadosGen.length > 0) {
                            const filtrados = relacionadosGen[0]
                                    .filter(relacionado => relacionado.id !== id && !idSet.has(relacionado.id)) //filtro para que no se repita el mismo libro
                                    .sort(() => 0.5 - Math.random()) // aleatorios
                                    .slice(0,3) // solo coge 3 de cada genero
                            filtrados.forEach(libro => idSet.add(libro.id));
                            todosGeneros = [...todosGeneros, ...filtrados]
                        
                        }
                    }
                    setRelacionadosgenero(todosGeneros);
                } catch (error) {
                    console.error("Error fetching leidos:", error);
                }
            };
            fetchGenero();
                        
          }, [generos, BuscarLibrosGenero, id]);

          useEffect(() => {
            const fetchAutor = async () => {
                try {
                    const relacionadosautor = await BuscarLibrosAutor(autor);
                    if (relacionadosautor) {
                        const filtrados= relacionadosautor[0].filter(relacionado => relacionado.id !== id);
                        setRelacionadosautor(filtrados);
                    }
                } catch (error) {
                    console.error("Error fetching leidos:", error);
                }
            };
            fetchAutor();
          }, [autor, id]);
   
          
            
    return(
        <>
        <div className="relacionados">
             <h2>Otros libros de {generos.join(', ')} </h2>
             {relacionadosgenero && relacionadosgenero.length > 0 ? (
                <Slider {...settings}>
                    {relacionadosgenero.map((elem, i) => (
                         <div key={i} className="card cardRel">
                            <Link to={`/${elem.id}`}>
                                <img src={elem.imagen} alt={elem.titulo} />
                            </Link>
                         </div>
                    ))}
                </Slider>
            )
            :                
            <p>No se han encontrado libros del mismo género</p>
            }
        </div>
        <div className="relacionados">
             <h2>Otros libros del autor </h2>
             {relacionadosautor && relacionadosautor.length > 0  ?
             (
                <Slider {...settings}>
                   {relacionadosautor.map((elem, i) =>(
                        <div key={i} className="card">
                            <Link to={`/${elem.id}`}>
                                <img src={elem.imagen} alt={elem.titulo} />
                            </Link>
                        </div>
                ))}
                </Slider>
             )
                :
                <p>No se han encontrado libros del mismo autor</p>
             }
        </div>
        </>
    )
}

export default Relacionados;