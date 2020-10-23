import React, {useEffect, useState, Fragment} from 'react';
import {ReadMore} from 'react-read-more-less';
import ReadMoreAndLess from 'react-read-more-less';
import '../AnimePage.css'

import defaultImage from '../images/background.jpg';
import titleholderImage from '../images/Title Card Holder 1-2.png';
import titleholderImage2 from '../images/Title Card Holder2.png';

const AnimePage = (props) => {
    const [info, setInfo] = useState({});
    const [readMore, setReadMore] = useState(false);
    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);

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

    React.useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    });

    return(
        <div id="wrapper">
            { info.aired 
                ? (width >= 1100
                    ? <div id="wrapper">
                    <div className="Content-Area">
                        <img src= {titleholderImage} className="title-bg"/>
                        <div className="row">
                            <div className="Title-Content">
                                <img src={info.image_url} className="title-card"/>
                                <p>{info.title}</p>
                            </div>
                            <div className="col">
                                <div className="Rank">
                                    <p>Rank : {info.rank}</p>
                                    <p>Score : {info.score}</p>
                                    <p>({info.scored_by} votes)</p>
                                </div>
                                <div className="Popularity">
                                    <p>Popularity : {info.popularity}</p>
                                    <p>{info.members} Members</p>
                                </div>
                            </div>
                            <div className="Status">
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
                    </div>  //change this to thinner       
                )
                :
                null    
            }
        </div>
    );
}

export default AnimePage;