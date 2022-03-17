    import React, { Fragment } from "react";
    import PBarCss from "./PBar.module.css";

    export default function ProgresBar() {
        let power = 250;
        let maxPower = 300; 
        let porcent = (power/maxPower)*100 + "%" ;
        let col = "blue";

       return(
        <div>
            <div className={`${PBarCss.progressbar} ${PBarCss.blue} ${PBarCss.stripes} ${PBarCss.shine}`}>
               <span style={{width: porcent}}></span>
            </div>
            <div className={`${PBarCss.progressbar} ${PBarCss.stripes} ${PBarCss.shine}`} >
               <span style={{backgroundColor: col, width: "20%"}}></span>
            </div>
            <div className={`${PBarCss.progressbar} ${PBarCss.stripes} ${PBarCss.shine}`} >
               <span style={{width: "50%", backgroundColor:"#eb1111"}}></span>
            </div>
        </div>
       ) 
    }