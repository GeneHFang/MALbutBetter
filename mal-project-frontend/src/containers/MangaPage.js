import React, {useEffect, useState, Fragment} from 'react';
import '../MangaPage.css';

import defaultImage from '../images/ProfilePlaceholderTemp.jpg';

const MangaPage = (props) => {
    const [info, setInfo] = useState({});

    useEffect(()=>{
        let searchURL = `https://api.jikan.moe/v3/manga/${props.mal_id}`;
        fetch(searchURL)
        .then(res=>res.json())
        .then(json=>{
            console.log(json);
            setInfo(json);
        })
    },[])
    

    /*
        Results format 

        
        aired: {from: "2002-03-28T00:00:00+00:00", to: "2002-06-20T00:00:00+00:00", prop: {…}, string: "Mar 28, 2002 to Jun 20, 2002"}
        airing: false
        background: null
        broadcast: "Unknown"
        duration: "25 min per ep"
        ending_themes: [""Ame to Sanbika (雨と賛美歌)" by Umeno Yoshizawa"]
        episodes: 13
        favorites: 14
        genres: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
        image_url: "https://cdn.myanimelist.net/images/anime/5/15442.jpg"
        licensors: (2) [{…}, {…}]
        mal_id: 1706
        members: 7800
        opening_themes: [""Style" by Grand Zero"]
        popularity: 5167
        premiered: "Spring 2002"
        producers: (2) [{…}, {…}]
        rank: 5413
        rating: "PG-13 - Teens 13 or older"
        related: {Adaptation: Array(1), Alternative setting: Array(1)}
        request_cache_expiry: 6778
        request_cached: true
        request_hash: "request:anime:11bb5c66cc9ca16620389818afd8abddd000b234"
        score: 6.57
        scored_by: 2738
        source: "Manga"
        status: "Finished Airing"
        studios: [{…}]
        synopsis: "It is a harsh and barren wasteland, where the weak aren't allowed to dream. It is also a sacred land for true men, for there is no place a man can feel more alive. This is the Gun Frontier. Sea Pirate Captain Harlock and the errant samurai, Tochiro arrive in the United States on the Western Frontier. Along with a mysterious woman they meet along the way, the two friends challenge sex rings, bandits, and corrupt sheriff. They are searching for a lost clan of Japanese immigrants, and they will tear Gun Frontier from end to end until they find it. (Source: ANN)"
        title: "Gun Frontier"
        title_english: null
        title_japanese: "ガンフロンティア"
        title_synonyms: []
        trailer_url: null
        type: "TV"
        url: "https://myanimelist.net/anime/1706/Gun_Frontier"
        __proto__: Object


    */


    return(
        <Fragment>
            
        <div className="MangaPage" style={{display:"flex"}}>
            <img src={info.image_url ? info.image_url : defaultImage} style={{width:200, height:300}} />
            {info.title ?  <p>{info.title}</p> : <p>Title Placeholder</p>}
            {info.synopsis ?  <p>{info.synopsis}</p> : <p>Summary Placeholder</p>}
            {info.volumes ?  <p>Number of Volumes: {info.volumes}</p> : <p>Number of Volumes</p>}
            {info.chapters ?  <p>Number of Chapters: {info.chapters}</p> : <p>Number of Chapters</p>}
        </div>
        </Fragment>
    );
}

export default MangaPage