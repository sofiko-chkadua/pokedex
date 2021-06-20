import './App.css';
// import Navbar from './components/Navbar/Navbar'
// import Cards from './components/Cards/Cards'
import Card from './components/Card/Card'
import Catchedcards from './components/Catchedcards/Catchedcards'

import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom"
// import { useEffect, useState } from 'react';

function App(props) {


  return (
    <>

      <Router>
        <nav className="navbar">
          <ul className="navbar__list">
            <li className="navbar__item"><NavLink className="navbar__link" to="/">All pokemons</NavLink></li>
            <li className="navbar__item"><NavLink className="navbar__link" to="/Catchedcards">Catched pokemons</NavLink></li>
          </ul>
        </nav>
        <Switch>
          <Route exaxt path="/Catchedcards" render={() => <Catchedcards />}></Route>
          <Route exaxt path="/" render={() => <Card />}></Route>
        </Switch>
      </Router>
    </>
  );

}

export default App;
