import React, { useState } from "react" ;
import { useDispatch } from "react-redux";
import { getByName } from "../../actions";
import SearchCss from "./SearchBar.module.css";
import LogoPokemon from '../../img/LogoPokemonBlack.png';
import { Link } from 'react-router-dom';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInput = (e)=>{
   e.preventDefault();
   setName(e.target.value);
   console.log(name)
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(getByName(name));
    setName("") 
  }

  return(

    <div className={SearchCss.cnt}>
      <div className={SearchCss.logo}>
        <Link to= '/pokemons'>  <img  src={LogoPokemon} height= "100px" alt= "logo no disponible"/> </Link>
      </div>
      <div>  
          <input 
          type="text"
          value={name} 
          placeholder="Buscar por nombre o ID..." 
          onChange= {e => handleInput(e)}
          />
          <button className={SearchCss.btn} type="submit" onClick= {e=> handleSubmit(e)}>Buscar</button>
      </div>
    </div>
  );
    // <div> 
    //   <form onSubmit={(e) => {
    //         e.preventDefault();
    //         dispatch(getByName(name));
    //         setName("");
    //         //history.push("/");
    //       }}>
    //         <input
    //           type="text"
    //           placeholder="Buscar por nombre o ID..."
    //           value={name}
    //           onChange={e => setName(e.target.value)}
    //         />
    //          <input type="submit" value="Buscar" />
    //   </form>
    // </div>


      
};
