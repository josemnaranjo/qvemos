const mongoose = require('mongoose');
const {RecommendationSchema} = require('./recommendation.model');

const ThreeFinalistsSchema =  new mongoose.Schema({
    movies:{
        type:Array
    }
},{timestamps:true});

const ThreeFinalists = mongoose.model("ThreeFinalists",ThreeFinalistsSchema);
module.exports = {ThreeFinalistsSchema,ThreeFinalists};
