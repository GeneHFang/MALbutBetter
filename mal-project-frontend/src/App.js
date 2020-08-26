import React, {useState, useEffect} from 'react';
import Component from './Component';
import Profile from './containers/Profile';
import logo from './logo.svg';
import './App.css';

function App() {
  const [number, setNumber] = useState(1);

  useEffect(()=>{
    fetch("http://api.jikan.moe/v3/anime/34012")
    .then(res=>res.json())
    .then(json=>console.log(json));
  },[]);

  return (
    <div className="App">
      <Component number={number} setNumber={setNumber}></Component>
      <br/>
      <Profile/>
    </div>
  );
}

export default App;
