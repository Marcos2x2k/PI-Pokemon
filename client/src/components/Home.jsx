import React from 'react';
import './styles/Home.css'; // importo los styles de mi Home.css
import Loading from "./Loading";
// import SearchBar from './SearchBar';

//IMPORTO PORQUE USAMOS HOOKS
import {useState, useEffect, Fragment} from 'react'; //  HOOK USAMOS useState es un hook (//)Fragment es como un div para envolver hijos div en app)
import {useDispatch, useSelector} from 'react-redux'; 
import {getPokemons, getListTypes, filterPokemonsByType, filterCreated, orderByName, OrderbyHp, setPage} from '../actions';//Siempre importo las acciones nuevas 

//LINK nos sirve para poder movernos por nuestra aplicación
//más fácilmente en lugar de tener que cambiar la URL manualmente en el navegador.
import {Link} from 'react-router-dom';

//ME IMPORTO EL COMPONENTE Card y renderizo en linea 
import Card from './Card';
import SearchBar from './SearchBar';
import Paginado from './Paginado';

export default function Home (){ 
    const { pokemons, name, page, order, type} = useSelector(state => state);    
    const dispatch = useDispatch(); // PARA USAR HOOKS
    const allPokemons = useSelector((state) => state.pokemons) //HOOKS es lo mismo q maps.state.props
    const [orden, setOrden] = useState(''); // es un estado local q arranca vacio para el Asc y Desc Order

    //CREO VARIOS ESTADOS LOCALES y lo seteo en 1- ACA CALCULO LAS CARD POR PAGINAS
    const [currentPage, setCurrentPage] = useState(1); //defino 2 stados 1 con pagina actual y otro q resetea pagina actual
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12); // seteo los pokemons por pagina, depues usar variable para mostrar por cantidad elegida    
    const indexOfLastPokemon = currentPage * pokemonsPerPage // aca vale 0 a 14 = 15
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage // 0

    // currentGames devuelve un arreglo q entra del 1 al 15
    // creo una constante de los Games en la pagina actual y me traigo el array del estado de los Games 
    const currentPokemons =  allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const types = useSelector((state) => state.types); //estado global de Typos
    const hps = useSelector((state) => state.hps); //estado global de Fuerzas
    

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    // ** TRAIGO DEL ESTADO LOS GENEROS CUANDO EL COMPONENTE SE MONTA
    useEffect (()=>{
        dispatch(getPokemons());
        dispatch(getListTypes()); 
        dispatch(OrderbyHp());                
    },[dispatch])

    // ** PARA RESETEAR AL TOCAR EL BOTON volver a cargar los Juegos
    function handleClick(p){
        p.preventDefault(); //PREVENTIVO PARA Q NO RECARGUE TODA LA PAGINA
        dispatch(getPokemons())}

    // ** ORDENAMIENTO DE PAGINA ASCENDENTE O DESCENDENTE
    function handleSort(p){
        p.preventDefault();
        dispatch(orderByName(p.target.value)) //despacho la accion
        setCurrentPage(1); //ordenamiento seteado en pagina 1
        setOrden(`Ordenado ${p.target.value}`)  //es un estado local vacio, lo uso para modif estado local y renderize
    }; 
    function handleSortHp(p){
        p.preventDefault();
        dispatch(OrderbyHp(p.target.value)) //despacho la accion
        setCurrentPage(1); //ordenamiento seteado en pagina 1
        setOrden(`Ordenado ${p.target.value}`)  //es un estado local vacio, lo uso para modif estado local y renderize
    }; 
    //Aca aplico lógica, esta funcion le paso en el select de Types 
    //En HOME -> ALL Generos/Plataformas ETC
    function handleFilterPokemonsByType(p){
        dispatch(filterPokemonsByType(p.target.value))
    };
    //filtramos los creados en la Bdatos
    function handleFilterCreated(p) {
        p.preventDefault();
        dispatch(filterCreated(p.target.value))
    };    
    // const handleClickPage = (page) => {
    //     dispatch(getGames({ page, name, order }));
    //     dispatch(setPage(page));
    // }
    // const totalPages = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    // };

// RENDERIZADOS
// Aca renderizamos un Div
    return(
        
    <div>        
        <div>             
            <div className="padre">
                <h1 className="colorLetrasBienvenido">** Bienvenidos a mi App de Pokemon **</h1>
            </div>
        <div>
            {/* <Button  variant="contained" color="primary" onClick={p => {handleClick(p)}}>
                Volver a Cargar todos los Juegos
            </Button>  
            <Button  variant="contained" color="secondary" href="/newGames">
                    CREAR JUEGO NUEVO
            </Button> 
            <Button  variant="contained" color="primary" href="/">
            Ir a Pagina de Lanzamiento
            </Button>    */}
            <Link to= '/'><button className="selectfont">IR A PAGINA DE LANZAMIENTO</button></Link> 
            {/* <Link to= '/home'><button className="selectfont">VOLVER A CARGAR JUEGOS</button></Link>  */}
            <button className="selectfont" onClick={p => {handleClick(p)}}>VOLVER A CARGAR POKEMON</button>
            <Link to= '/newPokemons'><button className="selectfont">CREAR NUEVO POKEMON</button></Link>                    
        </div>            
            
            <br />
        <SearchBar
        />  
        <div>                
        <div className="selectfont">
            <br />
            <select className="selectfont" onChange={p => handleSort(p)}>
                <option value="" selected disabled hidden>Por Orden alfabético</option>                
                <option value='asc'>Ascendente A-Z</option>
                <option value='desc'>Descendente Z-A</option>
            </select>            
                       
            <select className="selectfont" onChange={p => handleFilterCreated(p)}>                
                <option value="" selected disabled hidden>Mostrar Pokemons</option>
                <option value="all">Todos Los Pokemon</option>
                <option value="api">De la API</option>
                <option value="created">Creados</option>
                {/* <option value="api">Api</option> */}
            </select>   
            <select className="selectfont" onChange={p => handleSortHp(p)}>                
                <option value="" selected disabled hidden>Fuerzas</option>                
                <option value="rasd">Mayor Fuerza</option>
                <option value="rdes">Menor Fuerza</option>
                {/* <option value="api">Api</option> */}
            </select>   

            <select className="selectfont" onChange={p => handleFilterPokemonsByType(p)}>
                <option value="sinFiltro" selected disabled hidden>Tipos</option>               
                {types?.map((p) => {
                        return (
                            <option key={p.id} value={p.name}>
                                {p.name}
                            </option>
                        );
                    })}                    
                {/* <option value='games'>Por Plataforma</option> */}
            </select> 
            <br /><br /><br />
        </div>
        </div>
            {/* aca defino las props que necesita el paginado */}
            <Paginado
                    pokemonsPerPage = {pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    paginado = {paginado}                    
            />             
                {/* ACA NE TRAIGO LA CARD PARA RENDERIZAR con los datos que quiero */}
                
                <div>
                {currentPokemons.length > 0 ? (
                    currentPokemons.map((p) => {
                    return (
                        <Link
                                key={p.id}
                                to={`/pokemons/${p.id}`}                            
                                >
                                <Card
                                    name={p.name} 
                                    image={p.image ? p.image : p.image}
                                    type={p.type}
                                    hp={p.hp}  
                                    //types={p.types}
                                />                        
                        </Link>
                    );
                    })
                    ) : (
                    <div>
                        <Loading/>
                    </div>
                    )}
                    </div> 
                </div> 
    </div> )}      
    