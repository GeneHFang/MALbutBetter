import React, {useState, useEffect} from 'react';
import Component from './Component';
<<<<<<< HEAD
import Profile from './containers/Profile';
import logo from './logo.svg';
=======
import logo from './logo2.svg';
import Search from './Search'
>>>>>>> 4acb066ae906b6e27452f8cee7efba0793313446
import './App.css';

function App() {
  //const [number, setNumber] = useState(1);

  useEffect(()=>{
    fetch("http://api.jikan.moe/v3/anime/34012")
    .then(res=>res.json())
    .then(json=>console.log(json));
  },[]);

  return (
    <div className="App">
<<<<<<< HEAD
      {/* <Component number={number} setNumber={setNumber}></Component> */}
      <br/>
      <Profile/>
=======
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          But Better
        </p>
        <p>
          Interesting Text Here
        </p>
        <Search search className = "Search-bar"></Search>
        <a
          className="App-link"
          href="https://myanimelist.net/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Worse Website
        </a>
      </header>
>>>>>>> 4acb066ae906b6e27452f8cee7efba0793313446
    </div>
  );
}

export default App;
