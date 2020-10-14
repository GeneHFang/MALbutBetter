import React, {useEffect, useState, Fragment} from 'react';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import UserStats from './UserStats';
import ScrollingList from './ScrollingList';
import '../Profile.css';

//temp img
import defaultImage from '../images/ProfilePlaceholderTemp.jpg';

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
        setJsonArray([]);
        let url = `https://api.jikan.moe/v3/user/${username}/${type}list/${args}`;
        const response = await fetch(url);
        const json = await response.json();
        let arr = [];
        json[type].forEach((animemanga)=>{
            arr.push(animemanga);
        });
        setJsonArray(arr);
        // console.log(json.anime.length);

    }

   

    useEffect(() => {
        const f = async ()=> {
            if (props.userJson.favorites){
                let type = "";
                if (showAnime){              
                    type = "anime";
                    if(animeListType==="favorites" && props.userJson.favorites.anime){
                        await fetchAnimeManga(type, props.userJson.favorites.anime);
                    }
                    else{
                        await fetchList(props.userJson.username, type, animeListType);
                    }
                }
                else if (showManga){
                    type = "manga"                
                    if(mangaListType==="favorites" && props.userJson.favorites.manga){
                        await fetchAnimeManga(type, props.userJson.favorites.manga);
                    }
                    else{
                        await fetchList(props.userJson.username, type, mangaListType);
                    }
                }
            }
        
            // setJsonArray(array);
        }
        
        f();
    }, [props.userJson, showAnime, showManga, animeListType, mangaListType]);


    const changeType = (e) => {
        // debugger;
        console.log(e.target.getAttribute("searchval"));
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
        // setShowStats(stats);
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
        let type = "Anime";
        let parts = "Episodes";
        let verb = "watched";
        let presentTense = "watch";
        let jsonKey = "anime_stats";
        if (showManga){ 
            type = "Manga";
            parts = "Chapters";
            verb = "read";
            presentTense = "read";
            jsonKey = "manga_stats";
        }
        if (props.userJson.anime_stats){
            return <div className="stats">
                {type} Completed : {props.userJson[jsonKey].completed}<br/>
                {type} Dropped : {props.userJson[jsonKey].dropped}<br/>
                {parts} {verb.charAt(0).toUpperCase()+verb.slice(1)} : {props.userJson[jsonKey][`${parts.toLowerCase()}_${verb}`]} <br/>
                {showManga ?<span> Volumes {verb} : {props.userJson[jsonKey][`volumes_${verb}`]} <br/></span> : null}
                {type} On Hold : {props.userJson[jsonKey].on_hold}<br/>
                {type} Planning to {presentTense.charAt(0).toUpperCase()+presentTense.slice(1)} : {props.userJson[jsonKey][`plan_to_${presentTense}`]}<br/>
                {type} Re{verb} : {props.userJson[jsonKey][`re${verb}`]}<br/>
                {type} Currently {presentTense.charAt(0).toUpperCase()+presentTense.slice(1)}ing : {props.userJson[jsonKey][`${presentTense}ing`]}<br/>
                Average Score Given : {props.userJson[jsonKey].mean_score}<br/>
            </div>
        }
        else {
            return null;
        }
        
    }

    const renderList = () =>{
        // if (showStats){
        //     return <UserStats/>
        // }
        // else {
        return <ScrollingList animemanga={jsonArray} notTop={true} profile={true} showSingle={props.showSingle}/>
        // }
    };


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
                    <DropdownButton variant = "outline-secondary" title = {showAnime ? ListType[animeListType] : ListType[mangaListType] } id = "input-group-dropdown">
                                <Dropdown.Item href="#" onClick = {changeType} searchval="favorites">Favorites</Dropdown.Item>
                                <Dropdown.Item href="#" onClick = {changeType} searchval={showAnime ? "watching" : "reading"}>{showAnime ? "Currently Watching" : "Currently Reading"}</Dropdown.Item>
                                <Dropdown.Item href="#" onClick = {changeType} searchval="completed">Completed</Dropdown.Item>
                                <Dropdown.Item href="#" onClick = {changeType} searchval="onhold">On Hold</Dropdown.Item>
                                <Dropdown.Item href="#" onClick = {changeType} searchval="dropped">Dropped</Dropdown.Item>
                                <Dropdown.Item href="#" onClick = {changeType} searchval={showAnime ? "plantowatch" : "plantoread"}>{showAnime ? "Plan to Watch" : "Plan to Read"}</Dropdown.Item>
                    </DropdownButton>
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