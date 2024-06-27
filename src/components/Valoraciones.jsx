import { useState, useContext, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import { LibrosContext } from '../hooks/LibrosContext';

const Valoraciones = ({id_libro, uid, token}) => {

    const { valorado, getValor } =  useContext(LibrosContext);
    const [error, setError] = useState(null); 
    const [rating, setRating] = useState(0);
   
    useEffect(() => {
        const fetchValor = async () => {
            try{
                const data = await getValor(id_libro, uid);

                if (data && data.length > 0 && data[0].puntos !== undefined) {
                    setRating(data[0].puntos);
                }
                else{
                    setRating(0)
                }
             }
             catch (error) {
                 setError('No se ha podido valorar correctamente');
             }
        }
        fetchValor();
    },[id_libro, uid, getValor])
    

    const ratingChanged = (newRating) => {
        setRating(newRating);
        handleValorado(newRating)

    };

    const handleValorado = async (newRating) => {
        try{
            await valorado(id_libro, uid, newRating, token);
        }
        catch (error) {
        setError('No se ha podido valorar correctamente');
        }
    };

    return (
        <div className='valoraciones'>
        <h3>Valora este libro</h3>
        <ReactStars
            count={5}
            onChange={ratingChanged}
            size={30}
            activeColor="#ffd700"
            color={'#ccc'}
            value={rating}
            isHalf={false}              
            edit={true}
            key={rating}
        />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};


export default Valoraciones;