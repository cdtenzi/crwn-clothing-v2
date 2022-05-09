import { contains } from "@firebase/util";
import { useState } from "react";

const defaultFormFields = {
    displayName: '',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUpForm = () =>{

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);
    
    const handleChange = (event)=>{
        setFormFields({...formFields, [event.target.name]: event.target.value})
    }

    return(
        <div>
            <h1>Sing up with your email and password</h1>
            <form onSubmit={()=>{}}>
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