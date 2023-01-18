import React from 'react';
import Navbar from '../components/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import EditGameNameForm from '../components/EditGameNameForm';
import {editGameName} from '../services/recommendations.services';


const EditGameName = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const editGameNameFromService = async (id,values) => {
        await editGameName(id,values);
        navigate('/home');
    }

    return (
        <div>
            <Navbar />
            <EditGameNameForm id={id} onSubmitProp={editGameNameFromService} />
        </div>
    );
}

export default EditGameName;
