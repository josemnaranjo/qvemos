import React, {useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import { useParams,useNavigate } from 'react-router-dom';
import { getWinner,addScore } from '../services/recommendations.services';
import EvaluationForm from '../components/EvaluationForm';

const Evaluation = () => {

    const [winnerTitle,setWinnerTitle]=useState();
    const [winnerId, setWinnerId] =useState();
    const {id} = useParams();
    const navigate = useNavigate();

    const getWinnerFromService = async () => {
        const result = await getWinner(id);
        const idR = result.data._id;
        setWinnerTitle(result.data.title);
        setWinnerId(idR);
    }



    useEffect(() => {
        getWinnerFromService();
    }, []);

    const addScoreFromService = async (idR,values) => {
        await addScore(idR,values);
        navigate('/home');
    }
    

    return (
        <div>
            <Navbar/>
            <div className='container w-75 card text-white bg-dark mt-5 shadow-lg p-3 rounded'>
                <div>
                    <h1 className='card-title'> ¿Qué te pareció {winnerTitle ? <>{winnerTitle}</>: null}?</h1>
                    <EvaluationForm id={winnerId} onSubmitProp ={addScoreFromService}/>
                </div>
            </div>
        </div>
    );
}

export default Evaluation;
