import React,{useState, useEffect} from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getWinner } from '../services/recommendations.services';
import { motion } from 'framer-motion';


const Winner = () => {

    const [winnerTitle,setWinnerTitle]=useState();
    const [winnerId,setWinnerId] = useState();
    const [winnerGenre, setWinnerGenre] = useState();
    const {id} =useParams()
    const navigate = useNavigate();


    const getWinnerFromService = async () =>{
        const winner = await getWinner(id);
        const winnerTitle = winner.data.title;
        const winnerId = winner.data._id;
        const winnerGenre = winner.data.genre;
        setWinnerTitle(winnerTitle);
        setWinnerId(winnerId);
        setWinnerGenre(winnerGenre);
    };


    const toEvaluation = () =>{
        navigate(`/evaluation/${id}`)
    }

    useEffect(() => {
        getWinnerFromService();
    }, []);

    return (
        <div>
            <Navbar />
            <motion.div 
                animate={{ y:100, scale:1 }} 
                initial={{scale:0}}
                transition={{type:"tween"}}
                className='container card mt-5 shadow-lg p-3 mb-5 rounded'>
                <h1 className='card-title'>¡La película ganadora es!</h1>
                {winnerTitle ? 
                <div className='container card-body rounded'>
                        <motion.h1 
                            animate={{rotate:[0,10,-10,0]}}
                            transition={{repeat:Infinity}}
                            className='display-3'>
                                {winnerTitle}
                        </motion.h1>
                        <h2>Género : {winnerGenre}</h2>
                        <motion.button whileHover={{scale:1.2}} className='btn btn-outline-dark m-3' onClick={toEvaluation}>colocar nota</motion.button>
                </div> : null}
            </motion.div>
            
        </div>
    );
}

export default Winner;
