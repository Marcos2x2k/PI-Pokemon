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
        const PokemonUno = (await axios.get("https://pokeapi.co/api/v2/pokemon")).data.results;
        const InformacionUno = PokemonUno.map(el => axios.get(el.url));
        const PokemonDos = (await axios.get("https://pokeapi.co/api/v2/pokemon")).data;
        const PokemonTotal = await axios.get(PokemonDos.next);
        const ProxPagina = PokemonTotal.data.results;
        const InformacionDos = ProxPagina.map(p => axios.get(p.url));
        let infoTotal = InformacionUno.concat(InformacionDos);        
        const apiHtml = await Promise.all(infoTotal);
        //console.log('INFORMACION TOTAL *********', myObject)
            const apiInfo = apiHtml.map(p => {
                return {                    
                    id: p.data.id,
                    name: p.data.name,
                    type: p.data.types[0].type.name,
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

router.get('/pokemons/:id', async (req, res, next) => {
    const id = req.params.id;
    var PokemonTotal = await getAllPokemon();
    if(id){
        const pokemonId = await PokemonTotal.filter((p) => p.id === id)
        console.log(pokemonId)
        pokemonId.length?
            res.status(200).send(pokemonId) :
            res.status(400).send(' NO EXISTE EL POKEMON BUSCADO')
    }
})


    router.get('/types', async (req, res) => {
        var apiHtml = await getAllPokemon();
        // ** para llamar por type 
        const type = apiHtml.map(p => p.type)
        console.log ('TRAIGO TYPE',type )
        const typeTotal = await type.filter(p => p.length > 0); // para verificar q no traiga nada vacio    
        //hago una eliminacion de los repetidos y los ordeno antes de meter a la bd
        const typenorepeat = [...new Set(typeTotal)].sort();
        //recorro todo buscando y me traigo los types de la base de datos busca o lo crea si no existe
        typenorepeat.forEach(p => { 
            if (p!==undefined) Type.findOrCreate({where:{name:p}})
        })  
        const allTypes = await Type.findAll();       
               
        res.send(allTypes);
        });


router.post('/newPokemons', async (req, res, next) => {
    /// ** traigo lo q me pide por Body ** 
    let{    
        id,   
        name,        
        type,        
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
        createInDb,
    } = req.body

    let pokemonsCreated = await Pokemon.create({ 
        id,
        name,        
        type,        
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
        createInDb,
    })

    let typesDb = await Type.findAll({
        where: { name: type }
    })
    pokemonsCreated.addTypes(typesDb)
    res.send('Nuevo Pokemon Creado')
    
})





module.exports = router;
