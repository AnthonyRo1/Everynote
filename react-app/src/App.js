import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';

import { authenticate } from './store/session';
import LandingPage from './components/LandingPage/LandingPage';
import Main from './components/Main/Main'
import {getAllNotes} from './store/notes';
import { getAllNotebooks } from './store/notebook';
import AllNotebooks from './components/AllNotebooks/AllNotebooks';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      // here 
      setLoaded(true);
      
    })();
    
    dispatch(getAllNotes());
    dispatch(getAllNotebooks());
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>


        <ProtectedRoute path={['/home', '/notes', '/notes/:noteId', '/notebooks', '/notes/notebooks/:notebookId', '/notes/notebooks/:notebookId/:noteId']} exact={true}>
          <Main/>
        </ProtectedRoute>


        <Route path='/' exact={true} >
          <LandingPage/>
        </Route>



      </Switch>
    </BrowserRouter>
  );
}

export default App;
