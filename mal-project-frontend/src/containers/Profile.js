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


    return(
        <Fragment>
            
        <div className="profile" style={{display:"flex"}}>
            <img src={props.userJson.image_url ? props.userJson.image_url : defaultImage} style={{width:250, height:300}} />
            {props.userJson.about ?  <p>{props.userJson.about}</p> : <p>Bio Placeholder</p>}
        </div>
        <div>
            <ScrollingList anime={(props.userJson.favorites) ? props.userJson.favorites.anime : null}/>
        </div>
        </Fragment>
    );

}



export default Profile;