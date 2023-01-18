const mongoose = require('mongoose');

const RecommendationSchema =  new mongoose.Schema({
    title: {
        type:String,
        required: [true,"Debes ingresar una película"],
        minLength:[1,"La película debe tener más de 2 caracteres de largo"],
        default:""
    },
    genre:{
        type:String,
        required: [true,"Debes ingresar un genero"],
        minLength:[1,"El género debe tener más de 2 caracteres de largo"],
        default:""
    },
    score: {
        type:Number,
        default: 0 ,
        required:[true,"Debes ingresar una evaluación"],
    },
    votes:{
        type:Number,
        default:0,
    },

    userCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},{timestamps:true});


const Recommendation = mongoose.model("Recommendation",RecommendationSchema);
module.exports = {RecommendationSchema,Recommendation};
