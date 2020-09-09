import React, {useEffect, useState, Fragment} from 'react';
import ScrollingList from './ScrollingList';

const SearchPage = (props) => {

    useEffect(()=>{
        console.log("This is props of SearchPage: ",props);
    }, []);

    return(
        
        <Fragment>
            <ScrollingList animemanga={props.resJson.results ? props.resJson.results : []} notTop={true} showSingle={props.showSingle}/>
        </Fragment>
    );
}

export default SearchPage