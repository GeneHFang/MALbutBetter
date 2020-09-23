import React, {Fragment,} from 'react';
import Search from '../components/Search';


const SearchBar = (props) => {


    return (
        <Fragment>
            <Search className={"Search-bar"}  setSearchStatus={props.setSearchStatus} search={props.search} query={props.query} setQuery={props.setQuery}/>
        </Fragment>
    )

}


export default SearchBar;