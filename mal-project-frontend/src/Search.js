import React, {useState} from 'react'; 
import { InputGroup, DropdownButton, Dropdown, FormControl } from 'react-bootstrap';
import {Button} from 'react-bootstrap';

function Search() {
    const [searchType, setSearchType] = useState("User");
    return (
        <div>
            <InputGroup className = "mb-3">
                <DropdownButton
                   
                    as = {InputGroup.Prepend}
                    variant = "outline-secondary"
                    title = {`Search ${searchType}`}
                    id = "input-group-dropdown"
                >
                    <Dropdown.Item 
                        href="#"
                        onClick = {(e)=>setSearchType(e.target.innerText)}
                        >User</Dropdown.Item>

                    <Dropdown.Item
                        href="#"
                        onClick = {(e)=>setSearchType(e.target.innerText)}
                        >Anime</Dropdown.Item>

                    <Dropdown.Item 
                        href="#"
                        onClick = {(e)=>setSearchType(e.target.innerText)}
                        >Manga</Dropdown.Item>


                </DropdownButton>
                <FormControl
                    placeholder = {`Name of ${searchType}`}
                    aria-label = "User or Title"
                    aria-describedby = "basic-addon1"
                />
                <InputGroup.Append>
                    <Button variant = "outline-primary">Search</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    )
}

export default Search;