import React from 'react';
// import { useHistory } from 'react-router';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {postPokemon, getTypes } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import {useState,useEffect} from 'react';

import './styles/PokeCreate.css';
//import Button from '@material-ui/core/Button';

export default function PokeCreate (){ 
    // const history = useHistory();
    const dispatch = useDispatch();    
    const navigate = useNavigate();
    //useNavigate es un nuevo enlace introducido en React Router v6 y es extremadamente útil y fácil de usar.
    // Usos: Ir a las páginas anteriores o siguientes, Redirigir al usuario a una URL específica
    const types = useSelector(state => state.types)  // Estado Global de los Types  

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch]) 

    const [input, setInput] = useState({
        name:"",      
        hp:"",         
        attack:"",        
        defense:"",
        speed:"",
        height:"",
        weight:"",
        image:"",
        type:[],          
    })

    const [errors, setErrors] = useState({});

    //------------- PARTE DE VALIDACIONES ---------------

    function validate(input){
        let errors ={};
        if (!input.name) {
            errors.name = 'Requiere Nombre de Pokemon';
        }else if (!input.hp) {
            errors.hp = 'Requiere Fuerza'        
        }else if (!input.attack) {
        errors.attack = 'Requiere Ataque'        
        }else if (!input.defense) {
        errors.defense = 'Requiere Defensa'
        }else if (!input.speed) {
        errors.speed = 'Requiere Velocidad'
            }
        return errors;
    };

    //------------- PARTE DE HANDLES ---------------------

    function handleChange(p) { // va a  ir modificando cuando cambien los input
        setInput({
            ...input,
            [p.target.name] : p.target.value
        })
        setErrors(validate({
            ...input,
            [p.target.hp] : p.target.value
        }))
        console.log(input)
    }
    // function handleCheck(p) {
    //     if (p.target.checked){  //checket es un booleano q indica true o false
    //         setInput({
    //             ...input,
    //             status: p.target.value
    //         })
    //     }
    // }
    // const handleOnChange = (p) => {
    //     //seteo el input
    //     setInput({
    //         ...input,
    //         [p.target.name]: p.target.value //p.target.name SETEA A target.value
    //     })
    // }   

    //////// GENEROS //////// handleSelect y handleDelete
    // const handleSelect = (p) => {
    //     const select = input.genre.find(p => p === p.target.value)
    //     if(select) return
    //     setInput({
    //         ...input,
    //         genre: [...input.genre, p.target.value]
    //     })
    // }
    function handleSelect(p){
        setInput({
        ...input,
        type:[...input.type, p.target.value] //para el array de Generos q concatene las selecciones
        })
    }
    function handleDelete(p){
        setInput({
            ...input,
            // va guardando en el arreglo todo lo que voy eligiendo de generos linea 42
            type: input.type.filter (occ => occ !== p)
        })
    }  
    function handleSubmit(p) {
        p.preventDefault();
        //console.log(p)
        setErrors(validate({
            ...input,
            [p.target.name]:p.target.value
        }));        
        dispatch(postPokemon(input)); // input es el payload
        alert ("POKEMON Creado!!!")
        setInput({ // seteo el input a cero
            name:"",      
            hp:"",         
            attack:"",        
            defense:"",
            speed:"",
            height:"",
            weight:"",
            image:"",
            type:[],   
        })
        // history.push('/home')
        navigate('/home');
    } 
    
//-------------------------------------------------------------------------------------------


    return(
        <div>
        <div>                        
            <div className="padre">
                <h1 className="colorLetrasBienvenido">** Crear Nuevo Pokemon **</h1>
            </div>
        </div>   
            <div>            
            {/* <Button  variant="contained" color="secondary" href="/">
                    Ir a Pagina de Lanzamiento
            </Button> 
            <Button  variant="contained" color="primary" href="/Home">
                    Ir a Pagina Home
            </Button>  */}
            <br/>
            <Link to= '/'><button>Ir a Pagina de Lanzamiento</button></Link> 
            <Link to= '/home'><button>Ir a Pagina Home</button></Link> 
            {/* <Button  variant="contained" color="secondary" onClick={p => {handleClick(p)}}>
                    ACEPTAR Y CREAR
            </Button> */}
            </div>  
            <br/><br/><br/> 
        <form onSubmit={(p) => handleSubmit(p)} >
                <div>
                    <div>
                        <label className="hijo">Nombre Pokemon:</label>
                        <input
                        type="text"                    
                        name="name"
                        value= {input.name}
                        onChange={(p)=>handleChange(p)}
                        autoComplete="off"
                        />
                        {errors.name && (<p className='hijoAmarillo'>{errors.name}</p>
                        )}   
                    </div>             
                <br/>
                    <div>
                        <label className="hijo">Fuerza:</label>
                        <input
                        type="text"
                        value= {input.hp}
                        name="Fuerza"
                        onChange={(p)=>handleChange(p)}
                        />
                        {errors.hp && (
                            <h2 className='hijoAmarillo'>{errors.hp}</h2>
                        )}
                    </div>                
                <br/>
                    <div>
                        <label className="hijo">Ataque:</label>
                        <input
                        type="text"
                        value= {input.attack}
                        name="Ataque"
                        onChange={(p)=>handleChange(p)}
                        />
                        {errors.attack && (<p className='hijoAmarillo'>{errors.attack}</p>
                        )}
                    </div>
                <br/>
                    <div>
                        <label className="hijo">Defensa:</label>
                        <input
                        type="text"
                        value= {input.defense}
                        name="Defensa"
                        onChange={(p)=>handleChange(p)}
                        />
                        {errors.defense && (<p className='hijoAmarillo'>{errors.defense}</p>
                        )}
                    </div>                 
                <br/>
                    <div>
                        <label className="hijo">Velocidad:</label>
                        <input 
                        type="text"
                        value= {input.speed}
                        name="Velocidad"
                        onChange={(p)=>handleChange(p)}
                        />  
                        {errors.speed && (<p className='hijoAmarillo'>{errors.speed}</p>
                        )}
                    </div>                   
                <br/><br/>                
                    <label className="hijo">Imagen:</label>
                    <input
                    type="text"
                    value= {input.image}
                    name="Imagen"
                    onChange={(p)=>handleChange(p)}
                    />                 
                    <br/> <br/>
                    <div>
                    <label className="hijo">Tipo de Pokemon:</label>
                    <select onChange={(p)=>handleSelect(p)}>                    
                    {/* <option value="">--Seleccione Genero--</option> */}
                        {types?.map((gen) => {
                        return (
                            <option key={gen.id} value={gen.name}>
                                {gen.name}
                            </option>
                        );
                    })}                    
                    </select>
                    <div>                    
                    {input.type.map(el => 
                    <div> 
                        <h3 className="hijoRojo">{el}</h3>
                    <button onClick={() => {handleDelete(el)}}>-Borrar-</button>
                    </div>
                    )}
                    </div>
                    </div>                       
                </div>
                <br/><br/><br/>                
                <button type='submit'>Crear Nuevo Pokemon</button> 
            </form> 
        </div>            
    )}