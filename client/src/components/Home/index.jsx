import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemons, filterByType, getTypes, filterCreated, orderByName, orderByPower } from '../../actions';
import { Link } from 'react-router-dom';
import PokeCard from '../PokeCard';
import Paged from '../Paged';
import SearchBar from '../SearchBar';
import HomeCss from'./Home.module.css';


export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state)=> state.pokemons);
    const allTypes = useSelector((state)=> state.tipos)
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pokePerPage, setPokePerPage] = useState(9);
    const [order, setOrder] = useState('')

    const viewLastPoke = currentPage * pokePerPage;
    const viewFirstPoke = viewLastPoke - pokePerPage ;
    const currentPoke = allPokemons.slice(viewFirstPoke, viewLastPoke)
    
    const paged = (PageNumber)=> {
      setCurrentPage(PageNumber)
    }

    useEffect (()=>{
        dispatch(getPokemons());
    },[dispatch])

    useEffect (()=>{
        dispatch(getTypes())
    },[])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemons());
    };
    function handleFilterType(e) {
      e.preventDefault();
      dispatch(getTypes());
      dispatch(filterByType(e.target.value))
    };
    function handleFilterCreate(e) {
      dispatch(filterCreated(e.target.value))
    };
    function handleOrderByName(e) {
      e.preventDefault();
      dispatch(orderByName(e.target.value))
      setCurrentPage(1);
      setOrder(`Ordenado ${e.target.value}`)
    };
    function handleOrderByPower(e) {
      e.preventDefault();
      dispatch(orderByPower(e.target.value))
      setCurrentPage(1);
      setOrder(`Ordenado ${e.target.value}`)
    };
    
    return (
      <div>
        
          <div className={HomeCss.cnt} > 
         
            <div className={HomeCss.right} >
              <Link to= '/pokemon'><button className={HomeCss.btn}>Crear Pokemon</button> </Link>
              <button className={HomeCss.btn} onClick= {(e)=>{handleClick(e)}}> Recargar Pokemons </button>
            </div>
              <div>
               <SearchBar/>
              </div>
              <div className={HomeCss.right}>
              <select onChange={e=>handleFilterType(e)}> 
                  <option value ='all'> todos </option>
                  {
                    allTypes.map(t => ( <option value={t.nombre}> {t.nombre}  </option>))
                  }
              </select>
              <select onChange= {e=>handleFilterCreate(e)}>
                  <option value ='all'> Todos </option>
                  <option value ='exists'> Existente </option>
                  <option value ='created'> Creado </option>
              </select>
                  <label>Alfabetico</label>
              <select onChange= {e=>handleOrderByName(e)}>
                  <option value ='asc'> A - Z </option>
                  <option value ='desc'> Z - A </option>
              </select>
                  <label>Fuerza</label>
              <select onChange= {e=>handleOrderByPower(e)}>
                  <option value ='max'> maximo </option>
                  <option value ='min'> minimo </option>
              </select>
              </div>
          </div>
          
          {/* <div className="loader">
          </div> */}

          { allPokemons.length>1? <Paged pokePerPage= {pokePerPage} allPokemons={allPokemons.length} paged={paged} />:
          null }
          
          {/* <div className="cards" > */}
          <div className={HomeCss.cards}>
            {
             currentPoke?.map(p =>{
               return (
                 <div>
                   <Link to= {'/pokeDetail/'+p.id} >
                     <PokeCard 
                       nombre={p.nombre}
                       imagen={p.img? p.img: <img src= "https://vader.news/__export/1588965166057/sites/gadgets/img/2020/05/08/2-25193_pokemon-ball-transparent-background-transparent-background-pokeball-png.png_423682103.png" alt= "inmagen no disponible"/>} 
                       // tipos={p.tipos} 
                       tipos={!p.propios? p.tipos: p.tipos.map(t=> t.nombre)}
                       key={p.id}/>
                   </Link>
                 </div>
               )
             })
            }
          </div>
           
        </div>
    );
   
}   