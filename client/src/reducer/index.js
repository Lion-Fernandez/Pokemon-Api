import { GET_POKEMONS } from "../actions";
import { FILTER_BY_TYPE } from "../actions";
import { GET_TYPES } from "../actions";
import { FILTER_CREATED } from "../actions";
import { ORDER_BY_NAME } from "../actions";
import { GET_BY_NAME } from "../actions";
import { POST_POK } from "../actions";
import { POKE_DETAIL } from "../actions";
import { ORDER_BY_POWER } from "../actions";


const initialState = {
    pokemons: [],
    allPokemons: [],
    tipos: [],
    created: [],
    details: [],
} ;

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case GET_POKEMONS:
            return{
              ...state,
              pokemons: action.payload,
              allPokemons: action.payload
            }
        case POKE_DETAIL:
            return {
              ...state,
              details: action.payload
                } 
        case GET_TYPES:
            return{
              ...state,
              tipos: action.payload,
            }
        case FILTER_BY_TYPE:
            const allPoke = state.allPokemons;
            // (p.tipos.filter(t => t === action.payload)).length > 0
            const filterTypes = action.payload === 'all'? allPoke : 
            allPoke.filter(p => (p.tipos.includes(action.payload)=== true));
            return{
              ...state,
              pokemons: filterTypes
            }
        case FILTER_CREATED:
            // const allPok = state.allPokemons;
            const filterCreated = action.payload === 'created'? state.allPokemons.filter(p => p.propios ):
            state.allPokemons.filter(p => !p.propios);
            
            return{
              ...state,
              pokemons: action.payload === 'all'? state.allPokemons : filterCreated
            }
        case ORDER_BY_NAME:
            const order = action.payload === 'asc' ? state.pokemons.sort(function(a, b) {
                if(a.nombre > b.nombre) {
                    return 1;
                }
                if(b.nombre > a.nombre) {
                    return -1;
                }
                return 0;
            }) :
            state.pokemons.sort(function(a, b) {
                if(a.nombre > b.nombre) {
                    return -1;
                }
                if(b.nombre > a.nombre) {
                    return 1;
                }
                return 0;
            });
            return {
              ...state,
              pokemons: order
            }
        case ORDER_BY_POWER:
            const power = action.payload === 'max' ? state.pokemons.sort(function(a, b) {
                if(a.fuerza > b.fuerza) {
                    return 1;
                }
                if(b.fuerza > a.fuerza) {
                    return -1;
                }
                return 0;
            }) :
            state.pokemons.sort(function(a, b) {
                if(a.fuerza > b.fuerza) {
                    return -1;
                }
                if(b.fuerza > a.fuerza) {
                    return 1;
                }
                return 0;
            });
            return {
              ...state,
              pokemons: power
            }
        case GET_BY_NAME:
            const poke = action.payload?action.payload :alert("Pokemon no encontrada");
            return {
              ...state,
              pokemons: poke
            }
        case POST_POK:
            return {
              ...state
            }
           

        default:
            return state
    }
};

export default rootReducer;