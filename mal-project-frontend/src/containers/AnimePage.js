import React, {useEffect, useState, Fragment} from 'react';
import '../AnimePage.css'

import defaultImage from '../images/ProfilePlaceholderTemp.jpg';

const AnimePage = (props) => {
    const [img, setImg] = useState("");

    return(
        <Fragment>
            
        <div className="AnimePage" style={{display:"flex"}}>
            <img src={props.animeJson.image_url ? props.animeJson.image_url : defaultImage} style={{width:250, height:300}} />
            {props.animeJson.title ?  <p>{props.animeJson.title}</p> : <p>Title Placeholder</p>}
            {props.animeJson.synopsis ?  <p>{props.animeJson.synopsis}</p> : <p>Summary Placeholder</p>}
            {props.animeJson.episodes ?  <p>Number of Episodes: {props.animeJson.episodes}</p> : <p>Number of Episodes</p>}
        </div>
        </Fragment>
    );
}

export default AnimePage