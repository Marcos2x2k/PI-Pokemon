const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const router = express.Router(); //mio

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use(express.json())
const axios = require('axios'); // convierte a json por si solo

// aca defino models y me los traigo de la BD
const { Pokemon, Type } = require('../db.js'); //importo los modelos conectados
//const {API_KEY} = process.env;

const getApiInfo = async () =>{
    try{
        const PokemonPageOne = (await axios.get("https://pokeapi.co/api/v2/pokemon")).data.results;
        const InformationOne = PokemonPageOne.map(el => axios.get(el.url));
        const PokemonPageTwo = (await axios.get("https://pokeapi.co/api/v2/pokemon")).data;
        const totalPage = await axios.get(PokemonPageTwo.next);
        const nextPage = totalPage.data.results;
        const InformationTwo = nextPage.map(p => axios.get(p.url));
        let InfoTotal = InformationOne.concat(InformationTwo);        
        const apiHtml = await Promise.all(InfoTotal);
        //console.log('INFORMACION TOTAL *********', myObject)
            const apiInfo = apiHtml.map(p => {
                return {                    
                    id: p.data.id,
                    name: p.data.name,
                    types: p.data.types[0].type.name,
                    hp: p.data.stats[0].base_stat,                  
                    attack: p.data.stats[1].base_stat,
                    defense: p.data.stats[2].base_stat,
                    speed: p.data.stats[5].base_stat,
                    height: p.data.height,
                    weight: p.data.weight,
                    image: p.data.sprites.front_shiny,
               }
           });             
    return apiInfo;
    }
    catch (error){
        console.log(error);
    }
}

const getDbInfo = async () =>{
        const infoDb = await Pokemon.findAll({
            include:{
                model: Type,
                atributes: ['name'],
                through:{
                    attributes:[],
                }
            }
        })
        return infoDb    
}

 const getAllPokemon = async () =>{
     try{
         const apiInfo = await getApiInfo();
         const infoDb = await  getDbInfo();
         const infoTotal = apiInfo.concat(infoDb)
         return infoTotal;
     }
     catch (error){
        console.log(error)
     }
}
// Únicos Endpoints/Flags que pueden utilizar
// GET https://pokeapi.co/api/v2/pokemon
// GET https://pokeapi.co/api/v2/pokemon/{id}
// GET https://pokeapi.co/api/v2/pokemon/{name}
// GET https://pokeapi.co/api/v2/type

// router.get('/pokemonsApi')


router.get('/pokemons', async (req, res, next) => {
    const name = req.query.name;
    const pokemonsAll =  await getAllPokemon();
    if (name){
        const pokemonName = await pokemonsAll.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
        pokemonName.length?
            res.status(200).send(pokemonName) :
            res.status(200).send('No Existe el Pokemon buscado')
    }else{
        res.status(200).send(pokemonsAll)
    }
})

// router.get('/pokemons/:id', async (req, res, next) => {
//     return {        
//     }
// })

// router.get('/types', async (req, res, next) =>{
//     return{        
//     }
// })

// router.post('/newPokemons', async (req, res, next) => {
//     return{        
//     }
// })





module.exports = router;
