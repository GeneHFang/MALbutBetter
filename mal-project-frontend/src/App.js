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
  const [topAnimeJson, setTopAnimeJson] = useState({});
  const [topMangaJson, setTopMangaJson] = useState({});

  // useEffect(()=>{
  // fetch("http://api.jikan.moe/v3/anime/34012")
  // .then(res=>res.json())
  // .then(json=>console.log(json));
  //   console.log("fetching");
  // },[searchStatus]);

  //jsondata.favorites.anime

  useEffect(()=>{
    fetch("https://api.jikan.moe/v3/top/anime/1")
    .then(res=>res.json())
    .then(json=>setTopAnimeJson(json));
    console.log("fetching anime");
  },[]);
  useEffect(()=>{
    fetch("https://api.jikan.moe/v3/top/manga/1")
    .then(res=>res.json())
    .then(json=>setTopMangaJson(json));
    console.log("fetching manga");
  },[]);

  const MangaOrAnime = () => {
    if (showAnime) {
      return topAnimeJson.top;
    }
    else if (showManga) {
      return topMangaJson.top;
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
      return <Profile userJson={userJson} />
    }
    if (SearchType1 === "Anime") {
      /*
      console.log(type);
      return <AnimePage animeJson={animeJson} />
      */
     return <AnimeSearchPage animeJson={animeJson} />
    }
    if (SearchType1 === "Manga") {
      /*
      console.log(type);
      return <MangaPage mangaJson={mangaJson} />
      */
     return <MangaSearchPage mangaJson={mangaJson} />
    }
  }
  return (
    <div className="App">
       {searchStatus === "presearch" 
        ? <header className="App-header">
            <div className="home-tabs" style={{display:"flex"}}>
                <p onClick={()=>{setShowAnime(false); setShowManga(false)}} style={{border:((!showAnime && !showManga) ? "1px solid black": "")}}>Search</p>
                <p onClick={()=>{setShowAnime(true); setShowManga(false)}} style={{border:(showAnime ? "1px solid black": "")}}>Anime</p>
                <p onClick={()=>{setShowAnime(false); setShowManga(true)}} style={{border:(showManga ? "1px solid black": "")}}>Manga</p>
            </div>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              But Better
            </p>
            <p>
              Interesting Text Here
            </p>
          
            {showAnime || showManga 
            ? <ScrollingList animemanga={MangaOrAnime()}/> 
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
