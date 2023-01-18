import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NewGameForm from '../components/NewGameForm';
import { newGame } from '../services/recommendations.services';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const NewGame = () => {
    const [idGame,setIdGame] = useState();
    const [nextPhase,setNextPhase] = useState(true);
    const navigate = useNavigate();

    const createNewGameFromService = async (values) =>{
        const game = await newGame(values);
        const gameId = game.data.id;
        setIdGame(gameId);
        Swal.fire({
            text:"nueva sala creada con éxito",
            icon:"success"
        })
        setNextPhase(false);
    };


    const goToRecommendations = () => {
        navigate(`/recommendations/${idGame}`);
    } 

    return (
        <div>
            <Navbar/>
            <div className='container card w-75 bg-dark mt-5 shadow-lg p-3 mb-5 rounded'>
                <div className='card-body'>
                    <h1 className='card-title text-white'>NUEVA SALA</h1>
                    <NewGameForm onSubmitProp={createNewGameFromService} />
                    <motion.button whileHover={{scale:1.1}}  className='btn btn-outline-light m-3' disabled={nextPhase} onClick={goToRecommendations}>siguiente</motion.button>
                </div>
            </div>
        </div>
    );
}

export default NewGame;
