import React, {Fragment} from 'react';
import ScrollingList from './ScrollingList';

const SearchPage = (props) => {
    //debugging 
    //useEffect(()=>{
    //     console.log("This is props of SearchPage: ",props);
    // }, []);
    return(
        
        <Fragment>
            <ScrollingList animemanga={props.resJson.results ? props.resJson.results : []} notTop={true} showSingle={props.showSingle}/>
        </Fragment>
    );
}

export default SearchPage