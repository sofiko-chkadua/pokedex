import './card.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom"
import PokemonPage from '../PokemonPage/PokemonPage';



// функция которая возвращает покемонов
 const renderPokemon = (pokemons) => {
  return (
    <ul className="card">
  {pokemons.map(pokemon => (
    <li key={pokemon.id} className="card__item">
      <Link className="card__link" target="_blank" to={`/${pokemon.name}`}>
      <div className="card__id">{pokemon.id}</div>
    <img className="card__img" src={`img/${pokemon.id}.png`}  alt={pokemon.name} />
    <h3 className="card__info">{pokemon.name}</h3>
    </Link>
  </li>))}
  </ul>
  )
}

  


function Card() {

const [pokemons, setPokemon] = useState([]);

const [currentPage, setcurrentPage] = useState(1);
const [pokemonPerPage, setpokemonPerPage] = useState(10);

const [pageNumberLimit, setpageNumberLimit] = useState(5);
const [maxPageNaumber, setmaxPageNaumber] = useState(5);
const [minPageNaumber, setminPageNaumber] = useState(0);

// кнопка по нажатию на которую переключаются стр пагинации
const handlerClick = (event) => {
  setcurrentPage(Number(event.target.id));
};

// логика отрисовки страниц

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

// кнопка вперед
   const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNaumber) {
      setmaxPageNaumber(maxPageNaumber + pageNumberLimit);
      setminPageNaumber(minPageNaumber + pageNumberLimit);
    }
  };
// кнопка назад

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNaumber(maxPageNaumber - pageNumberLimit);
      setminPageNaumber(minPageNaumber - pageNumberLimit);
    }
  };

  // многоточие вперед

  let pageIncrementBtn = null;
  if (pages.length > maxPageNaumber) {
    pageIncrementBtn = <li className="paginarion__doths" onClick={handleNextbtn}> &hellip; </li>;
  }

    // многоточие назад
  let pageDecrementBtn = null;
  if (minPageNaumber >= 1) {
    pageDecrementBtn = <li  className="paginarion__doths" onClick={handlePrevbtn}> &hellip; </li>;
  }

  // запрос к серверу

useEffect(() => {
  fetch("http://localhost:3000/pokemons")
  .then((response) => response.json())
  .then((json) => setPokemon(json));
  }, [])

return (
    <>

{/* здесь я пыталась сделать открытие страницы покемона */}
<Router>
        <Switch>
          <Route exaxt path="/:param" render={() => <PokemonPage />}></Route>
        </Switch>
      </Router> 

{/* пагинация */}
    <div className="pagination">
<button className="pagination__button"  onClick={handlePrevbtn}disabled={currentPage == pages[0] ? true : false}>Prev </button>
{pageDecrementBtn}
    <ul className="pagination">{renderagesNumbers}</ul>
    {pageIncrementBtn}
    <button className="pagination__button" onClick={handleNextbtn} disabled={currentPage == pages[pages.length - 1] ? true : false}>Next</button>
        </div>
        {/* отрисовка покемонов */}
        {renderPokemon(currentItems)}

    </>
)
}

export default Card;
