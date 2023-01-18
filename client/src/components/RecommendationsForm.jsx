import React from 'react';
import {Formik,Field,Form} from 'formik';
import * as Yup from 'yup';

const RecommendationsForm = (props) => {
    const{title, genre,userId, onSubmitProp}=props;

    const valSchema = Yup.object().shape({

        title: Yup.string()
        .min(1,"Titulo muy corto")
        .required("campo obligatorio"),

        genre: Yup.string()
        .min(1,"Genero muy breve")
        .required("campo obligatorio"),


    })
    return (
      <div>
            <Formik
                initialValues={{
                    title: title,
                    genre: genre,
                    userId: userId,
                }}
                validationSchema={valSchema}
                onSubmit={(values) => onSubmitProp(values)}
                enableReinitialize
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className='row d-flex align-items-center justify-content-center shadow-sm p-4 mb-5 border rounded'>

                            <div className='col-4'>
                                <div className='form-floating mt-4'>
                                    <Field id="title" placeholder="título de la película" type="text" name="title" className="form-control" />
                                    <label htmlFor="title">Titulo</label>
                                    {errors.title && touched.title ? <p>{errors.title}</p> : null}
                                </div>
                            </div>

                            <div className='col-4'>
                                <div className='form-group form-floating mt-4'>
                                    <Field id="genre" placeholder="género de la película" type="text" name="genre" className="form-control" />
                                    <label htmlFor="genre">Genero</label>
                                    {errors.genre && touched.genre ? (<p>{errors.genre}</p>) : null}
                                </div>
                            </div>

                            <div className='col-4 m-2 d-flex justify-content-center'>
                                <button className='btn btn-dark btn-sm mb-3' type="submit" disabled={Object.values(errors).length>0 || Object.values(touched).length===0}>
                                    confirmar
                                </button>
                            </div>

                        </div>
                    </Form>
                )}
            </Formik>
      </div>
    );
}

export default RecommendationsForm;
