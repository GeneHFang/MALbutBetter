import React from 'react';

const MangaAnimeCard = (props) => {
    return(
        <div style={{borderStyle:"solid", borderColor:"black", width:"100px", height:"50px"}} onMouseEnter={()=>props.displayDetails(true, props.number)} onMouseLeave={()=>props.displayDetails(false)} >
            Anime/Manga card {props.number}
        </div>
    );
}

export default MangaAnimeCard;