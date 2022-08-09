import React from 'react';
import "./welcome.css"
import {Image, } from "react-bootstrap"
function Welcome(props) {
    return (
        
     
     
        <div className='welcome'>
            <div className='welcomeText'>
                    <h1>welcome {sessionStorage["name"]}</h1>

            </div>
        </div>
    );
}

export default Welcome;