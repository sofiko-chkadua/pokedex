import './card.css';
import { useEffect, useState } from 'react';
import PokemonPage from '../PokemonPage/PokemonPage';


 const renderPokemon = (pokemons) => {
  return (
    <ul>
  {pokemons.map(pokemon => (
    <li key={pokemon.id} href="#" target="_blank" className="card">
      <div className="card__id">{pokemon.id}</div>
    <img className="card__img" src={`img/${pokemon.id}.png`}  alt={pokemon.name} />
    <h3 className="card__info">{pokemon.name}</h3>
  </li>))}
  </ul>
  )
}

  


function Card() {
const [pokemons, setPokemon] = useState([]);

const [currentPage, setcurrentPage] = useState(1);
const [pokemonPerPage, setpokemonPerPage] = useState(3);

const [pageNumberLimit, setpageNumberLimit] = useState(5);
const [maxPageNaumber, setmaxPageNaumber] = useState(10);
const [minPageNaumber, setminPageNaumber] = useState(0);

const handlerClick = (event) => {
  setcurrentPage(Number(event.target.id));
};


const pages = [];
for (let i=1; i < Math.ceil(pokemons.length/pokemonPerPage); i++) {
pages.push(i)
}

const indexOfLastItem = currentPage * pokemonPerPage;
const indexOfFirstItem = indexOfLastItem - pokemonPerPage;
const currentItems = pokemons.slice(indexOfFirstItem, indexOfLastItem)


const renderagesNumbers = pages.map(number =>
  {
    if (number < maxPageNaumber + 1 && number > minPageNaumber) {
      return (
        <li onClick={handlerClick} className="pagination__item" key={number} id={number}>{number}</li>
      )
    } else {
      return null;
    }
   })


   const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNaumber) {
      setmaxPageNaumber(maxPageNaumber + pageNumberLimit);
      setminPageNaumber(minPageNaumber + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNaumber(maxPageNaumber - pageNumberLimit);
      setminPageNaumber(minPageNaumber - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNaumber) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNaumber >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const handleLoadMore = () => {
    setpokemonPerPage(pokemonPerPage + 5);
  };



useEffect(() => {
  fetch("http://localhost:3000/pokemons")
  .then((response) => response.json())
  .then((json) => setPokemon(json));
  }, [])

return (
    <>
<PokemonPage/>
<button onClick={handlePrevbtn}disabled={currentPage == pages[0] ? true : false}>Prev </button>
    <ul className="pagination">{renderagesNumbers}</ul>
    <button onClick={handleNextbtn} disabled={currentPage == pages[pages.length - 1] ? true : false}>Next</button>
        {renderPokemon(currentItems)}

    </>
)
}

export default Card;
