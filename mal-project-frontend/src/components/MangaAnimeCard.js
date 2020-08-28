import React from 'react';

const MangaAnimeCard = (props) => {
    return(
        <div 
            style={{borderStyle:"solid", borderColor:"black", width:"100px", height:"50px"}} 
            onMouseEnter={()=>props.displayDetails(true, props.name)} 
            onMouseLeave={()=>props.displayDetails(false)}>
                <img src={props.img}/>
                Name : {props.name}
                ID : {props.number}
                <a href={props.url}>Link</a>
                {/* Anime/Manga card  */}
                
        </div>
    );
}

export default MangaAnimeCard;