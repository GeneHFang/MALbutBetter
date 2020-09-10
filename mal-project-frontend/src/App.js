import React, {useState, useEffect} from 'react';
import Profile from './containers/Profile';
import logo from './logo2.svg';
import Search from './components/Search';
import SearchBar from './containers/SearchBar';
import SearchPage from './containers/SearchPage';
import AnimePage from './containers/AnimePage';
import MangaPage from './containers/MangaPage';
import ScrollingList from './containers/ScrollingList';
import './App.css';

function App() { 
  //const [number, setNumber] = useState(1);
  const [searchStatus, setSearchStatus] = useState("presearch");
  const [SearchType1, setSearchType1] = useState("");
  const [userJson, setUserJson] = useState({});
  const [animeJson, setAnimeJson] = useState({});
  const [mangaJson, setMangaJson] = useState({});
  
  //Show for top
  const [showManga, setShowManga] = useState(false);
  const [showAnime, setShowAnime] = useState(false);

  //Show for single result
  const [showSingleManga, setShowSingleManga] = useState(false);
  const [showSingleAnime, setShowSingleAnime] = useState(false);
  const [mal_id, setmal_id] = useState({});

  useEffect(()=>{
    return ()=>{
      //cleanup, warning for state update on unmounted component. Get to this later
    }
  }, [])

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
      .then(json=>{
        //console.log(json);
        setAnimeJson(json);
      });
    }
    if (type === "Manga"){
      fetch(url)
      .then(res=>res.json())
      .then(json=>setMangaJson(json));
    }
  };
  
  const renderContent = () => {
    if (SearchType1 === "User"){
      console.log("Here");
      return <Profile userJson={userJson} resetPage={setSearchStatus} resetUser={setUserJson} showSingle={showSingle}/>
    }
    else if (SearchType1 === "Anime" || SearchType1 === "Manga") {
      console.log("here with SearchType1===Anime ", SearchType1==="Anime" );
      console.log("This is the animeJson: ", animeJson);
      return <SearchPage resJson={SearchType1==="Anime" ? animeJson : mangaJson} reset={setSearchStatus} showSingle={showSingle}/> 
    }
    else if (showSingleAnime){
      //render single anime/manga page
      return <AnimePage mal_id={mal_id}/>
    }
    else if (showSingleManga){
      return <MangaPage mal_id={mal_id}/>
    }
  }
  const showSingle = (type, mal_id) => {
    setmal_id(mal_id);
    setSearchType1("");
    setShowManga(false);
    setShowAnime(false);
    setSearchStatus("notpresearch");
    if (type==="manga") {
      setShowSingleManga(true);
    } 
    else {
      setShowSingleAnime(true);
    }
  }
  
  return (
    <div className="App">
      {
        searchStatus !== "presearch" || showAnime || showManga
          ?
            <div className="App-search">
              <SearchBar setSearchStatus={setSearchStatus} search={search}/>
            </div>
          : null
      }
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
            ? <ScrollingList animemanga={MangaOrAnime()} mangaOrAnime={showAnime} showSingle={showSingle}/> 
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
