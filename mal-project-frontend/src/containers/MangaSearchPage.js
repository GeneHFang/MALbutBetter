import React, {useEffect, useState, Fragment} from 'react';
import ScrollingList from './ScrollingList';

const MangaSearchPage = (props) => {

    return(
        
        <Fragment>
            <ScrollingList animemanga={props.mangaJson.results}/>
        </Fragment>
    );
}

export default MangaSearchPage