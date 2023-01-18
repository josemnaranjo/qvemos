import React from 'react';
import {Formik,Field,Form} from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

const EvaluationForm = (props) => {
    const { id, onSubmitProp} = props;

    const valSchema = Yup.object().shape({

        score: Yup.number()
        .required("Por favor ingresa tu evaluaicion"),
    }); 

    return (
        <div>
            <Formik
            initialValues={{
                score: 0
            }}
            validationSchema = {valSchema}
            onSubmit={values=>onSubmitProp(id,values)}
            >
            {({errors,touched})=>(
                <Form>
                    <div className= 'container mt-5 shadow-lg p-3 mb-5'>

                        <div className='card'>

                            <div className='card-body'>
                                <Field id='score' as='select'className='form-select form-select-lg' name='score'>
                                    <option selected>En una escala de 1 a 5</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </Field>
                                {errors.score && touched.score ? <p>{errors.score}</p>:null}
                            </div>

                            <div className='card-body'>
                                <motion.button whileHover={{scale:1.2}} className='btn btn-outline-dark mt-3' type='submit' disabled={Object.values(errors).length>0 || Object.values(touched).length===0}>Enviar evaluacion</motion.button>
                            </div>

                        </div>
                    </div>
                </Form>
            )}
        </Formik>
            
        </div>
    );
}

export default EvaluationForm;
