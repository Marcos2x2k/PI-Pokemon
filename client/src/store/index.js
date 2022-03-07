import {createStore, applyMiddleware } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'

//Cuando usamos un Redux Store básico, lo único que puedes hacer son actualizaciones síncronas sencillas 
//por medio de una acción. Pero si quieres trabajar con lógica asíncrona para interactuar con el Store, 
//necesitarás algo más. Aquí es donde entra redux-thunk.
import thunk from 'redux-thunk'

import rootReducer from "../reducer/index";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


//TEORIA
// ¿Qué es un store en Redux?
// Store. Un store es un objeto que mantiene el árbol de estado de la aplicación. 
// Solo debe haber un único store en una aplicación de Redux, 
// ya que la composición ocurre en los reducers.