import React from 'react';
import {Formik,Field,Form} from 'formik';
import * as Yup from 'yup';

const NewGameForm = (props) => {
    const{onSubmitProp}=props;

    const valSchema = Yup.object().shape({
        name: Yup.string()
        .min(3,"Nombre muy corto")
        .required("El nombre es obligatorio"),
    })
    return (
        <div>
            <Formik
                initialValues={{
                    name: "", 
                }}
                validationSchema={valSchema}
                onSubmit={(values) => onSubmitProp(values)}
                enableReinitialize
            >
                {({ errors, touched, values }) => (
                    <Form>
                        <div className='row d-flex align-items-center justify-content-center shadow-sm mt-5 p-4 mb-5 rounded'>

                            <div className='col-4'>
                                <div className='form-floating mt-3'>
                                    <Field id="name" type="text" name="name" className="form-control text-black" placeholder="nombre de la sala" />
                                    <label htmlFor="name" className='mb-2'>Nombre de la sala</label>
                                    {errors.name && touched.name ? <p>{errors.name}</p> : null}
                                </div>
                            </div>

                            <div className='col-4 m-2 d-flex justify-content-center'>
                                <button className=' btn btn-secondary btn-sm' type="submit" disabled={Object.values(errors).length>0 || Object.values(touched).length===0}>
                                    crear nueva sala
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            
        </div>
    );
}

export default NewGameForm;
