import React, {useState, useEffect} from 'react';
import Component from './Component';
import Profile from './containers/Profile';
import logo from './logo2.svg';
import Search from './components/Search'
import './App.css';

function App() {
  //const [number, setNumber] = useState(1);
  const [searchStatus, setSearchStatus] = useState("presearch");
  const [userJson, setUserJson] = useState({});

  // useEffect(()=>{
  // fetch("http://api.jikan.moe/v3/anime/34012")
  // .then(res=>res.json())
  // .then(json=>console.log(json));
  //   console.log("fetching");
  // },[searchStatus]);

  //jsondata.favorites.anime

  const search = (url) => {
    fetch(url)
      .then(res=>res.json())
      .then(json=>setUserJson(json));
  };


  return (
    <div className="App">
       {searchStatus === "presearch" 
        ? <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              But Better
            </p>
            <p>
              Interesting Text Here
            </p>
          <Search className="Search-bar" setSearchStatus={setSearchStatus} search={search}/>
            
            <a
              className="App-link"
              href="https://myanimelist.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Worse Website
            </a>
          </header>
        : <Profile userJson={userJson} />
      }
    </div>
  );
}

export default App;
