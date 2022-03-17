import React from 'react';
import { useState, useEffect } from 'react';
// import { useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { pokeDetail } from '../../actions';
import detailsCss from './PokeDetails.module.css';




export default function PokeDetail(props){
    // console.log(props);

   
    const dispatch = useDispatch();
    const allDetail= useSelector(state=>state.details);
    const {id} = props.match.params;
    console.log("🎄", allDetail);

    useEffect(()=>{
      dispatch(pokeDetail(id));
      // console.log("🎃" , allDetail);
    //   setLoading(true);
    }, [id, dispatch]);



    return (  

  
      <div className={detailsCss.di}>
        <div className={detailsCss.cntt}>    
            <div>
                <img src={allDetail[0].img} alt= "imagen no disponible" with= '200px' height= 'auto'/>
            </div>     
            <div>
                <h2>{allDetail[0].nombre}</h2>
            </div>
            <div className={detailsCss.infoCntt} > 
                <h3> vida: {allDetail[0].vida} </h3>  
                <h3> fuerza: {allDetail[0].fuerza} </h3>  
                <h3> defensa: {allDetail[0].defensa} </h3>  
                <h3> velocidad: {allDetail[0].velocidad} </h3>  
                <h3> altura: {allDetail[0].altura} </h3>  
                <h3> peso: {allDetail[0].peso} </h3>
                <h3> Tipos: {!allDetail[0].propios? allDetail[0].tipos + " " : allDetail[0].tipos.map(t=> t.nombre + (" "))} </h3>
            </div>
            <Link to= '/pokemons'>
               <button>Volver</button>
            </Link>
        </div> 
     </div> 
 
    );
}
