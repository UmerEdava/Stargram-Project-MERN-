import React from 'react'
import './MessagePage.css'
import InputPicture from '../../../images/input.jpg'

export default function MessagePage() {

    

    function inboxButton (e) {
        let button = e.target 
        if(button.value != 'active'){
            document.querySelectorAll('.btn').forEach(e => e.classList.remove('active'));
            button.classList.add('active');
            document.getElementById('demoImage').src = InputPicture
        }
    }

    function draftsButton (e) {
        let button = e.target 
        if(button.value != 'active'){
            document.querySelectorAll('.btn').forEach(e => e.classList.remove('active'));
            button.classList.add('active');
            document.getElementById('demoImage').src = "https://icon-library.com/images/draft-icon/draft-icon-20.jpg"
        }
    }
    
    return (
        <div>
            <div className="text-center box-parent">
                <div className="box">
                    <div className="row">
                        <div className="col-6">
                            <button className="btn message-category-button active" onClick={inboxButton}>Inbox</button>
                        </div>
                        <div className="col-6">
                            <button className="btn message-category-button" onClick={draftsButton}>Drafts</button>
                        </div>
                    </div>

                    <img src={InputPicture} className="inputPicture" id="demoImage"></img>

                </div>
            </div>
        </div> 
    )
}