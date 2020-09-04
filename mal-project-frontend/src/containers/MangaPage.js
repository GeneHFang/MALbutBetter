import React, {useEffect, useState, Fragment} from 'react';
import '../MangaPage.css';

import defaultImage from '../images/ProfilePlaceholderTemp.jpg';

const MangaPage = (props) => {
    const [img, setImg] = useState("");

    return(
        <Fragment>
            
        <div className="MangaPage" style={{display:"flex"}}>
            <img src={props.mangaJson.image_url ? props.mangaJson.image_url : defaultImage} style={{width:250, height:300}} />
            {props.mangaJson.title ?  <p>{props.mangaJson.title}</p> : <p>Title Placeholder</p>}
            {props.mangaJson.synopsis ?  <p>{props.mangaJson.synopsis}</p> : <p>Summary Placeholder</p>}
            {props.mangaJson.volumes ?  <p>Number of Volumes: {props.mangaJson.volumes}</p> : <p>Number of Volumes</p>}
            {props.mangaJson.chapters ?  <p>Number of Chapters: {props.mangaJson.chapters}</p> : <p>Number of Chapters</p>}
        </div>
        </Fragment>
    );
}

export default MangaPage