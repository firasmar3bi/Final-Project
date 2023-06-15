import React, { useState } from 'react'
import Style  from './form.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import * as yup from 'yup'
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    
    let [stateError , setStateError] = useState('');
    let [inputError , setInputError] = useState('');
    
    const navigate = useNavigate();
    const skema = yup.object({
        userName : yup.string().required().min(3).max(40),
        email : yup.string().required().email(),
        password : yup.string().required(),
        cPassword : yup.string().required().oneOf([yup.ref(`password`)])
    })
    const formik = useFormik ({
        initialValues:{
            userName:"", 
            email:"",
            password:"",
            cPassword:""
        },validationSchema :skema,
        onSubmit : sendDataToJoson,
    })

    async function sendDataToJoson(values){
        // console.log(values);
            let {data} = await axios.post(`https://king-prawn-app-3mgea.ondigitalocean.app/auth/signup`,values)
            .catch(
                (err)=>{
                    setStateError(err.response.data.message);
                }   
            )

            if(data.message == "Done"){
                console.log('Done');
                setStateError('')
                setInputError('')
                navigate('/Login')

            }else {
                setInputError(data.err[0]);
            }
        }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 w-100'>
            <form className={`${Style.formAuth}`} onSubmit={formik.handleSubmit}>
                <h3 className='py-3 alert alert-primary' >Enter Your Information</h3>
                {stateError? <p className='alert alert-danger'>{stateError}</p>:""}
                {inputError? <p className='alert alert-danger'>{inputError}</p>:""}
                {formik.errors.userName && formik.touched.userName? <p className="alert alert-danger">{formik.errors.userName}</p>:''}
                {formik.errors.email && formik.touched.email? <p className="alert alert-danger">{formik.errors.email}</p>:''}
                {formik.errors.password && formik.touched.password? <p className="alert alert-danger">{formik.errors.password}</p>:''}
                {formik.errors.cPassword && formik.touched.cPassword? <p className="alert alert-danger">{formik.errors.cPassword}</p>:''}
                <div className="mb-3">
                    <input type="text"
                    className="form-control p-3" 
                    placeholder='UserName'
                    name='userName'
                    value={formik.values.userName}
                    onChange={formik.handleChange}/>
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control p-3" placeholder='YourEmail'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange} />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control p-3" placeholder='YourPassword'
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange} />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control p-3" placeholder='Conform YourPassword'
                    name='cPassword'
                    value={formik.values.cPassword}
                    onChange={formik.handleChange} />
                </div>
                <button type="submit" className="btn btn-success">Register</button>
            </form>

        </div>
    )
}
