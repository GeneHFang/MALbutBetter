import React, {useState, useEffect, useRef, useCallback} from 'react';
import MangaAnimeCard from '../components/MangaAnimeCard';
import MangaAnimeDetails from '../components/MangaAnimeDetails';
import useAnimeMangaSearch from '../hooks/useAnimeMangaSearch';

const ScrollingList = (props) => {

    const [page, setPage] = useState(1);

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

    const {loading, error, animeMangas, hasMore} = useAnimeMangaSearch(page, props.animemanga.searchType ? props.animemanga.searchType.toLowerCase() : "", props.profile);
    
    // useAnimeMangaSearch(page, props.animeManga.searchType);
    //inf scrolling

    const observer = useRef();
    const lastAnimeMangaElementRef = useCallback(node => {
            if (loading) { return; }
            if (observer.current) { observer.current.disconnect(); }
            
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting &&hasMore) {
                    setPage(prevPage => prevPage+1);
                    // console.log("visible")
                }
            });
            
            if (node) { observer.current.observe(node); }
            console.log(node);
        },
        [loading, hasMore]
    )
    
    const displayDetails = (boolArg, animeManga) => {
        toggleDetailDisplay(boolArg);
        if (boolArg){
            setObjDetails(animeManga);
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
    useEffect(()=>{
        setPage(1);
    },[props.mangaOrAnime])

    
    const RenderCards = () =>{
            if(animeMangas && !props.profile){
                return animeMangas.map((anime,index)=>{
                    //mal_id, url, image_url, name
                    let name = anime.title;
                    let ref = null;
                    if(props.profile){
                        name = anime.name
                    }
                    if(animeMangas.length===index+1){      
                        ref = lastAnimeMangaElementRef;
                    }
                    return <MangaAnimeCard 
                            obj={anime}
                            number={anime.mal_id}
                            rank={anime.rank} 
                            name={name} 
                            img={anime.image_url} 
                            url={anime.url} 
                            displayDetails={displayDetails} 
                            mousePosition={getMousePosition}
                            refCallback={ref}
                            />
                })
            }
            else if(props.animemanga){
                return props.animemanga.map(anime=>{
                    //mal_id, url, image_url, name
                    let name = anime.title;
                    if(props.profile){
                        name = anime.name
                    }
                    return <MangaAnimeCard
                            obj={anime} 
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
            {detailDisplay ? <MangaAnimeDetails obj={objDetails} style={detailsPosition}/> : null }
            <div style={{display:"flex", flexWrap:"wrap", backgroundColor: "#2d2f33"}}>
                {RenderCards()}
            </div>
            <div>{loading && !props.profile && "Loading..."}</div>
            <div>{error && !props.profile && "Error!"}</div>
        </div>
    );
}

export default ScrollingList;