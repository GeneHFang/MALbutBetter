import React, {useState, Fragment} from 'react';
import MangaAnimeCard from '../components/MangaAnimeCard';
import MangaAnimeDetails from '../components/MangaAnimeDetails';

const ScrollingList = (props) => {

    const [detailDisplay, toggleDetailDisplay] = useState(false);
    const [objDetails, setObjDetails] = useState({});

    const displayDetails = (boolArg, animeMangaName) => {
        toggleDetailDisplay(boolArg);
        if (boolArg){
            setObjDetails({name: animeMangaName});
        }
        else{
            setObjDetails({});
        }
    };

    //placeholder for array of Manga/Anime
    const Cards = [
        1,
        2,
        3,
        4,
        5,
        6,7,8,9,10,11,12,13,14,15,16
    ];

    const RenderCards = Cards.map(card=>{
        return(
            <MangaAnimeCard number={card} displayDetails={displayDetails}/>
        )
    }) 

    return(
        <Fragment>
                List here
            {detailDisplay ? <MangaAnimeDetails name={objDetails.name}/> : null }
            <div style={{display:"flex", flexWrap:"wrap"}}>
                {RenderCards}
            </div>
        </Fragment>
    );
}

export default ScrollingList;