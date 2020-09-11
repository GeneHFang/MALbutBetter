import React, {useEffect, useState, Fragment} from 'react';
import '../AnimePage.css'

import defaultImage from '../images/backgroundtemp.jpg';

const AnimePage = (props) => {
    const [info, setInfo] = useState({});

    useEffect(()=>{
        let searchURL = `https://api.jikan.moe/v3/anime/${props.mal_id}`;
        fetch(searchURL)
        .then(res=>res.json())
        .then(json=>{
            console.log(json);
            setInfo(json);
        })
    },[])
    
    /*
     Results format
     
    {request_hash: "request:anime:e09f711f9e532dc4ffb4d5649b5dbd6e0fb25648", request_cached: true, request_cache_expiry: 275217, mal_id: 11061, url: "https://myanimelist.net/anime/11061/Hunter_x_Hunter_2011", …}
    aired: {from: "2011-10-02T00:00:00+00:00", to: "2014-09-24T00:00:00+00:00", prop: {…}, string: "Oct 2, 2011 to Sep 24, 2014"}
    airing: false
    background: null
    broadcast: "Sundays at 10:55 (JST)"
    duration: "23 min per ep"
    ending_themes: (9) ["#1: "Just Awake" by Fear, and Loathing in Las Vegas (eps 1-26)", "#2: "HUNTING FOR YOUR DREAM" by Galneryus (eps 27-50, 52-58)", "#3: "Riot" by Yoshihisa Hirano (ep 51)", "#4: "REASON" by YUZU (ゆず) (eps 59-75, 147)", "#5: "Nagareboshi Kirari (YUZU Version) (流れ星キラリ (ゆずバージョン))" by YUZU (ゆず) (eps 76-98)", "#6: "Hyouriittai (表裏一体)" by YUZU (ゆず) (eps 99-134, 136)", "#7: "Understanding" by Yoshihisa Hirano (ep 135)", "#8: "Hyouriittai -second version- (表裏一体)" by YUZU (ゆず) (eps 137-146)", "#9: "departure!" by Ono Masatoshi (ep 148)"]
    episodes: 148
    favorites: 122566
    genres: (5) [{…}, {…}, {…}, {…}, {…}]
    image_url: "https://cdn.myanimelist.net/images/anime/11/33657.jpg"
    licensors: [{…}]
    mal_id: 11061
    members: 1365014
    opening_themes: (3) ["#1: "departure!" by Ono Masatoshi (eps 1-26, 50-52, 62-75, 137-147)", "#2: "departure! -second version-" by Ono Masatoshi (eps 27-49, 76-103, 109-134, 136)", "#3: "departure! -Opening Tokubetsu-hen-" by Ono Masatoshi (eps 53-61, 104-108)"]
    popularity: 15
    premiered: "Fall 2011"
    producers: (3) [{…}, {…}, {…}]
    rank: 3
    rating: "PG-13 - Teens 13 or older"
    related: {Adaptation: Array(1), Alternative version: Array(4), Side story: Array(2)}
    request_cache_expiry: 275217
    request_cached: true
    request_hash: "request:anime:e09f711f9e532dc4ffb4d5649b5dbd6e0fb25648"
    score: 9.12
    scored_by: 775381
    source: "Manga"
    status: "Finished Airing"
    studios: [{…}]
    synopsis: "Hunter x Hunter is set in a world where Hunters exist to perform all manner of dangerous tasks like capturing criminals and bravely searching for lost treasures in uncharted territories. Twelve-year-old Gon Freecss is determined to become the best Hunter possible in hopes of finding his father, who was a Hunter himself and had long ago abandoned his young son. However, Gon soon realizes the path to achieving his goals is far more challenging than he could have ever imagined. Along the way to becoming an official Hunter, Gon befriends the lively doctor-in-training Leorio, vengeful Kurapika, and rebellious ex-assassin Killua. To attain their own goals and desires, together the four of them take the Hunter Exam, notorious for its low success rate and high probability of death. Throughout their journey, Gon and his friends embark on an adventure that puts them through many hardships and struggles. They will meet a plethora of monsters, creatures, and characters—all while learning what being a Hunter truly means. [Written by MAL Rewrite]"
    title: "Hunter x Hunter (2011)"
    title_english: "Hunter x Hunter"
    title_japanese: "HUNTER×HUNTER（ハンター×ハンター）"
    title_synonyms: ["HxH (2011)"]
    trailer_url: "https://www.youtube.com/embed/D9iTQRB4XRk?enablejsapi=1&wmode=opaque&autoplay=1"
    type: "TV"
    url: "https://myanimelist.net/anime/11061/Hunter_x_Hunter_2011"
    */

    return(
        <Fragment>
            { info.aired 
                ? <Fragment>
                    <div class="bg-image">
                        <img src={info.image_url ? defaultImage : defaultImage} />
                    </div>
                    <div class="row">
                        <div class="column">
                            <img src={info.image_url} />
                            <p>{info.title}</p>
                        </div>
                        <div class="column">
                            <p>Dates Aired : {info.aired.string}</p>
                            <p>Episodes : {info.episodes}</p>
                            <p>Score : {info.score}</p>
                            <p>Rank : {info.rank}</p>
                            <p>{info.synopsis}</p>
                            URL : <a target="_blank" href={info.url}>MAL Link</a>    
                        </div>
                    </div>
                </Fragment>
                :
                null    
            }
        </Fragment>
    );
}

export default AnimePage