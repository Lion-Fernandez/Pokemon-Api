const { Router } = require('express');
const axios = require ('axios');
const {Pokemon, Tipo, pokemon_tipo} = require ("../db.js");
const {Op} = require ("sequelize");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.use('/auth', authRouter);

//me traigo todo la info de la pokemonApi:



const apiDataPoke = async () => {
    // const pokeNum = 18;
    const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon');
    // console.log ("TRAE ESTO 🥕: ",data.results.slice(0, pokeNum));
    // const pokesInfo = await data.results.slice(0, pokeNum).map( async (e) => {
    const data2 = await axios.get(data.next);
    const all40 = await data.results.concat(data2.data.results);
    const pokesInfo = await all40.map( async (e) => {
        // console.log("🎁", e ,"🎁🎀");
        const {data} = await axios.get(e.url);
        return {
          id: data.id,
          nombre: data.name,
          vida: data.stats[0].base_stat,
          fuerza: data.stats[0].base_stat,
          defensa: data.stats[0].base_stat,
          velocidad: data.stats[0].base_stat,
          altura: data.height,
          peso: data.weight,
          img: data.sprites.other.dream_world.front_default,
          tipos: data.types.map(e => e.type.name)
        };
          
    });
     const pokesApi = await Promise.all(pokesInfo);
     return pokesApi;
};

//me traigo todo la info de mi pokeDb:
const pokeDbInfo = async ()=> {
    return await Pokemon.findAll({
        include:{
            model: Tipo,
            attributes: ['nombre'],
            through: {
                attributes: [],
            }
        }
    });
};

//uno la info de la api + mi pokeDb:
const allPoke = async ()=> {
    const apiInfo = await apiDataPoke();
    const dbInfo = await pokeDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
};


// *******************************    
router.get('/pokemons', async (req,res)=>{
    const {name} = req.query;
    const fullPoke = await allPoke();
    if (name) {
        const pokeName = await fullPoke.filter(e => e.nombre == name);
        pokeName.length ?
        res.status(200).send(pokeName) :
        res.status(404).send ('Pokemon no encontrado') ;
    }else {
        res.status(200).send(fullPoke);
    }
})


router.get('/pokemons/:id', async(req, res) => {
    const {id} = req.params;

    const fullPoke = await allPoke();
    if (id) {
        const pokeId =  fullPoke.filter(poke => poke.id == id);
        pokeId.length ?
        res.status(200).send(pokeId) :
        res.status(404).send ('Pokemon no encontrado') ;
    
    }else {
        res.status(200).send(fullPoke);
    }
});

/*
    const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    if(id) {
      try {
           if(id.length > 10) {
                const idPokeDb = await Pokemon.findOne({
                    where: {
                       id: id
                    },
                    include: [{
                       model: Tipo,
                       through: pokemon_tipo
                    }]
                })
               console.log(idPokeDb)
               const all = idPokeDb.dataValues
               return res.status(200).send(all) 
            }
            for(let i = 0; i < data.length; i++) {
               const info = {
                  id: data[i].id,
                  nombre: data[i].name,
                  vida: data[i].stats[0].base_stat,
                  fuerza: data[i].stats[0].base_stat,
                  defensa: data[i].stats[0].base_stat,
                  velocidad: data[i].stats[0].base_stat,
                  altura: data[i].height,
                  peso: data[i].weight,
                  img: data[i].sprites.other.dream_world.front_default,
                  tipos: data[i].types,
                };
       
            console.log(info);
            return res.status(200).send(info)
            }
        } catch (err) {
            console.log(err)
        }
        
    } else {
        res.status(404).send("No hay personaje")
    }
 
})

*/

router.get('/types', async (req, res) => {
    const {data} = await axios.get('https://pokeapi.co/api/v2/type')
    const dbTipos = data.results.map(d => d.name)
    dbTipos.forEach(t => {
        Tipo.findOrCreate({
            where: {
                nombre: t
            }
        })
    })
    const allTipos = await Tipo.findAll();
    return res.status(200).send(allTipos)
})

router.post('/pokemon', async(req, res) => {
    let {
        nombre,
        vida,
        fuerza,
        defensa,
        velocidad,
        altura,
        peso,
        img,
        propios,
        tipos
    } = req.body

    const createdPokemon = await Pokemon.create({
        nombre,
        vida,
        fuerza,
        defensa,
        velocidad,
        altura,
        peso,
        img,
        propios
    })

    const createdDb = await Tipo.findAll({
        where: {
            nombre: tipos
        }
    })
    createdPokemon.addTipo(createdDb)
    return res.status(200).send('Personaje creado con exito')
});


// +++++++++++++++++                 ++++++++++++++++++++++++++++++
/*

  const pokeNumeros = 40;
  const PokePorId = async(id) => {
      const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const e = apiUrl.data;
      const apiPokeData = {
          id: e.id,
          nombre: e.name,
          vida: e.stats[0].base_stat,
          fuerza: e.stats[0].base_stat,
          defensa: e.stats[0].base_stat,
          velocidad: e.stats[0].base_stat,
          altura: e.height,
          peso: e.weight,
          img: e.sprites.other.dream_world.front_default,
          tipos: e.types.map(e => e.type.name)
      };      
      return apiPokeData;
  };
  
  const allPokePorId = async () => {
    const arrPoke = [];
    let i = 1;
    while ( i<= pokeNumeros) {
      i++;
      arrPoke.push(await PokePorId(i));
    }
    return arrPoke
  };
  
  //me traigo todo la info de mi pokeDb:
  const DbInfo = async ()=> {
      return await Pokemon.findAll({
          include:{
              model: Tipo,
              attributes: ['nombre'],
              through: {
                  attributes: [],
              }
          }
      });
  };
  
  //uno la info de la api + mi pokeDb:
  const todoPoke = async ()=> {
      const apiInfo = await allPokePorId();
      const dbInfo = await DbInfo();
      const allInfo = apiInfo.concat(dbInfo);
      return allInfo;
  };
  
  
  router.get('/poke', async (req,res)=>{
      const {name} = req.query;
      const fullPoke = await todoPoke();
      if (name) {
          const pokeName = await fullPoke.filter(e => e.nombre == name);
          pokeName.length ?
          res.status(200).send(pokeName) :
          res.status(404).send ('Pokemon no encontrado') ;
      }else {
          res.status(200).send(fullPoke);
      }
  })
*/

module.exports = router;
