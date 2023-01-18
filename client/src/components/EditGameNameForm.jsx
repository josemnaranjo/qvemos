import React from 'react';
import {Formik,Field,Form} from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';


const EditGameNameForm = (props) => {
    const {name,id,onSubmitProp} = props;


    const valSchema = Yup.object().shape({

        name: Yup.string()
        .min(3,"Titulo muy corto")
        .required("Por favor ingresa un nombre para la sala"),
    })

    return (
        <div>
            <Formik
                initialValues={{
                    name: name, 
                }}
                validationSchema={valSchema}
                onSubmit={(values) => onSubmitProp(id,values)}
                enableReinitialize
            >
                {({ errors, touched }) => (
                    <Form className='d-flex justify-content-center'>
                        <div className='card w-75 d-flex align-items-center justify-content-center mt-4 p-3 border rounded'>

                        <h1 className='card-title'>Editar nombre de juego</h1>
                            <div className='card-body'>
                                <div className='form-group'>
                                    <label htmlFor="name" className='mb-2'>Nombre de la sala:</label>
                                    <Field id="name" type="text" name="name" className="form-control" />
                                    {errors.name && touched.name ? <p>{errors.name}</p> : null}
                                </div>
                            </div>

                            <div className='card-body d-flex justify-content-center'>
                                <motion.button whileHover={{scale:1.1}}  className=' btn btn-dark btn-sm' type="submit" disabled={Object.values(errors).length>0 || Object.values(touched).length===0}>
                                    Editar nombre
                                </motion.button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
           
            
        </div>
    );
}

export default EditGameNameForm;
