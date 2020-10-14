import React, {Fragment, useState, useEffect} from 'react';

const MangaAnimeCard = (props) => {
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
    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);

    const updateWidthAndHeight = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
    };

    React.useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
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
        setFlag(false);
    }

    const mouseOver = (event) => {
        setStyle({...style, backgroundColor:"#484c53"});
        clearTimeout(timer);
        let e = event.nativeEvent
        if (!flagged) {
            setFlag(true);
            props.mousePosition(e);
        }
        props.displayDetails(false);
        setTimer(setTimeout(function(){
            props.displayDetails(true, props.obj);           
        },700, e));
    }

    const handleClick = () => {
        props.showSingle(props.type, props.mal_id);
    }

    //before mouseMove (onMouseOver={(e)=>props.displayDetails(true, props.name)})
    return(
        // <a 
        //  href={props.url}>
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
        // </a>
    );
}

export default MangaAnimeCard;