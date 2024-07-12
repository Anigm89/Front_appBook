import { Link } from "react-router-dom";
import { LibrosContext } from '../hooks/LibrosContext'
import { useContext, useState, useEffect, useRef } from "react";
import ReactPaginate from 'react-paginate';



function Books(){
    const { fetchData } = useContext(LibrosContext);
    const [books, setBooks] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const resultsPerPage = 10; 
    const pageCount = Math.ceil(books.length / resultsPerPage);
    const offset = pageNumber * resultsPerPage;
    const currentPageBooks = books.slice(offset, offset + resultsPerPage);
    

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const books = await fetchData();
                if (books) {
                    setBooks(books);
                }
            } catch (error) {
                console.error("Error fetching leidos:", error);
            }
        };
        fetchBooks();
        
      }, []);

    return (
        <>
        <div>
            <ul className="home">
            { books && books.length > 0 ?
            currentPageBooks.map(item => (
                <li key={item.id} className="cardsHome">
                    <Link to={`/${item.id}`}>
                    <img src={item.imagen} alt={item.titulo} />
                        <h2>{item.titulo}</h2>
                        <p>{item.autor}</p>
                    </Link>
                </li>
                ))
            :
            <div className="load">
                <p>Cargando el back</p>
                <img src="loading.gif" alt="cargando gif" />
            </div>
            }
            </ul>
        
            <ReactPaginate
                previousLabel={'Anterior'}
                nextLabel={'Siguiente'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={({ selected }) => setPageNumber(selected)}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
        </>
    )
}

export default Books;