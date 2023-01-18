const UserController = require("../controllers/user.controller");
const RecommendationController = require('../controllers/recommendation.controller');
const GameController = require('../controllers/game.controller');
const authenticate = require("../config/authenticate");

module.exports = app =>{

    //USUARIO
    app.post("/api/register",UserController.Register);
    app.post("/api/login",UserController.Login);
    app.post("/api/logout",UserController.Logout);
    app.get("/api/users",authenticate,UserController.getAll);
    app.get("/api/user/:id",authenticate,UserController.getUser);

    //QVEN
    app.post('/api/new-recommendation/:id',authenticate,RecommendationController.addRecommendation);
    // app.get('/api/new-finalists-collection',authenticate,RecommendationController.createFinalistsCollection);
    // app.get('/api/finals/:id',authenticate,RecommendationController.getThreeFinalists);
    // app.get('/api/finalists-collection/:id',authenticate,RecommendationController.getFinalists);
    // app.post('/api/add-vote/:id',authenticate,RecommendationController.addVoteToRecommendation);
    // app.get('/api/get-winner',authenticate,RecommendationController.getWinner);
    app.post('/api/score-winner/:id',authenticate,RecommendationController.addScore);
    // app.delete('/api/delete-collection', authenticate,RecommendationController.deleteThreeCollection);
    app.get('/api/best-scored-movies',RecommendationController.getMoviesWithBestScores);

    //NUEVO TIPO DE JUEGO

    app.post('/api/create-new-game',authenticate,GameController.createNewGame);
    app.post('/api/edit-game-name/:id',authenticate,GameController.editGameName);
    app.get('/api/all-games',GameController.getGames);
    app.post('/api/recommendations/:id',authenticate,GameController.addRecommendation);
    app.get('/api/finalists/:id',authenticate,GameController.createThreeFinalists);
    app.get('/api/finalists',authenticate,GameController.getFinalists);
    app.delete('/api/finalists',authenticate,GameController.deleteFinalistsCollection);
    app.post('/api/finalists/:id',authenticate,GameController.addVote);
    app.get('/api/winner/:id',authenticate,GameController.getWinner);
    app.delete('/api/delete-game/:id',authenticate,GameController.deleteGame);
}