import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";
import FormInput from "./form-component/form-input-component.jsx";
import "./form-input.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div>
      <h2>Sign Up with Email and Password</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (password !== confirmPassword) {
            alert("passwords dont match");
            return;
          }
          try {
            const { user } = await createAuthUserWithEmailAndPassword(
              email,
              password
            );
            await createUserDocumentFromAuth(user, { displayName });
          } catch (error) {
            console.log("user creation error");
          }
        }}
      >
        <FormInput
          label="Display Name"
          type="text"
          value={displayName}
          onChange={handleChange}
          name="displayName"
          required
        />

        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          value={email}
          name="email"
          required
        />

        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          value={password}
          name="password"
          required
        />

        <FormInput
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          value={confirmPassword}
          name="confirmPassword"
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
export default SignUpForm;
