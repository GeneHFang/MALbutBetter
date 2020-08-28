import React from 'react'; 
import { InputGroup, DropdownButton, Dropdown, FormControl } from 'react-bootstrap';
import {Button} from 'react-bootstrap';

function Search() {
    return (
        <div>
            <InputGroup className = "mb-3">
                <DropdownButton
                    as = {InputGroup.Prepend}
                    variant = "outline-secondary"
                    title = "Search Type"
                    id = "input-group-dropdown"
                >
                    <Dropdown.Item href="#">User</Dropdown.Item>
                    <Dropdown.Item href="#">Anime</Dropdown.Item>
                    <Dropdown.Item href="#">Manga</Dropdown.Item>


                </DropdownButton>
                <FormControl
                    placeholder = "User or Title"
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