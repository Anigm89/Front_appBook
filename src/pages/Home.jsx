import { Link } from "react-router-dom";
import { useState,  useRef } from "react";
import BuscadorTitulo from "../components/BuscadorTitulo";
import BuscadorGenero from "../components/BuscadorGenero";
import BuscadorKeyWords from "../components/BuscadorKeyWords";
import MejorValorados from "../components/MejorValorados";
import MasLeidos from "../components/MasLeidos";

const Home = () => {

  
  const [buscadosT, setBuscadosT]  = useState([]);
  const [resultadosGenero, setResultadosGenero] = useState([]);
  const [resultKW, setResultKW ] = useState([]);

  const divRef = useRef(null)

  const onSearchT =  (searchResults) => {
    setBuscadosT(searchResults);
    divRef.current.style.display = 'none';
  };

  const onSearchGenero = async (searchResultsG) => {
    setResultadosGenero(searchResultsG);
    divRef.current.style.display = 'none'
  };

  const onSearchKw = async (searchResultsKW) => {
    setResultKW(searchResultsKW);
    divRef.current.style.display = 'none'
  };
 
  const handleReset = () => {
    setBuscadosT([]);
    setResultadosGenero([]);
    setResultKW([]);
    divRef.current.style.display = 'block'

  };

  return (
    <>
      <div className="buscadores">
        <BuscadorTitulo onSearchT={onSearchT} />
        <BuscadorGenero onSearchGenero={onSearchGenero} />
        <BuscadorKeyWords onSearchKw={onSearchKw} />
      </div>
      <div className="todos" ref={divRef}>
        <MejorValorados />
        <MasLeidos />
        <Link to={'/books'} className="ir">Ver libros</Link>
      </div>
      <div className="resultados">
        {buscadosT && buscadosT[0] == 0 && <p>No se han encontrado resultados</p>}

        { buscadosT  &&  buscadosT.length > 0 ?
              <>
              <ul>
                  {buscadosT[0].map((res, i) => (
                      <li key={i} className="card">
                        <Link to={`/${res.id}`}>
                              <img src={res.imagen} alt={res.titulo} /> 
                              <p>Ver</p>
                          </Link>
                      </li>
                  ))}
              </ul>
              <button onClick={handleReset} className="marcar">Reset</button>
              </>
              : null
        }
      </div>
      <div className="resultados">
        { resultadosGenero  &&  resultadosGenero.length > 0 ?
          <>
          <ul>
              {resultadosGenero[0].map((res, i) => (
                  <li key={i} className="card">
                      <Link to={`/${res.id}`}>
                          <img src={res.imagen} alt={res.titulo} /> 
                          <p>Ver</p>
                      </Link>
                  </li>
              ))}
          </ul>
          <button onClick={handleReset} className="marcar">Reset</button>
          </>
          : null
        }
        {resultadosGenero && resultadosGenero[0] === 0 && <p>No se han encontrado resultados</p>}
      </div>
      <div className="resultados">
        {resultKW && resultKW[0] == 0 && <p>No se han encontrado resultados</p>}

        { resultKW  &&  resultKW.length > 0 ?
          <>
          <ul>
              {resultKW[0].map((res, i) => (
                  <li key={i} className="card">
                      <Link to={`/${res.id}`}>
                            <img src={res.imagen} alt={res.titulo} /> 
                            <p>Ver</p>
                      </Link>
                  </li>
              ))}
          </ul>
          <button onClick={handleReset} className="marcar" >Reset</button>
          </>
          : null
        }
      
      </div>
    </>
  )
};

export default Home;
