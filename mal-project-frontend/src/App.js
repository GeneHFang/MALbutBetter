import React, {useState, useEffect} from 'react';
import Profile from './containers/Profile';
import logo from './logo2.svg';
import Search from './components/Search'
import AnimeSearchPage from './containers/AnimeSearchPage'
import MangaSearchPage from './containers/MangaSearchPage'
import AnimePage from './containers/AnimePage';
import MangaPage from './containers/MangaPage'
import type from './components/Search';
import ScrollingList from './containers/ScrollingList';
import './App.css';

function App() { 
  //const [number, setNumber] = useState(1);
  const [searchStatus, setSearchStatus] = useState("presearch");
  const [SearchType1, setSearchType1] = useState("");
  const [userJson, setUserJson] = useState({});
  const [animeJson, setAnimeJson] = useState({});
  const [mangaJson, setMangaJson] = useState({});
  const [showManga, setShowManga] = useState(false);
  const [showAnime, setShowAnime] = useState(false);

  const MangaOrAnime = () => {
    if (showAnime) {
      return { searchType:"Anime"};
    }
    else if (showManga) {
      return { searchType:"Manga"};
    }
}

  const search = (url, type) => {
    setSearchType1(type);
    if (type === "User"){
      fetch(url)
      .then(res=>res.json())
      .then(json=>setUserJson(json));
    }
    if (type === "Anime"){
      fetch(url)
      .then(res=>res.json())
      .then(json=>setAnimeJson(json));
    }
    if (type === "Manga"){
      fetch(url)
      .then(res=>res.json())
      .then(json=>setMangaJson(json));
    }
  };
  
  const renderContent = () => {
    if (SearchType1 === "User"){
      console.log(type);
      return <Profile userJson={userJson} resetPage={setSearchStatus} resetUser={setUserJson}/>
    }
    if (SearchType1 === "Anime") {
      /*
      return <AnimeSearchPage animeJson={animeJson} />
      return <AnimePage animeJson={animeJson} reset={setSearchStatus}/>
      */
    }
    if (SearchType1 === "Manga") {
      /*
      return <MangaSearchPage mangaJson={mangaJson} />
      return <MangaPage mangaJson={mangaJson} reset={setSearchStatus}/>
      */
    }
  }
  return (
    <div className="App">
       {searchStatus === "presearch" 
        ? <header className="App-header">
            <div className="home-tabs" style={{display:"flex"}}>
                <p onClick={()=>{setShowAnime(false); setShowManga(false)}} style={{border:((!showAnime && !showManga) ? "1px solid black": ""),margin: "5px"}}>Search</p>
                <p onClick={()=>{setShowAnime(true); setShowManga(false)}} style={{border:(showAnime ? "1px solid black": ""),margin: "5px"}}>Anime</p>
                <p onClick={()=>{setShowAnime(false); setShowManga(true)}} style={{border:(showManga ? "1px solid black": ""),margin: "5px"}}>Manga</p>
            </div>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              But Better
            </p>
            <p>
              Interesting Text Here
            </p>
          
            {showAnime || showManga 
            ? <ScrollingList animemanga={MangaOrAnime()} mangaOrAnime={showAnime}/> 
            : <Search className="Search-bar" setSearchStatus={setSearchStatus} search={search} /*searchType={searchType}*//>}
            
            <a
              className="App-link"
              href="https://myanimelist.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Worse Website
            </a>
          </header>
        : renderContent()
      }
    </div>
  );
}

export default App;
