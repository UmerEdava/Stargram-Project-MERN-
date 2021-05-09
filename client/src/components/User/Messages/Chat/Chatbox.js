import React from 'react'
import './Chatbox.css'
import chatbg from '../../../../images/chatbg.jpg';

export default function Chatbox() {
    document.body.style = 'background-color: #f1f1f1;'

    return (
        
        <div>
            <div id="chatbox">
                <div id='chatHead'>
                    <img id='profilePicture' src='https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' alt='profile-picture'></img>
                    <h6 style={{display:'inline',marginLeft:'1rem'}}>Display name</h6>
                </div>
                <div id='chatBody'>

                </div>
                <div id='chatFooter'>
                    <button className='btn' id='cameraButton'>Cam</button>
                </div>
            </div>
        </div>
    )
}