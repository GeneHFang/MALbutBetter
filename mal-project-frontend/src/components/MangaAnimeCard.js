import React, {useState, useEffect} from 'react';

const MangaAnimeCard = (props) => {
    const [timer, setTimer] = useState(null);
    const [style, setStyle] = useState({
        borderStyle:"solid",
        borderColor:"black",
        flex: "1",
        flexBasis: "25%"
    });

    useEffect(()=>{
        
        return ()=>clearTimeout(timer);

    }, []);

    const mouseMove = (event)=> {
        let e = event.nativeEvent
        props.mousePosition(e);
    }

    const mouseOut = ()=>{
        setStyle({...style, backgroundColor:""});
        clearTimeout(timer);
        props.displayDetails(false);
    }

    const mouseOver = (event) => {
        setStyle({...style, backgroundColor:"#484c53"});
        clearTimeout(timer);
        let e = event.nativeEvent
        props.displayDetails(false);
        setTimer(setTimeout(function(){
            props.displayDetails(true, props.name);           
        },700, e));
    }

    //before mouseMove (onMouseOver={(e)=>props.displayDetails(true, props.name)})
    return(
        <div 
            style={style}
            onMouseOver={mouseOver} 
            onMouseMove={mouseMove} 
            onMouseOut={mouseOut}
            onClick={(e)=>console.log("In here")}
            >
                <img style={{width:"200px", height:"300px", pointerEvents:"none"}} src={props.img}/><br/>
                Name : {props.name}<br/>
                ID : {props.number}<br/>
                <a href={props.url}>Link</a>
                {/* Anime/Manga card  */}
                
        </div>
    );
}

export default MangaAnimeCard;