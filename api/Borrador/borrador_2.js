const { Router } = require('express');
const axios = require ('axios');
const {Pokemon, Tipo, pokemon_tipo}= require ("../db.js");
const {Op}= require ("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.use('/auth', authRouter);

//me traigo todo la info de la pokemonApi


const pokeNum = 5;
const pokeApiInfo = async ()=> {
    const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon');
    console.log ("TRAE ESTO: ");
    const apiPokeData = await data.results.slice(0, pokeNum).map(e => {
        const {data} = axios.get(e.url);
        return {
          nombre: e.name,
          altura: data.height,
          url: e.url,
        };          
    });
   const info = await promise.all ([data, apiPokeData]);
return info;
};

const pokeDbInfo = async ()=> {
    return await Pokemon.findAll({
        include:{
            model: Tipo,
            attributes: ['nombre'],
            through: {
                attributes: [],
            },
        }
    })
}
const allPoke = async ()=> {
    const apiInfo = await pokeApiInfo();
    const dbInfo = await pokeDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
}


router.get('/pokemons', async (req,res)=>{
    const name = req.query.name;
    let fullPoke = await allPoke();
    if (name) {
        let pokeName = await fullPoke.filter(e => e.name.includes.toLowerCase()(name.toLowerCase));
        pokeName.length ?
        res.status(200).send(pokeName) :
        res.status(404).send ('Pokemon no encontrado') ;
    }else {
        res.status(200).send(fullPoke);
    }
})

module.exports = router;