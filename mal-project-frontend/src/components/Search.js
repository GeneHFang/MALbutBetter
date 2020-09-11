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
        return searchQuery;
    } 

    const submission = (e) => {
        props.setSearchStatus("postsearch");
        //anime/manga search uses ID, whereas user search uses name 
        let query = parseQuery();
        var searchURL;
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
                                onClick = {(e)=>{setSearchType(e.target.innerText)}}
                                >User</Dropdown.Item>


                            <Dropdown.Item
                                href="#"
                                onClick = {(e)=>{setSearchType(e.target.innerText)}}
                                >Anime</Dropdown.Item>

                            <Dropdown.Item 
                                href="#"
                                onClick = {(e)=>{setSearchType(e.target.innerText)}}
                                >Manga</Dropdown.Item>


                        </DropdownButton>
                        <FormControl
                            placeholder = {`Name of ${searchType}`}
                            aria-label = "User or Title"
                            value = {searchQuery}
                            aria-describedby = "basic-addon1"
                            onChange={e => {
                                setSearchQuery(e.target.value);
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