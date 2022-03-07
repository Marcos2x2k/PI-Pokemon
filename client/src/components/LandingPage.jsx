import React  from 'react';
import {Link} from 'react-router-dom';

// import Button from '@material-ui/core/Button'; //npm i @material-ui/core
import './styles/LandingPage.css'; // importo los styles de mi landinpage.css

export default function LandingPage(){
    return(
        <div>            
            <h1 className="colorLetras">P.I. Henry</h1>            
            <div className="padre">
                <h1 className="colorLetrasBienvenido">Bienvenidos a mi PI de Pokemon</h1>
            </div>            
            <h3 className="hijo">by Marcos Dacunda FT-19a</h3>
            
            <Link to = '/home'>     
            <br /><br /><br /> 
            <img className="logo" src="https://w7.pngwing.com/pngs/93/186/png-transparent-pokemon-go-pokemon-trading-card-game-poke-ball-pikachu-trade-center-logo-sign-pokemon.png" alt="to home" />                        
                <br /><br />
                <button src='/Home'>INGRESAR</button>            
                <br /><br /><br />
            </Link>

        </div>
    )
}
// <img className="logo" src="https://st3.depositphotos.com/1003450/12950/i/600/depositphotos_129509386-stock-photo-plastic-game-toy-ball-isolated.jpg" alt="to home" />                  
                