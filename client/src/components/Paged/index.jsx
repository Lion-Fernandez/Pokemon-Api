import React from "react";
import PagedCss from "./Paged.module.css";


function Paged ({pokePerPage, allPokemons, paged}) {
    const pageNumber = [];
    let i = 0;
    let rest= allPokemons  ;
    while (rest>0) {
      rest -= pokePerPage;
      i++;
      pageNumber.push(i);
    }
    return (
      <div className={PagedCss.nav}>
        
            <div className={PagedCss.paginacion}>
              { pageNumber?.map(num => { 
                  return(     
                
                      <button  key={num} onClick = {()=>paged(num)}>{num}</button>
                
                )})
              }
            </div>
        
      </div>
    )
};

export default Paged ;