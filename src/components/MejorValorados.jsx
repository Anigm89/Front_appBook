import { useEffect, useState, useContext } from 'react';
import { LibrosContext } from '../hooks/LibrosContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

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

function MejorValorados(){
    const { fetchMejores } =  useContext(LibrosContext);
    const [error, setError] = useState(null);
    const [mejores, setMejores] = useState([])

    useEffect(() => {
        const getMejores = async () => {
            try{
                const mejores = await fetchMejores();
                setMejores(mejores);
            }
            catch (error) {
                setError('No');
            }
        }
        getMejores();
    },[])


    return(
        <div className="relacionados">
             <h2>Top 10 de mejor valorados por los usuarios </h2>
             {mejores && mejores.length > 0  ?
             (
                <Slider {...settings}>
                   {mejores.map((elem, i) =>(
                        <div key={i} className="card">
                            <Link to={`/${elem.id}`}>
                                <img src={elem.imagen} alt={elem.titulo} title={elem.titulo}  />
                            </Link>
                        </div>
                ))}
                </Slider>
             )
                :
                <p>No se han encontrado libros del mismo autor</p>
             }
        </div>
    )

}
export default MejorValorados;

