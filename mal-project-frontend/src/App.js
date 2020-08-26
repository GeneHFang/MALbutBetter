import React, {useState, useEffect} from 'react';
import Component from './Component';
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
