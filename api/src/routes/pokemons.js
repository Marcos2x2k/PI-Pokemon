const { Router } = require('express');
const axios = require('axios');

const { pokemon, type, pokemon_type } = require('../db.js'); //importo los modelos conectados

const router = Router();

module.exports = router;