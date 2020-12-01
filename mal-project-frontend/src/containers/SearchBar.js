import React, {Fragment} from 'react';
import Search from '../components/Search';


const SearchBar = (props) => {
    return (
        <Fragment>
            <Search 
                className={"Search-bar"}  
                setSearchStatus={props.setSearchStatus} 
                search={props.search} 
                query={props.query} 
                setQuery={props.setQuery} 
                type={props.type} 
                setType={props.setType}/>
        </Fragment>
    )
}

export default SearchBar;