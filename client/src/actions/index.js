import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_TYPES = 'GET_TYPES';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_CREATED = 'FILTER_CREATED';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_POWER = 'ORDER_BY_POWER';
export const GET_BY_NAME = 'GET_BY_NAME';
export const POST_POK = 'POST_POKE';
export const POKE_DETAIL = 'POKE_DETAIL';

export function getPokemons(){
    return async function (dispatch) {
        const res = await axios.get ("http://localhost:3001/pokemons");
        return dispatch({
            type: GET_POKEMONS,
            payload: res.data
        })
    }
}

export function pokeDetail(id){
    return async function (dispatch){
        try{
            const js = await axios.get(`http://localhost:3001/pokemons/${id}`);
            return dispatch ({
                type: POKE_DETAIL,
                payload: js.data
            })
        }catch(err) {
            console.log(err)
        }
    }
}

export function getTypes(){
    return async function (dispatch) {
        const res = await axios.get ("http://localhost:3001/types");
        return dispatch({
            type: GET_TYPES,
            payload: res.data
        })
    }
}
export function filterByType(payload){
    console.log(payload);
    return {
        type: FILTER_BY_TYPE,
        payload
    }
}
export function filterCreated(payload){
    return {
        type: FILTER_CREATED,
        payload
    }
}
export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload 
    }
}
export function orderByPower(payload){
    return {
        type: ORDER_BY_POWER,
        payload 
    }
}

export function getByName(name){
    return async function(dispatch){
        try { 
            const ress= await axios.get (`http://localhost:3001/pokemons?name=${name}`);
            return dispatch ({
                type: GET_BY_NAME,
                payload: ress.data
                })
        } catch (err) {
          console.log(err)
        }
    }
}
export function postPoke(payload){
    return async function(dispatch){
        const json = await axios.post ("http://localhost:3001/pokemon", payload);
        return {
            type: POST_POK,
            json
        }
    }
}
