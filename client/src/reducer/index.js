// ** ACÁ EN REDUCER CREO MI ESTADO INICIAL - 
// ** Y HAGO LA LOGICA DE MIS FILTRADOS
const initialState = {
    pokemons : [],    
    allPokemons:[],
    types:[],
    hps:[],
    pokemonsDetails: [],
    pokesDelete: [],
}

export default function rootReducer(state =  initialState, action){ //action.payload llega las opciones del select
    switch(action.type){
        
        case 'GET_POKEMONS':
            return{
                ...state, // guardamos el estado anterior como buena practica
                pokemons: action.payload,  
                //Asi creamos en JSON - var json = await axios.get("http://localhost:3001/dogs",{});
                // el payload lo creamos en actions como payload: json.data
                allPokemons: action.payload
            }      
        case 'GET_NAME_POKEMONS':
            return{
                ...state,
                pokemons: action.payload
            }      
        case 'GET_TYPES':            
            return{
                ...state,                
                types: action.payload
            }  
        case 'GET_HPS':            
            return{
                ...state,                
                hps: action.payload
            } 
        case 'FILTER_POKEMONS_BY_TYPES':
            // const allStatePokemons = state.pokemons
            // const tempPokemons = allStatePokemons.filter(p => {
            //     if(p.type){ // info viene como [{name:..},{name:..},{name:..}]
            //         const types = p.type.map( p => p.name)
            //         return types.includes(action.payload)}
            //     if (p.type) { //info viene como string
            //         return p.type.includes(action.payload)
            //     }
            //     // return null
            // })           
            // return {
            //     ...state,
            //     pokemons: action.payload === 'sinFiltro' ? allStatePokemons : tempPokemons,
            //     // ? es entonces// : es sino // es un ternario
            // }
        case 'POST_POKEMONS'://No se declara en actions, se declara en el reducer. 
                          //en action solo se trae la ruta
                 return{
                    ...state
                 }
                
        case 'GET_DETAILS_POKEMONS':            
                return {
                    ...state,
                    pokemonsDetails: action.payload
                }

        case 'FILTER_CREATED':                
                // uso ternario
                const allPokemonApiDB = state.allPokemons
                const createFilter = action.payload === 'created' ? allPokemonApiDB.filter(p => p.createInDb) : state.allPokemons.filter(p => !p.createInDb)
                return{
                   ...state,
                   pokemons: action.payload === 'all' ? allPokemonApiDB : createFilter
                }
                // const createGames = action.payload === 'created' ? allGames : allGames.filter(p => p.status.createInDb) : state.allGames.filter(p => !p.status.createInDb)
                // return{
                //    ...state,
                //    games: createGames 
                // }
        case 'ORDER_BY_NAME':
                let sortedArr = action.payload === 'asc' ?
                state.pokemons.sort(function(a,b){
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.pokemons.sort(function(a,b){
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (a.name < b.name) {
                        return 1;
                    }
                    return 0;
                })        
                
                return{
                   ...state,
                   pokemons: sortedArr // paso al estado el ordenamiento
            }            
        default:
                return state;
        }
    }