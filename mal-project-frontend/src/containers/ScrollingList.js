import React, {useState, useEffect, Fragment} from 'react';
import MangaAnimeCard from '../components/MangaAnimeCard';
import MangaAnimeDetails from '../components/MangaAnimeDetails';

const ScrollingList = (props) => {

    const [detailDisplay, toggleDetailDisplay] = useState(false);
    const [objDetails, setObjDetails] = useState({});


    const [mouseX, setMouseX] = useState(-1);
    const [mouseY, setMouseY] = useState(-1);

    const [detailsPosition, setDetailsPosition] = useState({
        position: "absolute",
        border: "1px solid black",
        backgroundColor: "white",
        pointerEvents: "none"
    });

    const displayDetails = (boolArg, animeMangaName) => {
        toggleDetailDisplay(boolArg);
        if (boolArg){
            setObjDetails({name: animeMangaName});
        }
        else{
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