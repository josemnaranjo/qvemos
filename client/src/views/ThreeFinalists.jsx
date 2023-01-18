import React,{useState,useEffect} from 'react';
import { useParams, useNavigate, renderMatches } from 'react-router-dom';
import {useUser} from '../contexts/userContext';
import { getUser } from '../services/user.services';
import { createThreeFinalists, addVote, getFinalists } from '../services/recommendations.services';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const ThreeFinalists = () => {
    const {user} = useUser();
    const {id} = useParams();
    const [usuarioAdmin,setUsuarioAdmin] = useState();
    const [finalists,setFinalists] = useState([]);
    const [nextPhase,setNextPahse] = useState(false);
    const navigate = useNavigate();
    const [btnActive,setBtnActive] = useState(false);
    const [runner,setRunner] = useState(true);
    


    const getUserFromService = async () => {
        const result = await getUser(user._id);
        setUsuarioAdmin(result.data)
    }

    useEffect(() => {
        getUserFromService()
    }, []);

    const renderInfo = ()=>{
        if(usuarioAdmin?.admin === "admin"){
            return(<><button className='btn btn-danger btn-lg' onClick={createFinalistsFromService}>Obtener finalistas</button></>)
        }else{
            return(<><p className='fs-2'>Espera la indiciacion del administrador para continuar</p>
            <button className='btn btn-danger btn-lg' onClick={getFinalistsFromService}>Obtener finalistas</button></>)
        }
    };

    const createFinalistsFromService = async () =>{
        const result = await createThreeFinalists(id);
        setFinalists(result.data.movies);
        setRunner(false);
    };

    const getFinalistsFromService = async () => {
        const result = await getFinalists();
        setFinalists(result.data.movies);
        setRunner(false);
    }


    const addVoteFromService = async(idRec) =>{
        try{
            await addVote(id,{idRec:idRec});
            setNextPahse(true);
            setBtnActive(true);
        }catch(err){
            console.log(err);
        }
    };

    const toWinnerPage = () =>{
        navigate(`/winner/${id}`);
    }

    return (
        <div>
            <Navbar />
            <div className='container card w-75 text-white bg-dark mt-5 shadow-lg p-3 mb-5 rounded'>
                <div className='card-body'>
                    <h1 className='card-title mb-5'>FINALISTAS</h1>
                    {runner ? renderInfo(): null}
                    <ul className='list-group list-group-flush mt-4'>
                        {finalists?.map((movie,i)=>(
                            <li className='list-group-item d-flex justify-content-between align-items-center' key={i}>
                                <p className='pt-3'>{movie.title}</p>
                                <button className='btn btn-outline-dark btn-sm' disabled={btnActive} onClick={()=>addVoteFromService(movie._id)}>Votar</button>
                            </li>
                        ))}
                    </ul>
                    {nextPhase ? <motion.button whileHover={{scale:1.2}} className='btn btn-outline-light mt-5' onClick={toWinnerPage}>Ver ganador</motion.button>: null}
                </div>
            </div>
        </div>
    );
}

export default ThreeFinalists;
