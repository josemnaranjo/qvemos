const {Game} = require('../models/game.model');
const {Recommendation} = require('../models/recommendation.model');
const {User} = require('../models/user.model');
const {ThreeFinalists} = require('../models/threeFinalists.model');
const shuffle = require('lodash.shuffle');

module.exports.getGames = async (req,res) => {
    try{
        const games =  await Game.find();
        res.json(games)

    }catch(err){
        res.status(500).json({
            message: "No hemos podido obtener el juego",
            err
        })
    }
}


module.exports.createNewGame = async (req,res) => {
    try{
        const {name} =req.body;
        console.log(name);
        const game = await Game.create({name});
        res.json({id:game.id})

    }catch(err){
        res.status(500).json({
            message: "No hemos podido crear la colección",
            err
        })
    }
};

module.exports.addRecommendation = async (req,res) => {
    try{
        const {id} =req.params;

        const {title,genre,score,votes,userId} = req.body;

        const recommendation = await Recommendation.create({title,genre,score,votes});

        const userById = await User.findByIdAndUpdate(userId,{
            $push:{
                recommendations: recommendation
            }
        });

        const game = await Game.findByIdAndUpdate(id,{
            $push:{
                movies:recommendation
            }
        });

        res.json({message:"Exito",title:title,genre:genre,userCreator:userId,game:game})
        

    }catch(err){
        res.status(500).json({
            message: "No hemos podido crear la colección",
            err
        })
    }
}; 

module.exports.createThreeFinalists = async (req,res) => {
    try{
        const collection = req.params;
        const id = collection.id
        const game = await Game.findById(id);
        const finalistsArray = game.movies;

        const finalists = shuffle(finalistsArray).slice(0,3);

        const threeFinalistsSetted = await ThreeFinalists.create({movies:finalists});

        res.json(threeFinalistsSetted);
    }catch(err){
        res.status(500).json({
            message: "No hemos podido crear a los semifinalistas",
            err
        })
    }
};


module.exports.getFinalists = async (req,res) => {
    try{
        const result = await ThreeFinalists.find({});

        res.json(result[0]);
    }catch(err){
        res.status(500).json({
            message: "No hemos podido obtener a los semifinalistas",
            err
        })
    }
};

module.exports.deleteFinalistsCollection = async (req,res) => {
    try{
        const result = await ThreeFinalists.deleteOne({});

        res.json(result);
    }catch(err){
        res.status(500).json({
            message: "No hemos podido obtener a los semifinalistas",
            err
        })
    }
}


module.exports.addVote = async (req,res) =>{
    try{
        const {id} = req.params;
        const {idRec} = req.body;
        
        const result = await Recommendation.findByIdAndUpdate(idRec,{
            $inc:{
                votes:1
            }
        },{new:true});

        const resultl2 = await Game.findByIdAndUpdate(id,{
            $push:{
                movies:result
            }
        },{new:true})

        res.json({result, resultl2});
    }catch(err){
        res.status(500).json({
            message: "No hemos podido crear a los semifinalistas",
            err
        })
    }
};


module.exports.getWinner = async(req,res) =>{
    try{
        const {id} = req.params
        const result = await Game.findById(id);
        const moviesArray = result.movies;

        const arraySorted = moviesArray.sort((a,b)=> {
            return b.votes -a.votes
        })
        res.json(arraySorted[0])

    }catch(err){
        res.status(500).json({
            message: "No hemos podido obtener el orden las películas",
            err
        });

    }
};

module.exports.deleteGame = async (req,res) => {
    try{
        const {id} = req.params;
        await Game.findByIdAndRemove(id);
        res.json({ 
            message: 'Se ha eliminado paquete exitosamente el juego'
        })

    }catch(err){
        res.status(500).json({ 
            message: 'Ups no hemos podido borrar el juego',
            err
        })
    }
};

module.exports.editGameName = async (req,res) => {
    try{
        const {id} = req.params;
        const result = await Game.findByIdAndUpdate(id,req.body,{new:true});
        res.json(result);
    }catch(err){
        res.status(500).json({ 
            message: 'Ups no hemos podido actualizar el nombre del juego',
            err
        })
    }
}