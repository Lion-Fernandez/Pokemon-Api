
const todos = 40;
const xPagina = 9;
let i = 0;
let rest= todos;
const paginas = [];
function paginar(){  
   rest = rest - xPagina;
   if (rest>0) {
   i++;
   paginas.push(i);
   paginar()
   }else {
    i++;
    paginas.push(i);
    return paginas
   } ;
}
paginar();
console.log(paginas)

//++++++++++++++++++++++++++++++
const todos = 40;
const xPagina = 9;
let i = 0; 
let rest= todos;
const paginas = [];
function paginar(){ 
  while (rest>0) {
    rest -= xPagina;
    i++;
    paginas.push(i);
  }
}
paginar();
console.log(paginas)

// ruta a gif: .sprites.generation-v.black-white.animated.front_shiny_female