import React from 'react';

const MangaAnimeCard = (props) => {


    return(
        <div 
            style={{borderStyle:"solid", borderColor:"black"}} 
            onMouseOver={(e)=>props.displayDetails(true, props.name, e)}
            onMouseMove={(e)=>props.mousePosition(e)} 
            onMouseOut={()=>props.displayDetails(false)}>
                <img style={{width:"200px", height:"300px"}} src={props.img}/><br/>
                Name : {props.name}<br/>
                ID : {props.number}<br/>
                <a href={props.url}>Link</a>
                {/* Anime/Manga card  */}
                
        </div>
    );
}

export default MangaAnimeCard;