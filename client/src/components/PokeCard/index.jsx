import React from "react";
import PokeCardCss from "./PokeCard.module.css";


function PokeCard ({nombre, imagen, tipos}) {

    return (
       
        // <div className={PokeCardCss.allCnt}>
          <div className={PokeCardCss.cnt} > 
            <img src= {imagen} alt = 'imagen no encontrada' width="max-content" height="180"/>
            <div className={PokeCardCss.infoCnt}>
              <h1>{nombre}</h1>
              <h3> tipos:{tipos?.map(t=>("    "+ t +"    "))}</h3>
            </div>
          </div>
        // </div>
    )
}
export default PokeCard;