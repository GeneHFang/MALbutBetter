import React, {Fragment, useState, useEffect} from 'react';

const MangaAnimeCard = (props) => {
    //State for timer and detail hover
    const [timer, setTimer] = useState(null);
    const [flagged, setFlag] = useState(false);
    const [style, setStyle] = useState({
        flex: "1",
        flexBasis: "25%",
        textDecoration: "none",
        color:"inherit",
        padding: "5px"
    });

 
    //window size check
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    
    //lifecycle functions
    useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    });
    useEffect(()=>{
        return ()=>clearTimeout(timer);
    }, []);
   
    //Event listener callbacks
    const updateWidthAndHeight = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
    };
    const mouseMove = (e)=> {
        props.mousePosition(e.pageX,e.pageY);
    }
    const mouseOut = ()=>{
        setStyle({...style, backgroundColor:""});
        clearTimeout(timer);
        props.displayDetails(false);
        setFlag(false);
    }
    const mouseOver = (e) => {
        setStyle({...style, backgroundColor:"#484c53"});
        clearTimeout(timer);
        if (!flagged) {
            setFlag(true);
            props.mousePosition(e.pageX,e.pageY);
        }
        props.displayDetails(false);
        setTimer(setTimeout(function(){
            props.displayDetails(true, props.obj);           
        },700));
    }
    const handleClick = () => {
        props.showSingle(props.mal_id);
    }

    return(
            <div 
                style={style}
                onMouseOver={mouseOver} 
                onMouseMove={mouseMove} 
                onMouseOut={mouseOut}
                onClick={handleClick}
                ref={props.refCallback}
                >
                    { width >= 1100 
                        ? <div>
                        <img style={{width:"200px", height:"300px", pointerEvents:"none"}} src={props.img}/><br/>
                        {props.rank ? <Fragment>Rank: {props.rank}<br/></Fragment> : null }
                        {props.name}<br/>
                        {/* ID : {props.number}<br/> */}
                        {/* Anime/Manga card  */}
                        </div>
                        : <div>
                        <img style={{width:"100px", height:"150px", pointerEvents:"none"}} src={props.img}/><br/>
                        {props.rank ? <Fragment>Rank: {props.rank}<br/></Fragment> : null }
                        {props.name}<br/>
                        {/* ID : {props.number}<br/> */}
                        {/* Anime/Manga card  */}
                        </div>
                    }
            </div>
    );
}

export default MangaAnimeCard;