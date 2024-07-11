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

function MasLeidos(){
    const { fetchMasleidos } =  useContext(LibrosContext);
    const [error, setError] = useState(null);
    const [masleidos, setMasleidos] = useState([])

    useEffect(() => {
        const getMasLeidos = async () => {
            try{
                const masleidos = await fetchMasleidos();
                setMasleidos(masleidos);
            }
            catch (error) {
                setError('No se han encontrado', error);
            }
        }
        getMasLeidos();
    },[])


    return(
        <div className="relacionados">
             <h2>Top 10: libros más leídos por los usuarios </h2>
             {masleidos && masleidos.length > 0  ?
             (
                <Slider {...settings}>
                   {masleidos.map((elem, i) =>(
                        <div key={i} className="card">
                            <Link to={`/${elem.id}`}>
                                <img src={elem.imagen} alt={elem.titulo} title={elem.titulo}  />
                            </Link>
                        </div>
                ))}
                </Slider>
             )
                :
                <p>No se han encontrado los libros más leidos por los usuarios</p>
             }
        </div>
    )

}
export default MasLeidos;

