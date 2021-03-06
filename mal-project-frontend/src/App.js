import React, {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import Profile from './containers/Profile';
import logo from './logo2.svg';
import Search from './components/Search';
import Error from './components/Error';
import SearchBar from './containers/SearchBar';
import SearchPage from './containers/SearchPage';
import AnimePage from './containers/AnimePage';
import MangaPage from './containers/MangaPage';
import ScrollingList from './containers/ScrollingList';
import './App.css';

function App() {
  //State for search and containers for results
  const [searchStatus, setSearchStatus] = useState("presearch");
  const [SearchType1, setSearchType1] = useState("");
  const [userJson, setUserJson] = useState({});
  const [animeJson, setAnimeJson] = useState({});
  const [mangaJson, setMangaJson] = useState({});
  const [errorMsg, setErrorMsg] = useState({});
  
  //Show flags for top
  const [showManga, setShowManga] = useState(false);
  const [showAnime, setShowAnime] = useState(false);

  //Show flags for single result
  const [showSingleManga, setShowSingleManga] = useState(false);
  const [showSingleAnime, setShowSingleAnime] = useState(false);
  const [mal_id, setmal_id] = useState({});
  const [showError, setShowError] = useState(true);
  const [searchBarStyle, setSearchBarStyle] = useState({});

  //form control for search
  const [query, setQuery] = useState("");
  const [type, setType] = useState("User");
  const [typeOverride, setTypeOverride] = useState("");

  //Lifecycles
  useEffect(()=>{
    return ()=>{
      //cleanup, warning for state update on unmounted component. Get to this later
    }
  }, []);

  //Monitor
  useEffect(()=>{
    let res = 
      SearchType1 === "Anime" 
          ? animeJson.results 
          : mangaJson.results;
    if (searchStatus!=="presearch"&& res.length === 0){
      setShowError(true);
      setErrorMsg({error: "No Results", message: "Please check your spelling or searching using a more specific term"});   
    }
  },[animeJson, mangaJson]);


  const MangaOrAnime = () => {
    if (showAnime) {
      return { searchType:"Anime"};
    }
    else if (showManga) {
      return { searchType:"Manga"};
    }
  }



  const search = (url, type) => {
    if (type !== "User") { setUserJson({}); }
    setSearchBarStyle({});
    if (showError) { setShowError(false) }
    setSearchType1(type);
    if (type === "User"){
      fetch(url)
      .then(res=>res.json())
      .then(json=>{
        setUserJson(json);
        //console.log(json);
        if (json.error) {
          setShowError(true);
          setErrorMsg({error:"Error! "+json.error, message: json.message})
          //console.log(json.error);
        }
      })
      .catch(error=>{
        setShowError(true);
        let message = "";
        if (error.message === "Failed to fetch"){
          message = "Unable to find user!"
        }
        setErrorMsg({error:"Error! "+ message});
        //console.log(error.message);
      });
    }
    if (type === "Anime"){
      fetch(url)
      .then(res=>res.json())
      .then(json=>{
        setAnimeJson(json);
      });
    }
    if (type === "Manga"){
      fetch(url)
      .then(res=>res.json())
      .then(json=>{
        setMangaJson(json)
      });
    }
  };
  
  const renderContent = () => {
    if (showError) {
      return <Error message={errorMsg.error ? errorMsg : {message:"renderContent Error"}} /> 
    }
    else if (SearchType1 === "User"){
      return <Profile userJson={userJson} resetPage={setSearchStatus} resetUser={setUserJson} showSingle={showSingle} setType={setTypeOverride}/>
    }
    else if (SearchType1 === "Anime" || SearchType1 === "Manga") {
      //console.log("here with SearchType1===Anime ", SearchType1==="Anime" );
      //console.log("This is the animeJson: ", animeJson);
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
  const showSingle = (mal_id) => {
    //console.log("json rn ",animeJson, mangaJson, " and type", type);
    setSearchBarStyle({position:"absolute", backgroundColor:"rgba(0,0,0,0)"});
    setmal_id(mal_id);
    setSearchType1("");
    setUserJson({});
    setShowManga(false);
    setShowAnime(false);
    setShowError(false);
    setSearchStatus("notpresearch");
    //console.log(type, "and ", typeOverride);
    if (type==="Manga" || typeOverride === "Manga") {
      setShowSingleManga(true);
      setShowSingleAnime(false);
    } 
    else {
      setShowSingleAnime(true);
      setShowSingleManga(false);
    }
  };

  const goHome = () =>{
    setSearchStatus("presearch"); 
    setShowAnime(false); 
    setShowManga(false); 
    setSearchBarStyle({})
    setUserJson({});
  }


  
  return (
    <div className="App">
      {
        searchStatus !== "presearch" || showAnime || showManga
          ?
            <div className="App-search" 
                 style={searchBarStyle}
            > 
              <Button variant="outline-primary" 
                      onClick={goHome}> Home </Button>
              <SearchBar setSearchStatus={setSearchStatus} 
                         search={search} 
                         query={query} 
                         setQuery={setQuery}
                         type={type}
                         setType={setType}/>
            </div>
          : null
      }
       {searchStatus === "presearch" 
        ? <header className="App-header">
            <div className="home-tabs" style={{display:"flex"}}>
                <p onClick={()=>{setShowAnime(false); setShowManga(false)}} style={{border:((!showAnime && !showManga) ? "1px solid black": ""),margin: "5px"}}>Search</p>
                <p onClick={()=>{setShowAnime(true); setShowManga(false); setType("Anime")}} style={{border:(showAnime ? "1px solid black": ""),margin: "5px"}}>Anime</p>
                <p onClick={()=>{setShowAnime(false); setShowManga(true); setType("Manga")}} style={{border:(showManga ? "1px solid black": ""),margin: "5px"}}>Manga</p>
            </div>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Lightweight querying of MAL listings and users
            </p>
          
            {showAnime || showManga 
            ? <ScrollingList animemanga={MangaOrAnime()} mangaOrAnime={showAnime} showSingle={showSingle}/> 
            : <Search className="Search-bar" setSearchStatus={setSearchStatus} search={search} query={query} setQuery={setQuery} type={type} setType={setType}/>}
            
            <a
              className="App-link"
              href="https://myanimelist.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              MAL Website
            </a>
          </header>
        : renderContent()
      }
    </div>
  );
}

export default App;
