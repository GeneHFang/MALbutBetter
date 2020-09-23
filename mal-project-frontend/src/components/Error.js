import React from 'react';
import errorImage from '../images/error.png';



const Error = (props)=> {
    return (
        <div className="error">
            <img src={errorImage} alt="error" />
            <p>{props.message.error}</p>
            <p>{props.message.message}</p>
        </div>
    );
}


export default Error;