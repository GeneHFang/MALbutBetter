import React, {useEffect, useState, Fragment} from 'react';
import ScrollingList from './ScrollingList';

const AnimeSearchPage = (props) => {

    return(
        
        <Fragment>
            <ScrollingList animemanga={props.animeJson.results}/>
        </Fragment>
    );
}

export default AnimeSearchPage