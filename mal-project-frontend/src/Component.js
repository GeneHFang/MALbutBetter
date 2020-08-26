import React from 'react'; 
import {Button} from 'react-bootstrap';


function Component(props) {
    return (
        <div>
            A Component with number {props.number}

            <Button variant="success" onClick={()=>props.setNumber(props.number+1)}>increment</Button>
        </div>
    );
}

export default Component; 