import React, {useEffect, useState, Fragment} from 'react';
//import {ReadMore} from 'react-read-more-less';
import ReadMoreAndLess from 'react-read-more-less';
import ReactPlayer from "react-player"
import '../AnimePage.css'

// import defaultImage from '../images/background.jpg';
// import titleholderImage from '../images/Title Card Holder 1-2.png';
import titleholderImage2 from '../images/Title Card Holder2.png';
import contentImage from '../images/Content Holder.png';
// import { getElementError } from '@testing-library/react';

const AnimePage = (props) => {
    const [info, setInfo] = useState({});
    // const [readMore, setReadMore] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const updateWidthAndHeight = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(()=>{
        let searchURL = `https://api.jikan.moe/v3/anime/${props.mal_id}`;
        fetch(searchURL)
        .then(res=>res.json())
        .then(json=>{
            console.log(json);
            setInfo(json);
        })
    },[])

    useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    });

    const genre = () => {
        return info.genres.map(genre_list_element=>{return (<p>{genre_list_element.name}</p>)});
    };

    return(
        <div id="wrapper">
            { info.aired 
                ? (width >= 1100
                    ? <div id="wrapper">
                    <div className="Content-Area">
                        <img src= {contentImage} className="content-bg"></img>
                        <div class="Title-Content">
                            <img src={info.image_url} style={{width:"160px", height:"240px", pointerEvents:"none"}} className="title-card2"/>
                            <p>{info.title}</p>
                        </div>
                        <div class="Synopsis">
                            {info.synopsis}
                        </div>
                        <div class="Youtube">
                            <ReactPlayer
                                width="304px"
                                height="171px"
                                controls="true"
                                url={info.trailer_url}
                            />
                        </div>
                        <div class="Rank">
                            <p>Rank : {info.rank}</p>
                            <p>Score : {info.score}</p>
                            <p>({info.scored_by} Votes)</p>
                        </div>
                        <div className="Popularity">
                            <p>Popularity : {info.popularity}</p>
                            <p>{info.members} Members</p>
                        </div>
                        <div className="Status">
                            <p>Status : {info.status}</p>
                        </div>
                        <div className="Dates-Aired">
                            <p>Dates Aired:</p>
                            <p>{info.aired.string}</p>
                        </div>
                        <div className="Favorites">
                            <p>Favorites:</p>
                            <p>{info.favorites} Users</p>
                        </div>
                        <div className="Episodes">
                            <p>Episodes: {info.episodes}</p>
                        </div>
                        <div className="Studio">
                            <p>Studio: {info.studios[0].name}</p>
                        </div>
                        <div className="Genre">
                            <p>Genres:</p>
                        </div>
                        <div className="Genres">
                            {genre()}
                        </div>
                    </div>

                </div>
                    : <div id="wrapper">
                        <div className="Content-Area">
                            <img src= {titleholderImage2} className="title-bg1"/>
                            <div className="col1">
                                <div className="Title-Content1">
                                    <img src={info.image_url} className="title-card2"/>
                                    <p>{info.title}</p>
                                </div>
                                <div className="row2">
                                    <div className="Rank2">
                                        <p>Rank : {info.rank}</p>
                                        <p>Score : {info.score}</p>
                                        <p>({info.scored_by} votes)</p>
                                    </div>
                                    <div className="Popularity2">
                                        <p>Popularity : {info.popularity}</p>
                                        <p>{info.members} Members</p>
                                    </div>
                                </div>
                                <div className="Status2">
                                    <p>Status : {info.status}</p>
                                </div>
                            </div>
                            <div className="Synopsis-Area">
                                <div className="synopsis-container">
                                    <div className="random-stylebox">
                                        <div className="synopsis">
                                            <p className="header">Synopsis</p>
                                            <ReadMoreAndLess
                                                className="extra content"
                                                charLimit={250}
                                                readMoreText=" read more"
                                                readLessText=" read less">
                                                {info.synopsis}
                                            </ReadMoreAndLess>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    </div>       
                )
                :
                null    
            }
        </div>
    );
}

export default AnimePage;
