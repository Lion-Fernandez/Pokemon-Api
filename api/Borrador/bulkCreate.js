const pokeNumeros = 40;

const PokePorId = async(id) => {
    const apiUrl = await axios.get (`https://pokeapi.co/api/v2/pokemon/${id}`);
    const e = apiUrl.data;
    const apiPokeData = {
            nombre: e.name,
            vida: e.stats[0].base_stat ,
            fuerza: e.stats[1].base_stat ,
            defensa: e.stats[2].base_stat,
            velocidad: e.stats[5].base_stat,
            altura: e.height,
            peso: e.weight,
            img: e.sprites.other.dream_world.front_default,
            tipo: e.types.map(e=> e.type.name)
        };      
    return apiPokeData;
}

const allPokePorId = async () => {
  const arrPoke = [];
  let i = 1;
  while ( i<= pokeNumeros) {
    i++;
    arrPoke.push(await PokePorId(i));
  }
  return arrPoke
};


//uno la info de la api + mi pokeDb:
 
router.get('/pokemons', async (req,res)=>{
    const name = req.query.name;
    let pokeApi = await allPokePorId();

    try {
        let dentro = await Pokemon.findAll();
        if(!dentro.length) await Pokemon.bulkCreate(pokeApi)
    } catch (error){
        console.log(error)
    }
    if (name) {
        try{
            let poke = await Pokemon.findAll({
                where: {
                    nombre:{
                        [Op.iLike]: name
                    }
                }
            });
        return res.json(poke)
        } catch (error) {
            console.log(error)
        }
    } else
});