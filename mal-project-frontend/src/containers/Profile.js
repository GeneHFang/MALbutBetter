import React, {useEffect, useState, Fragment} from 'react';
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
    const [showManga, setShowManga] = useState(false);
    const [showAnime, setShowAnime] = useState(true);

    const [jsonArray, setJsonArray] = useState([]); 

    useEffect(() => {
        if (props.userJson.favorites){
            let array = [];
            if (showAnime){
                props.userJson.favorites.anime.forEach(anime=>{
                    let animeObj = {...anime, type: "anime"};
                    array.push(animeObj);
                })
            }
            else if (showManga){
                props.userJson.favorites.manga.forEach(manga=>{
                    let mangaObj = {...manga, type: "manga"};
                    array.push(mangaObj);
                })
            }

            setJsonArray(array);
        }
    }, [props.userJson, showAnime, showManga]);

    const goHome = () =>{
        props.resetUser({});
        props.resetPage("presearch");
    }


    return(
        
        <Fragment>
        <p onClick={goHome}>Home</p>
        <div className="profile" style={{display:"flex"}}>
            <img src={props.userJson.image_url ? props.userJson.image_url : defaultImage} style={{width:250, height:300}} />
            {props.userJson.about ?  <p>{props.userJson.about}</p> : <p>Bio Placeholder</p>}
        </div>
        <div>
            <div className="profile-tabs" style={{display:"flex"}}>
                <p onClick={()=>{setShowAnime(true); setShowManga(false)}} style={{border:(showAnime ? "1px solid black": "")}}>Anime</p>
                <p onClick={()=>{setShowAnime(false); setShowManga(true)}} style={{border:(showManga ? "1px solid black": "")}}>Manga</p>
            </div>
            <ScrollingList animemanga={jsonArray} notTop={true} profile={true} showSingle={props.showSingle}/>
        </div>
        </Fragment>
    );

}



export default Profile;