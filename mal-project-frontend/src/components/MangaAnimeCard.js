import React, {useState, useEffect} from 'react';

const MangaAnimeCard = (props) => {
    const [track, setTrack] = useState(false);
    let timer = null;

    useEffect(()=>{
        
        return ()=>clearTimeout(timer);

    }, []);

    const mouseMove = (event)=> {
        
        let e = event.nativeEvent
        props.mousePosition(e);
    }

    const mouseOut = ()=>{
        clearTimeout(timer);
        props.displayDetails(false);
    }

    const mouseOver = (event) => {
        clearTimeout(timer);
        let e = event.nativeEvent
        props.displayDetails(false);
        timer = setTimeout(function(){
            if (track){
                props.displayDetails(true, props.name);
            }
            else{
                props.displayDetails(false);
            }
        },700, e);
    }

    //before mouseMove (onMouseOver={(e)=>props.displayDetails(true, props.name)})
    return(
        <div 
            style={{borderStyle:"solid", borderColor:"black"}}
            onMouseEnter={()=>setTrack(true)}
            onMouseOver={mouseOver} 
            onMouseMove={mouseMove} 
            onMouseOut={mouseOut}>
                <img style={{width:"200px", height:"300px"}} src={props.img}/><br/>
                Name : {props.name}<br/>
                ID : {props.number}<br/>
                <a href={props.url}>Link</a>
                {/* Anime/Manga card  */}
            
                
        </div>
    );
}

export default MangaAnimeCard;