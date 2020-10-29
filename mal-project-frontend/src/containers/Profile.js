import React, {useEffect, useState, Fragment} from 'react';
import {Dropdown, DropdownButton, Button} from 'react-bootstrap';
import UserStats from './UserStats';
import ScrollingList from './ScrollingList';
import '../Profile.css';

//temp img
import defaultImage from '../images/ProfilePlaceholderTemp.jpg';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const Profile = (props) => {
    // debugger
    //render profile information on load
    // useEffect(() => {
    //     if (props.profileURL){
    //         fetch
    //     }
    // }, [input]);

    const [img, setImg] = useState("");
    const [bio, setBio] = useState("");
    // const [showStats, setShowStats] = useState(false);
    const [showManga, setShowManga] = useState(false);
    const [showAnime, setShowAnime] = useState(true);



    //Currently Watching
    //Completed
    //On Hold
    //Dropped
    //Plan to Watch
    //Favorites
    const [animeListType, setAnimeListType] = useState("favorites");
    const [mangaListType, setMangaListType] = useState("favorites");


    //Section Stats
    const [averageScore, setAverageScore] = useState(-1);
    const [totalConsumed, setTotalConsumed] = useState(-1);
    const [malIDs, setMalIDs] = useState([]);
    const [type, setType] = useState("");
    const [sortName, setSortName] = useState("");
    const [ascDesc, setAscDesc] = useState("Ascending");
    
    //state needed for filtering
    const [unfiltered, setUnfiltered]= useState([]);
    const [filterName, setFilterName] = useState("");

    // const [totalExists, setTotalExists] = useState(-1);

    // const [watching, setWatching] = useState([]);
    // const [reading, setReading] = useState([]);
    // const [completedAnime, setCompletedAnime] = useState([]);
    // const [completedManga, setCompletedManga] = useState([]);
    // const [heldAnime, setHeldAnime] = useState([]);
    // const [heldManga, setHeldManga] = useState([]);
    // const [droppedAnime, setDroppedAnime] = useState([]);
    // const [droppedManga, setDroppedManga] = useState([]);
    // const [ptw, setPtw] = useState([]);
    // const [ptr, setPtr] = useState([]);
    // const [favesAnime, setFavesAnime] = useState([]);
    // const [favesManga, setFavesManga] = useState([]);



    const [jsonArray, setJsonArray] = useState([]); 
    const [resCache, setResCache] = useState({
        anime: [],
        manga: []
    });

    const fetchAnimeManga = async (type, list) => {
        setJsonArray([]);
        if (list[0]){

            for (let i = 0; i < list.length ; i++){
                let url = `https://api.jikan.moe/v3/${type}/${list[i]["mal_id"]}`;
                const response = await fetch(url);
                const json = await response.json();
                
                setJsonArray(jsonArray => [...jsonArray, json]);
            }
        }
    }

    const fetchList = async (username, type, args) => {
        setType(type);
        setMalIDs([]);
        setJsonArray([]);
        let pageNum = 1; 
        let url = `https://api.jikan.moe/v3/user/${username}/${type}list/${args}/${pageNum}`;
        const response = await fetch(url);
        const json = await response.json();
        let arr = [];
        //avg score
        let totalScore = 0;
        let totalNoVotes = 0;
        //total ep/chapters
        let airingOrPublishing = -1;
        let totalConsumed = 0;
        // let totalExists = 0;

        json[type].forEach((animemanga)=>{
            console.log(animemanga["mal_id"]);
            setMalIDs(prev => [...prev, animemanga["mal_id"]]);
            // let url = `https://cors-anywhere.herokuapp.com/https://api.jikan.moe/v3/${type}/${animemanga["mal_id"]}`;
            // const response = await fetch(url);
            // const innerJson = await response.json();


            // arr.push(innerJson);
            arr.push(animemanga)
            totalScore += animemanga.score;
            if(!animemanga.score) {totalNoVotes++;}

            // airingOrPublishing = animemanga.airing_status ? animemanga.airing_status : animemanga.publishing_status;
            // if (airingOrPublishing === 2) {//no longer airing or publishing
                // console.log(animemanga.watched_episodes ? `watched: ${animemanga.watched_episodes}` : `read: ${animemanga.read_chapters}`)
                totalConsumed += animemanga.watched_episodes || animemanga.watched_episodes===0 ? animemanga.watched_episodes : animemanga.read_chapters;
                // totalExists += animemanga.total_episodes ? animemanga.total_episodes : animemanga.total_chapters;
            // }
        });
        console.log("Size of array: ", arr.length);

        while(arr.length && arr.length%300===0){
            pageNum++;
            url = `https://api.jikan.moe/v3/user/${username}/${type}list/${args}/${pageNum}`;
            const response = await fetch(url);
            const json = await response.json();
            json[type].forEach((animemanga)=>{
                // let url = `https://cors-anywhere.herokuapp.com/https://api.jikan.moe/v3/${type}/${animemanga["mal_id"]}`;
                // const response = await fetch(url);
                // const innerJson = await response.json();
                
                setMalIDs(prev => [...prev, animemanga["mal_id"]]);
    
    
                // arr.push(innerJson);
                arr.push(animemanga);
                totalScore += animemanga.score;
                if(!animemanga.score) {totalNoVotes++;}
                
                // airingOrPublishing = animemanga.airing_status ? animemanga.airing_status : animemanga.publishing_status;
                // if (airingOrPublishing === 2) {//no longer airing or publishing
                    totalConsumed += animemanga.watched_episodes || animemanga.watched_episodes===0 ? animemanga.watched_episodes : animemanga.read_chapters;
                    // totalExists += animemanga.total_episodes ? animemanga.total_episodes : animemanga.total_chapters;
                // }
            });
            
            console.log("Size of array: ", arr.length);
        }
        totalScore = Math.round(((totalScore / (arr.length-totalNoVotes))+Number.EPSILON)*100)/100;
        setAverageScore(totalScore ? totalScore : 0);

        // console.log("Total%",totalConsumed, "/", totalExists);
        totalConsumed = Math.round(((totalConsumed / arr.length)+Number.EPSILON)*100)/100;
        setTotalConsumed(totalConsumed ? totalConsumed : -1);

        setJsonArray(arr);
        // console.log(json.anime.length);

    }

    useEffect(() => {
        if(showAnime){
            setResCache(resCache => {
                return {...resCache, anime: [...jsonArray]}
            });
        }
        else {
            setResCache(resCache => {
                return {...resCache, manga: [...jsonArray]}
            });
        }
    }, [jsonArray])

    const fetchCallBack = async (type) => {
        if (type === "anime"){
            if(animeListType==="favorites" && props.userJson.favorites.anime){
                await fetchAnimeManga(type, props.userJson.favorites.anime);
            }
            else{
                await fetchList(props.userJson.username, type, animeListType);
            }
        }
        else {
            if(mangaListType==="favorites" && props.userJson.favorites.manga){
                await fetchAnimeManga(type, props.userJson.favorites.manga);
            }
            else{
                await fetchList(props.userJson.username, type, mangaListType);
            }
        }
    }

   

    useEffect(() => {
        const f = async ()=> {
            if (props.userJson.favorites){
                console.log("I am here first")
                let type = "";
                if (showAnime){              
                    type = "anime";
                    // if(animeListType==="favorites" && props.userJson.favorites.anime){
                    //     await fetchAnimeManga(type, props.userJson.favorites.anime);
                    // }
                    // else{
                    //     await fetchList(props.userJson.username, type, animeListType);
                    // }
                    await fetchCallBack(type);
                    console.log(jsonArray);
                    console.log(resCache);
                }
                else if (showManga){
                    type = "manga"                
                    // if(mangaListType==="favorites" && props.userJson.favorites.manga){
                    //     await fetchAnimeManga(type, props.userJson.favorites.manga);
                    // }
                    // else{
                    //     await fetchList(props.userJson.username, type, mangaListType);
                    // }
                    await fetchCallBack(type);
                    setResCache(resCache => {
                        return {...resCache, manga: [...jsonArray]}
                    })
                }
            }
        
            // setJsonArray(array);
        }
        
        f();
    }, [props.userJson, animeListType, mangaListType]);
    
    useEffect( () => {
        const f = async () => {
            console.log(resCache);
            if (showAnime && resCache.anime) {
                if (resCache.anime.length > 0) {
                    setJsonArray([...resCache.anime]);
                }
                else if (props.userJson.favorites) {
                    let type = "anime";
                    await fetchCallBack(type);
                }
            }
            else if (showManga && resCache.manga) {
                if (resCache.manga.length > 0){
                    setJsonArray([...resCache.manga]);
                    }
                
                else if (props.userJson.favorites){
                    let type = "manga";
                    await fetchCallBack(type);
                }
            }
        }
        f();
    },[showAnime, showManga]);

    useEffect(() => {
        sort(sortName);
    }, [ascDesc])

    const changeType = (e) => {
        // debugger;
        console.log(e.target.getAttribute("searchval"));
        setSortName("");

        if (showAnime){
            setAnimeListType(e.target.getAttribute("searchval"));
        }
        else {
            setMangaListType(e.target.getAttribute("searchval"));
        }
    };

    const handleTabs = (anime, manga, stats) => {
        setShowAnime(anime);
        setShowManga(manga);
        props.setType(anime ? "Anime" : "Manga");
        // setShowStats(stats);
        // setResCache(resCache => {
        //     return {...resCache, [anime ? "anime" : "manga"]: [...jsonArray]}
        // });
        setJsonArray([]);
    }

    const ListType = {
        "favorites": "Favorites",
        "watching" : "Currently Watching",
        "reading" : "Currently Reading",
        "dropped" : "Dropped",
        "completed" : "Completed",
        "onhold" : "On Hold",
        "plantowatch" : "Plan to Watch",
        "plantoread" : "Plan to Read"
    };



    // const logState = ()=> {
    //     console.log("\nwatching: ",watching,
    //         "\nreading: ",reading,
    //         "\ncompleteA: ",completedAnime,
    //         "\ncompleteM: ",completedManga,
    //         "\nheldA: ",heldAnime,
    //         "\nheldM: ",heldManga,
    //         "\ndroppedA: ",droppedAnime,
    //         "\ndroppedM: ",droppedManga,
    //         "\npw: ", ptw,
    //         "\npr: ",ptr,
    //         "\nfA: ",favesAnime,
    //         "\nfM: ",favesManga,
    //         );
    // }

    const stats = () =>{
        let type = showAnime ? "Anime" : "Manga";
        let parts = showAnime ? "Episodes" : "Chapters";
        let verb = showAnime ? "watched" : "read";
        let presentTense = showAnime ? "watch" : "read";
        let jsonKey = showAnime ? "anime_stats" : "manga_stats";

        return ( props.userJson[jsonKey] 
            ?
                <div className="stats">
                    {type} Completed : {props.userJson[jsonKey].completed}<br/>
                    {type} Dropped : {props.userJson[jsonKey].dropped}<br/>
                    {parts} {verb.charAt(0).toUpperCase()+verb.slice(1)} : {props.userJson[jsonKey][`${parts.toLowerCase()}_${verb}`]} <br/>
                    {type} On Hold : {props.userJson[jsonKey].on_hold}<br/>
                    {type} Planning to {presentTense.charAt(0).toUpperCase()+presentTense.slice(1)} : {props.userJson[jsonKey][`plan_to_${presentTense}`]}<br/>
                    {type} Re{verb} : {props.userJson[jsonKey][`re${verb}`]}<br/>
                    {type} Currently {presentTense.charAt(0).toUpperCase()+presentTense.slice(1)}ing : {props.userJson[jsonKey][`${presentTense}ing`]}<br/>
                    Average Score Given : {props.userJson[jsonKey].mean_score}<br/>
                </div>
            :
                null
        );
        
    }

    const renderList = () =>{
        // if (showStats){
        //     return <UserStats/>
        // }
        // else {
        return <ScrollingList animemanga={jsonArray} notTop={true} profile={true} showSingle={props.showSingle}/>
        // }
    };

    // const fetchDetails = () => {
    //     console.log("here with ", malIDs);
    //     malIDs.forEach(async (id) => {
    //         let url = `https://api.jikan.moe/v3/${type}/${id}`;
    //         const response = await fetch(url);
    //         const innerJson = await response.json();

    //         console.log(innerJson);

    //     })
    // }

    //Not complete
    const sort = (by) => {
        setSortName(by);
        let asc = (ascDesc === 'Ascending') ? true : false; 
        let arr = [...jsonArray];
        if (by === 'Title') {
            arr.sort((a,b) => {
                if (asc) {
                    return (a.title < b.title) ? 1 : -1;
                } 
                else {
                    return (a.title > b.title) ? 1 : -1;
                }
            });
            setJsonArray(arr);
        }
        if (by === 'Release Date'){
            console.log("here");
            let fav;
            if (ListType[animeListType] === 'Favorites' || ListType[mangaListType] === 'Favorites'){
                fav = true;
            } 
            else { fav = false; }
            console.log(arr, "and also", fav);
            arr.sort((a,b) => {
                if (fav) {
                    if (asc) {
                        return (Date.parse(a.aired ? a.aired.from : "") > Date.parse(b.aired ? b.aired.from : "")) ? 1 : -1;
                    } 
                    else {
                        return (Date.parse(a.aired ? a.aired.from : "") < Date.parse(b.aired ? b.aired.from : "")) ? 1 : -1;
                    }
                }
                else {
                    if (asc) {
                        return (Date.parse(a.start_date) > Date.parse(b.start_date)) ? 1 : -1;
                    } 
                    else {
                        return (Date.parse(a.start_date) < Date.parse(b.start_date)) ? 1 : -1;
                    }
                }
            });
            console.log(arr);
            setJsonArray(arr);
        }
    }

    const filter = (by) => {
        if (!unfiltered[0]) {setUnfiltered([...jsonArray]);}
        setFilterName(by);
        let arr = unfiltered[0] ? [...unfiltered] : [...jsonArray];

        let filterObj = {
            "One Shots" : "One-shot",
            "Movies" : "Movie",
            "Anime" : "TV",
            "Manga" : "Manga",
            "OVAs" : "OVA",
            "ONAs" : "ONA"
        }

        arr = arr.filter(ele => {
            return(ele.type === filterObj[by])
        });

        setJsonArray(arr);
    }

    const resetFilter = () => {
        setJsonArray([...unfiltered]);
        setFilterName("");
        setUnfiltered([]);
    }

    const specificStats = () => {
        let listType = showAnime ? ListType[animeListType] : ListType[mangaListType];
        let showAverage = true;
        if (listType === 'Favorites' || listType.substr(0,4) === 'Plan' || averageScore === 0) showAverage=false;
        let showConsumed = false;
        if (listType === 'On Hold' || listType === 'Dropped') showConsumed=true;
        return (
            <Fragment >
                 <div style={{display:"flex", justifyContent:"center"}}>
                    {/* <Button variant = "outline-primary" onClick={fetchDetails}>Get More Details</Button> */}
                    <DropdownButton variant = "outline-secondary" title = {showAnime ? ListType[animeListType] : ListType[mangaListType] } id = "input-group-dropdown">
                                    <Dropdown.Item href="#" onClick = {changeType} searchval="favorites">Favorites</Dropdown.Item>
                                    <Dropdown.Item href="#" onClick = {changeType} searchval={showAnime ? "watching" : "reading"}>{showAnime ? "Currently Watching" : "Currently Reading"}</Dropdown.Item>
                                    <Dropdown.Item href="#" onClick = {changeType} searchval="completed">Completed</Dropdown.Item>
                                    <Dropdown.Item href="#" onClick = {changeType} searchval="onhold">On Hold</Dropdown.Item>
                                    <Dropdown.Item href="#" onClick = {changeType} searchval="dropped">Dropped</Dropdown.Item>
                                    <Dropdown.Item href="#" onClick = {changeType} searchval={showAnime ? "plantowatch" : "plantoread"}>{showAnime ? "Plan to Watch" : "Plan to Read"}</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton variant = "outline-primary"  title={`Sort By ${sortName}`}>
                        <Dropdown.Item onClick={()=>sort("Title")}>Title</Dropdown.Item>
                        <Dropdown.Item onClick={()=>sort("Release Date")}>Release Date</Dropdown.Item>
                    </DropdownButton>
                    {
                        sortName ? 
                            <DropdownButton variant = "outline-primary"  title={`${ascDesc}`}>
                                <Dropdown.Item onClick={()=>setAscDesc("Ascending")}>Ascending</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setAscDesc("Descending")}>Descending</Dropdown.Item>
                            </DropdownButton>
                            : 
                            null
                    }
                        {
                            showAnime ?
                                <DropdownButton variant = "outline-primary"  title={`Filter By ${filterName}`}>
                                    <Dropdown.Item onClick={()=>filter("Movies")}>Movies</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>filter("OVAs")}>OVAs</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>filter("ONAs")}>ONAs</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>filter("Anime")}>TV Anime</Dropdown.Item>
                                </DropdownButton>
                            :
                                <DropdownButton variant = "outline-primary"  title={`Filter By ${filterName}`}>
                                    <Dropdown.Item onClick={()=>filter("One Shots")}>One Shots</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>filter("Manga")}>Manga</Dropdown.Item>
                                </DropdownButton>
                        }
                    {
                        unfiltered[0] ? 
                            <Button variant = "outline-primary" title="Reset Filter" onClick={resetFilter}>Reset Filter</Button>
                            :
                            null
                    }
                    </div>
                {showAverage && <p>Average Score Given: {averageScore}</p>}
                {showConsumed && <p>Average {showAnime ? "Episodes Watched" : "Chapters Read" } Before {listType === "Dropped" ? "Dropping" : "Holding"} : {totalConsumed}</p>}
            </Fragment>
        )
    }


    return(
        
        <Fragment>
        <div className="profile" style={{display:"flex"}}>
            <div style={{flex:"50%"}}><img src={props.userJson.image_url ? props.userJson.image_url : defaultImage} style={{width:250, height:300}} /></div>
            
            <div style={{flex:"50%"}}>
                {props.userJson.about ?  <p className="profile-about">{props.userJson.about}</p> : <p>Bio Placeholder</p>}
                {stats()}
            </div>
        </div>
        <div>
            <div className="profile-tabs" style={{display:"flex"}}>
                <p className="profile-tabs-p" onClick={()=>{handleTabs(true, false, false)}} style={{border:(showAnime ? "1px solid black": "")}}>Anime</p>
                <p className="profile-tabs-p" onClick={()=>{handleTabs(false, true, false)}} style={{border:(showManga ? "1px solid black": "")}}>Manga</p>
                {/* <p className="profile-tabs-p" onClick={()=>{handleTabs(false, false, true)}} style={{border:(showStats ? "1px solid black": "")}}>User Stats</p> */}
            </div>
            { showAnime || showManga 
                ? 
                    <div>
                        {specificStats()}
                        
                    </div>
                :
                    null
            }
            {renderList()}
        </div>
        </Fragment>
    );
    
}

// { !showStats ?  <ScrollingList animemanga={jsonArray} notTop={true} profile={true} showSingle={props.showSingle}/> : <UserStats/> }


export default Profile;