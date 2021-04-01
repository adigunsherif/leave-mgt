import React, {useState} from 'react';

import Home from './components/Home';
import LoginForm from './components/LoginForm';
import './App.css';


function App() {

  const [isloggedin] = useState(localStorage.getItem('token') ? true : false);
  const [isadmin] = useState(localStorage.getItem('isadmin') === 'true' ? true : false);


  if (isloggedin) {

    return <Home isadmin={isadmin} token={localStorage.getItem('token')} />

  }else {

    return <LoginForm />

  }

}

export default App;
