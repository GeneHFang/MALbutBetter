import React, {useEffect} from 'react';

const MangaAnimeDetails = (props) => {

    //Prevents memory leak
    useEffect(() => {
        return () => {
          window.removeEventListener('mousemove', () => {})
        }
      }, []);

    return(
        <div style={props.style}>
            hover details for Anime/Manga {props.name}
        </div>
    );
}

export default MangaAnimeDetails;