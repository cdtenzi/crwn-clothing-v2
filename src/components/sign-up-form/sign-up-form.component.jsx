import { contains } from "@firebase/util";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

const defaultFormFields = {
    displayName: '',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUpForm = () =>{

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    
    const handleChange = (event)=>{
        setFormFields({...formFields, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => 
    {
        event.preventDefault();

        if (formFields.password === formFields.confirmPassword){
            try{
                // este es el usuario que devuelve la librería de autenticación. Este usuario en los casos que la Auth
                // viene de google, es devuelto con toda la info que tiene google (incluido el displayname). Para el 
                // caso en que el usuario se registra con mail y pass, firebase lo autentica pero no tiene más info que 
                // el mail y pass que le fue proporcionado para autenticar.
                const {user} = await createAuthUserWithEmailAndPassword(email, password, displayName);
                // Por el motivo anterior, usamos el valor displayname que proporcionó el usario para guardarlo en 
                // nuestra base de datos.
                createUserDocumentFromAuth(user, {displayName});
                resetFormFields();
            }catch(err){
                console.log(err);
                if (err.code === 'auth/email-already-in-use') {
                    alert("Email already in use!");
                }
                alert("The was an error creating the user", err);
            }
        }else{
            alert("Passwords do not match");
        }
        return;
    }

    return(
        <div>
            <h1>Sing up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display name</label>
                <input type='text' required name="displayName" onChange={handleChange} value={displayName}></input>
                <label>E-mail</label>
                <input type='email' required name="email" onChange={handleChange} value={email}></input>
                <label>Password</label>
                <input type='password' required name="password" onChange={handleChange} value={password}></input>
                <label>Confirm password</label>
                <input type='password' required name="confirmPassword" onChange={handleChange} value={confirmPassword}></input>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}
export default SignUpForm;