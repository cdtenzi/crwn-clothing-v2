import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const SignIn = () =>{
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response.user);
    };

    return(
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>Sign in with Google popup</button>
        </div>
    );
}

export default SignIn;