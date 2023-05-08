import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const { closeModal } = useModal();

  useEffect(() => {
    const areFieldsEmpty = !email || !username || !firstName || !lastName || !password || !confirmPassword;
    const isUsernameTooShort = username.length < 4;
    const isPasswordTooShort = password.length < 6;
    const isConfirmPasswordMismatch = password !== confirmPassword;

    setIsDisabled(areFieldsEmpty || isUsernameTooShort || isPasswordTooShort || isConfirmPasswordMismatch);
  }, [email, username, firstName, lastName, password, confirmPassword]);

  const updateErrors = (field) => {
    if (errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className="SignUpFormModal">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
              updateErrors("email")
            }}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value)
              updateErrors("username")
            }}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            placeholder="First name"
            onChange={(e) => {
              setFirstName(e.target.value)
              updateErrors("firstName")
            }}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            placeholder="Last name"
            onChange={(e) => {
              setLastName(e.target.value)
              updateErrors("lastName")
            }}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Password
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              updateErrors("password")
            }}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              if (e.target.value !== password) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  confirmPassword:
                  "passwords must match"
                }))
              } else {
                updateErrors('confirmPassword')
              }
            }}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
        <button type="submit" disabled={isDisabled}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
