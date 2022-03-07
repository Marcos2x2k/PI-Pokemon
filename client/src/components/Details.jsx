import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// ¿Qué hace el Usedispatch?
// useDispatch hook: El otro hook que proporciona la librería React Redux es useDispatch el cual devuelve una función 
//que podremos emplear para enviar acciones a la store de Redux.
import { getDetailPokemons } from "../actions/index";
import { Link } from "react-router-dom";

import './styles/Card.css';

function Details(){
    // trae del Reducer-index-> CASE (GET_DETAILS_DOG) gamesDetail
    const allDetails = useSelector((state) => state.pokemonsDetails);
    //console.log(allDetails) 
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getDetailPokemons(id));
      },[dispatch,id])

      console.log(allDetails)
    return (
        <div>
            {allDetails.length > 0 ? (
            <div>
                <br /><br />
                <Link to='/home'><button>REGRESAR AL HOME</button></Link>
                <br /><br /><br />

                <h1 class="heading">{allDetails[0].name}</h1>
                <img className="card" src={allDetails[0].image} alt="img not found"/>
                    {/* //fecha lanzamiento = released */}
                    <h3 class="heading"> FUERZA: {allDetails[0].hp}</h3> 
                    <h3 class="heading"> ATAQUE: {allDetails[0].attack}</h3>
                    <h3 class="heading">DEFENSA: {allDetails[0].defense
                        ? allDetails[0].defense
                        : "NO POSEE DESCRIPCION"}</h3>
                    <h3 class="heading">TIPOS: {allDetails[0].types}</h3> 
                    <h3 class="heading"> VELOCIDAD: {allDetails[0].speed}</h3> 

                    {/* ? allDetails[0].types.map((p) => p.name + ", ")
                        : allDetails[0].types.map((p) => p.name + ", ") */}
                    {/* <h3 class="heading">VELOCIDAD: {Array.isArray(allDetails[0].speed)
                        ? allDetails[0].speed.map((p) =>p.speed.name + ", LADRON ")
                        : "Pc"}                        */}
                                             {/* // "Action"} */}
                        {/* allDetails[0].platform.map((p) => p.name + ", ROBO ")                  */}
                    
                    {/* <h3 class="heading">PLATAFORMAS: {allDetails[0].platforms
                        ? allDetails[0].platform.map((p) => p + ", ")
                        : allDetails[0].platforms.map((p) => p + ", ")}</h3>  */}
                    {/* <h3>{allDetails[0].genre
                    ? allDetails[0].genre
                    : allDetails[0].genres?.map((p) => p.name + " ")}
                    </h3> */}
                    {/* <h3>{allDetails[0].platform
                        ? allDetails[0].platform
                        : allDetails[0].platforms?.map((p) => p.name + " ")}
                    </h3>               */}
            </div>
            ) : (
                <div>
                    <h1>CARGANDO...</h1>                  
                </div>
              )}
        </div>
    )
} 

export default Details;
