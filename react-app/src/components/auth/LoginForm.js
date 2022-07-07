import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { useHistory } from 'react-router-dom';
import './loginform.css';
import logos from '../../images/everynote_logo.png';





const LoginForm = () => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [arrowMoved, setArrowMoved] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = () => {
    dispatch(login('demo@aa.io', 'password'))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const arrowMove = () => {
    setArrowMoved(true);
    setTimeout(() => {
      history.push('/')
      setArrowMoved(false);
    }, 500)
    

  }

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='login-form-container'>
      <div id='back-to-splash'>
        <i className={!arrowMoved ? "fas fa-chevron-left left-open-arrow" : "fas fa-chevron-left left-open-arrow left-arrow-move"} onClick={() => arrowMove()}></i>

      </div>
    <form onSubmit={onLogin} className='login-form'>
      <div className='upper-form'>
        <img id='form-logo' src={logos}>
        </img>
        <p id='login-title-text'>Everynote</p>
        <p id='slogan-login'>Organize everything important.</p>
      </div>
      <div id='break-line-login'></div>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div id='lower-form-box'>
      <div className='lower-form'>
        <label htmlFor='email'></label>
        <input
          name='email'
          type='text'
          placeholder='Enter email address'
          value={email}
          onChange={updateEmail}
        ></input>
        <label htmlFor='password'></label>
        <input
          name='password'
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={updatePassword}
        ></input>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
        <button type='submit' id='login-form-btn'>Continue</button>
      </div>
        <div className='bottom-form'>
        <p className='no-login-txt'>Don't have an account?</p>
        <p className='no-login-txt demo-login' onClick={() => demoLogin()}>Sign in as a Demo user</p>
        </div>
      </div>
    </form>
    </div>
  );
};

export default LoginForm;
