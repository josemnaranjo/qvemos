const mongoose = require('mongoose');
const {RecommendationSchema} = require('../models/recommendation.model');

const GameSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Debes ingresar un nombre del juego"],
    },
    movies:[RecommendationSchema]
},{timestamps:true});

const Game = mongoose.model("Game", GameSchema);
module.exports = {GameSchema,Game};