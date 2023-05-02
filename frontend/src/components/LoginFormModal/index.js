import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";


function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  // const [demouser, demopassword] =

  // useEffect(() => {
  //   console.log('ERRPRS OBJECT', errors); // Log the updated errors object whenever it changes
  // }, [errors]);

  const handleSubmit = (e, demoCredential, demoPassword) => {
    console.log('HERE', credential, password)
    e.preventDefault();
    setErrors({});
    const creds = demoCredential || credential
    const pass = demoPassword || password
    return dispatch(sessionActions.login({ credential: creds, password: pass }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if(res.status === 401){
          setErrors({...errors, credential:"The provided credentials were invalid"})
        } else {
          if (data && data.errors) {
            setErrors(data.errors);
          }
        }
      });
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    await handleSubmit(e, 'Demouser', 'password');
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
      </form>
      <button onClick={handleDemoLogin}>Log in as Demo User</button>
    </>
  );
}

export default LoginFormModal;
