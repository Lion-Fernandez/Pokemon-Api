import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/index.jsx";
import Home from "./components/Home/index.jsx";
import PokeCreate from "./components/PokeCreate";
import PokeDetails from "./components/PokeDetails";
import LoadingSpinner from "./components/LoadingSpinner";
import ProgressBar from "./components/ProgressBar";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>         
            <Route exact path = '/' component= {Landing}/>
            <Route exact path = '/pokemons' component= {Home}/>
            <Route exact path = '/pokemon' component= {PokeCreate}/>
            <Route exact path='/pokeDetail/:id' component= {PokeDetails}/>
            <Route exact path='/spinner' component= {LoadingSpinner}/>
            <Route exact path='/PBar' component= {ProgressBar}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
 