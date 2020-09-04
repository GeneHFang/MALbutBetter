import React, {useEffect} from 'react';

const MangaAnimeCard = (props) => {
    let timer = null;

    useEffect(()=>{
        
        return ()=>clearTimeout(timer);

    }, []);

    const mouseMove = (event)=> {
        clearTimeout(timer);
        let e = event.nativeEvent
        props.mousePosition(e);
        props.displayDetails(false);
        timer = setTimeout(function(){
            props.displayDetails(true, props.name);
        },700, e);
    }

    //before mouseMove (onMouseOver={(e)=>props.displayDetails(true, props.name)})

    return(
        <div 
            style={{borderStyle:"solid", borderColor:"black"}} 
            onMouseMove={mouseMove} 
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