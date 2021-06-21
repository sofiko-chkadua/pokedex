import './App.css';
import Card from './components/Card/Card'
import Catchedcards from './components/Catchedcards/Catchedcards'
import PokemonPage from './components/PokemonPage/PokemonPage';


import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom"

function App(props) {


  return (
    <>


      {<Router>
        <nav className="navbar">
          <ul className="navbar__list">
            <li className="navbar__item"><NavLink className="navbar__link" to="/">All pokemons</NavLink></li>
            <li className="navbar__item"><NavLink className="navbar__link" to="/Catchedcards">Catched pokemons</NavLink></li>
          </ul>
        </nav>
        <Switch>
          <Route exaxt path="/Catchedcards" render={() => <Catchedcards />}></Route>
          <Route exaxt path="/" render={() => <Card />}></Route>

          {/* здесь ниже должен поидее был быть роутинг для стр отдельного покемона */}
          <Route exaxt path="/:name" render={() => <PokemonPage />}></Route>


        </Switch>
      </Router> }
    </>
  );

}

export default App;
