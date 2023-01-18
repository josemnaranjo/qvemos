import axios from 'axios';
axios.defaults.withCredentials = true;

export const createRecommendations = async (recommendations,id) => await axios.post(`http://localhost:8000/api/new-recommendation/${id}`,recommendations);


export const addScore = async (id,score) => await axios.post(`http://localhost:8000/api/score-winner/${id}`,score);

// export const deleteThreeCollection = async() => await axios.delete('http://localhost:8000/api/delete-collection');

export const getThreeBestMovies = async () => await axios.get('http://localhost:8000/api/best-scored-movies');

//NUEVA FORMA DE JUGAR

export const newGame = async (values) => await axios.post('http://localhost:8000/api/create-new-game',values);

export const addRecommendationsToGame = async (id,values) => await axios.post(`http://localhost:8000/api/recommendations/${id}`,values);

export const createThreeFinalists = async (id) => await axios.get(`http://localhost:8000/api/finalists/${id}`);

export const getFinalists = async () => await axios.get('http://localhost:8000/api/finalists');

export const deleteFinalistsCollection = async () => await axios.delete('http://localhost:8000/api/finalists');

export const addVote = async(id,idRec) => await axios.post(`http://localhost:8000/api/finalists/${id}`,idRec);

export const getWinner = async(id) => await axios.get(`http://localhost:8000/api/winner/${id}`);

export const getAllGames = async () => await axios.get('http://localhost:8000/api/all-games');

export const deleteGame = async (id) => await axios.delete(`http://localhost:8000/api/delete-game/${id}`);

export const editGameName = async (id,values) => await axios.post(`http://localhost:8000/api/edit-game-name/${id}`,values);