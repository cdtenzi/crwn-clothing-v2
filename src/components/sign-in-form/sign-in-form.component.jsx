import './sign-in-form.styles.scss';

import {createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase.utils";

import { useState } from "react";

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const defaultFormFields = {
    email:'',
    password:'',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    
    const handleChange = (event)=>{
        setFormFields({...formFields, [event.target.name]: event.target.value})
    }

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response.user);
    };

    const handleSubmit = async (event) => 
    {
        event.preventDefault();
        // we check if the user exists, and if so, we log it in.
        try{
            const response = signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
        }catch(err){
            alert("The was an error trying to log you in:", err.code);
        }
        resetFormFields();
        return;
    }

    return (
        <div className='sing-in-container'>
            <h2>Already have an account?</h2>
            <span>Sing in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="E-mail" type='text' required name="email" onChange={handleChange} value={email} />
                <FormInput label="Password" type='password' required name="password" onChange={handleChange} value={password} />
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button buttonType="google" onClick={logGoogleUser}>Sign in with Google</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;