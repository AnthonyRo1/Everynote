import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import logos from '../../images/everynote_logo.png'
import './signupform.css'


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [usernameError, setUsernameError] = useState([]);
  const [emailError, setEmailError] = useState([]);
  const [passwordError, setPasswordError] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        for (let err of data) {


          const errSplit = err.split(" :");

          console.log(errSplit)
          if (errSplit[0] === 'username') {
            const err = [];
            err.push(errSplit[1])
            setUsernameError(err)
          };
          if (errSplit[0] === 'email') {
            const err = [];
            err.push(errSplit[1])
            setEmailError(err)
          }
          if (errSplit[0] === 'password') {
            const err = [];
            err.push(errSplit[1])
            setPasswordError(err);
          }
        }

        console.log(emailError)
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='signup-form-container'>
    <form onSubmit={onSignUp} className='signup-form'>
      <div className='upper-form login-v'>
          <img id='form-logo' src={logos}></img>
          <p id='login-title-text'>Everynote</p>
          <p id='slogan-login'>Organize everything important.</p>
      </div>
      <div className='break-line-login login-v'></div>
        <div className='lower-form-box login-v'>
          <div className='lower-form login-v'>
            <div>
              <label htmlFor='username'></label>
              <input
                type='text'
                name='username'
                placeholder='Username*'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            {usernameError.length > 0 && usernameError.map((err, i) => (
              <p key={i} className='each-err-su'>{err}</p>
            ))}
            <div>
              <label htmlFor='email'></label>
              <input
                type='text'
                name='email'
                placeholder='Email*'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            {emailError.length > 0 && emailError.map((err, i) => (
              <p key={i} className='each-err-su'>{err}</p>
            ))}
            <div>
              <label htmlFor='password'></label>
              <input
                type='password'
                name='password'
                placeholder='Password*'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            {passwordError.length > 0 && passwordError.map((err, i) => (
              <p key={i} className='each-err-su'>{err}</p>
            ))}
            <div>
              <label htmlFor='repeat_password'></label>
              <input
                type='password'
                name='repeat_password'
                placeholder='Confirm Password*'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button id='sign-up-submit' type='submit'>Sign Up</button>
      </div>
      </div>
      <div className='form-bottom'>
        <p id='fb-txt-b'>Already have an account?</p>
        <NavLink to='/login'>
        <p id='fb-txt-s'>Sign in</p>
        </NavLink>
      </div>
    </form>
    </div>
  );
};

export default SignUpForm;
