import React, {useEffect, useState, Fragment} from 'react';
import ScrollingList from './ScrollingList';

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

    const MangaOrAnime = () => {
        if (props.userJson.favorites){
         return showAnime 
                ? props.userJson.favorites.anime 
                : props.userJson.favorites.manga
        }
        else {
            return [];
        }
    }


    return(
        
        <Fragment>
        <div className="profile" style={{display:"flex"}}>
            <img src={props.userJson.image_url ? props.userJson.image_url : defaultImage} style={{width:250, height:300}} />
            {props.userJson.about ?  <p>{props.userJson.about}</p> : <p>Bio Placeholder</p>}
        </div>
        <div>
            <div className="tabs" style={{display:"flex"}}>
                <p onClick={()=>{setShowAnime(true); setShowManga(false)}} style={{border:(showAnime ? "1px solid black": "")}}>Anime</p>
                <p onClick={()=>{setShowAnime(false); setShowManga(true)}} style={{border:(showManga ? "1px solid black": "")}}>Manga</p>
            </div>
            <ScrollingList animemanga={MangaOrAnime()}/>
        </div>
        </Fragment>
    );

}



export default Profile;