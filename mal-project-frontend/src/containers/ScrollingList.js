import React, {useState, useEffect, Fragment} from 'react';
import MangaAnimeCard from '../components/MangaAnimeCard';
import MangaAnimeDetails from '../components/MangaAnimeDetails';

const ScrollingList = (props) => {

    const [detailDisplay, toggleDetailDisplay] = useState(false);
    const [objDetails, setObjDetails] = useState({});


    const [trackMouse, setTrackMouse] = useState(false);
    const [mouseX, setMouseX] = useState(-1);
    const [mouseY, setMouseY] = useState(-1);

    const [detailsPosition, setDetailsPosition] = useState({
        position: "absolute",
        border: "1px solid black",
        backgroundColor: "white"
    });

    const displayDetails = (boolArg, animeMangaName) => {
        toggleDetailDisplay(boolArg);
        if (boolArg){
            setTrackMouse(true);
            setObjDetails({name: animeMangaName});
        }
        else{
            setTrackMouse(false);
            setObjDetails({});
        }
    };

    const getMousePosition = (mouseEvent) => {
        
        if (mouseEvent){
            setMouseX(mouseEvent.pageX);
            setMouseY(mouseEvent.pageY);
        }
    }; 

    useEffect(()=>{
        // console.log("being moved");
        setDetailsPosition({...detailsPosition, left: mouseX, top: mouseY});
        
    }, [mouseX, mouseY]);

    //placeholder for array of Manga/Anime
    const Cards = [
        1,
        2,
        3,
        4,
        5,
        6,7,8,9,10,11,12,13,14,15,16
    ];
    
    const RenderCards = () =>{
            if(props.animemanga){
                return props.animemanga.map(anime=>{
                    //mal_id, url, image_url, name
                   return <MangaAnimeCard 
                            number={anime.mal_id} 
                            name={anime.name} 
                            img={anime.image_url} 
                            url={anime.url} 
                            displayDetails={displayDetails} 
                            mousePosition={getMousePosition}
                            />
                })
            }
            else {
                return Cards.map(card=>{
                    return(
                        <MangaAnimeCard number={card} displayDetails={displayDetails}/>
                        )
                    })
                } 
                
    }

    return(
        <Fragment>
                List here
            {detailDisplay ? <MangaAnimeDetails name={objDetails.name} style={detailsPosition}/> : null }
            <div style={{display:"flex", flexWrap:"wrap"}}>
                {RenderCards()}
            </div>
        </Fragment>
    );
}

export default ScrollingList;