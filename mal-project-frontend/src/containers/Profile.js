import React, {useEffect, useState, Fragment} from 'react';
import ScrollingList from './ScrollingList';

//temp img
import defaultImage from '../images/ProfilePlaceholderTemp.jpg';

const Profile = (props) => {

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
            <img src={img ? img : defaultImage} style={{width:250, height:300}} />
            {bio ?  <p>{bio}</p> : <p>Bio Placeholder</p>}
        </div>
        <div>
            <ScrollingList/>
        </div>
        </Fragment>
    );

}



export default Profile;