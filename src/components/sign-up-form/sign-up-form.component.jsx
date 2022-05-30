import { SignUpContainer } from "./sign-up-form.styles";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formFields.password === formFields.confirmPassword) {
      try {
        // este es el usuario que devuelve la librería de autenticación. Este usuario en los casos que la Auth
        // viene de google, es devuelto con toda la info que tiene google (incluido el displayname). Para el
        // caso en que el usuario se registra con mail y pass, firebase lo autentica pero no tiene más info que
        // el mail y pass que le fue proporcionado para autenticar.
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password,
          displayName
        );
        // Por el motivo anterior, usamos el valor displayname que proporcionó el usario para guardarlo en
        // nuestra base de datos.
        await createUserDocumentFromAuth(user, { displayName });
        resetFormFields();
      } catch (err) {
        console.log(err);
        if (err.code === "auth/email-already-in-use") {
          alert("Email already in use!");
        }
        alert("There was an error creating the user", err);
      }
    } else {
      alert("Passwords do not match");
    }
    return;
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sing up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          name="displayName"
          onChange={handleChange}
          value={displayName}
        />
        <FormInput
          label="e-mail"
          type="email"
          required
          name="email"
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          onChange={handleChange}
          value={password}
        />
        <FormInput
          label="Confirm password"
          type="password"
          required
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};
export default SignUpForm;
