const pokeNum = 5;
const pokeApiInfo = async ()=> {
    const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon');
    // console.log ("TRAE ESTO 🥕: ",data.results.slice(0, pokeNum));
    const apiPokeData = await data.results.slice(0, pokeNum).map(async (e) => {
console.log(e);
debugger;
        const {data} = await axios.get(e.url);
        return { 
            nombre: data.name,
            vida: data.stats[0].base_stat ,
            fuerza: data.stats[1].base_stat ,
            defensa: data.stats[2].base_stat,
            velocidad: data.stats[5].base_stat,
            altura: data.height,
            peso: data.weight,
            img: data.sprites.other.dream_world.front_default,
            tipo: data.types.map(e=> e.type.name)
        };         
    });
   const info = await Promise.all ([data, apiPokeData]);
   console.log ("YY ESTO 😱: ",apiPokeData)
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

// +++++++++++++++++++++++++++++++++++++++++++++++

const pokeNum = 5;
const pokeApiInfo = async ()=> {
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon');
    console.log ("TRAE ESTO: ");
    const apiPokeData = await apiUrl.data.results.slice(0, pokeNum).map(e => {
        // const urlPoke = axios.get(e.url);
        return {
          nombre: e.name,
        //   altura: axios.get(e.url).data.height,
          url: e.url,


        };          
    })
return apiPokeData;
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

//  **********************************************
const pokeNumeros = 40;

function fetchPokemonId(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then (res => res.json())
    .then (data =>{
        return {
            nombre: data.name,
            vida: data.stats[0].base_stat ,
            fuerza: data.stats[1].base_stat ,
            defensa: data.stats[2].base_stat,
            velocidad: data.stats[5].base_stat,
            altura: data.height,
            peso: data.weight,
            img: data.sprites.other.dream_world.front_default,
            tipo: data.types.map(e=> e.type.name)
        };      
    })
    // .then (data=> console.log(data));

}
const fetchAllPoke = () => {
  for (let i =1; i<= pokeNumeros; i++) {
    fetchPokemonId(i);
  }
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

// *********************

const PokePorId = async(id) => {
    const apiUrl = await axios.get (`https://pokeapi.co/api/v2/pokemon/${id}`)
    const apiPokeData = await apiUrl.data.map(e => {
        return {
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
    })
return  apiPokeData;
}

const allPokePorId = () => {
  for (let i =1; i<= pokeNumeros; i++) {
    PokePorId(i);
  }
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

// ++++++++++++++++++++++++++++++++++++++++++++++

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};



// **********************************



const pokeNumeros = 40;
const arrPoke = [];

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
  while ( i<= pokeNumeros) {
    i++;
     arrPoke.push(await PokePorId(i));
  }
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