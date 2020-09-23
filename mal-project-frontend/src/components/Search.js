import React, {useState} from 'react'; 
import { InputGroup, DropdownButton, Dropdown, FormControl, Form } from 'react-bootstrap';
import {Button} from 'react-bootstrap';

function Search(props) {
    const [searchType, setSearchType] = useState("User");
    const [searchQuery, setSearchQuery] = useState("");

    const parseQuery = () => {
        /*
        if (searchType==="User"){
            return searchQuery;
        }
        */
        return props.query;
    } 

    const submission = (e) => {
        props.setSearchStatus("postsearch");
        //anime/manga search uses ID, whereas user search uses name 
        let query = parseQuery();
        let searchURL;
        if (searchType === "User") {
            searchURL = `https://api.jikan.moe/v3/${searchType.toLowerCase()}/${query}`;
        }
        if (searchType === "Anime" || searchType === "Manga") {
            searchURL = `https://api.jikan.moe/v3/search/${searchType.toLowerCase()}?q=${query}&page=1`;
        }
        

        console.log(searchURL);
        //props.searchType(searchType);
        props.search(searchURL, searchType);
    }

    const handleDropdown = (e) => {
        console.log(e.target.innerText);
        setSearchType(e.target.innerText);
    }

    return (
        <div className={props.className}> 
                    <InputGroup>
                        <DropdownButton
                        
                            as = {InputGroup.Prepend}
                            variant = "outline-secondary"
                            title = {`Search ${searchType}`}
                            id = "input-group-dropdown"
                        >
                            <Dropdown.Item 
                                href="#"
                                onClick = {handleDropdown}
                                >User</Dropdown.Item>


                            <Dropdown.Item
                                href="#"
                                onClick = {handleDropdown}
                                >Anime</Dropdown.Item>

                            <Dropdown.Item 
                                href="#"
                                onClick = {handleDropdown}
                                >Manga</Dropdown.Item>


                        </DropdownButton>
                        <FormControl
                            placeholder = {`Name of ${searchType}`}
                            aria-label = "User or Title"
                            value = {props.query}
                            aria-describedby = "basic-addon1"
                            onChange={e => {
                               props.setQuery(e.target.value);
                            }}
                            onKeyPress={e => {
                                if (e.key === "Enter") {
                                    submission();
                                }
                              }}
                        />
                        <InputGroup.Append>
                            <Button variant = "outline-primary" type="submit" onClick={submission}>Search</Button>
                        </InputGroup.Append>
                    </InputGroup>
        </div>
    )
}

export default Search;