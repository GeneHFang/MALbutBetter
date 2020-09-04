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
        console.log(boolArg);
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

    
    const RenderCards = () =>{
            if(props.animemanga){
                return props.animemanga.map(anime=>{
                    //mal_id, url, image_url, name
                    let name = anime.title;
                    if(props.profile){
                        name = anime.name
                    }
                    return <MangaAnimeCard 
                            number={anime.mal_id} 
                            name={name} 
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
        <div className = "Scroll" >
                List here
            {detailDisplay ? <MangaAnimeDetails name={objDetails.name} style={detailsPosition}/> : null }
            <div style={{display:"flex", flexWrap:"wrap", backgroundColor: "#2d2f33"}}>
                {RenderCards()}
            </div>
        </div>
    );
}

export default ScrollingList;