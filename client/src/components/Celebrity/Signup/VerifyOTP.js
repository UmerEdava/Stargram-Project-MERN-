import React from 'react'
import Logo from '../../../images/stargram logo cutted.png';

export default function VerifyOTP() {
    return (
        <div>
            <div className="card text-center" style={{width: "30rem", display:"flex" }} >  
              <div className="card-body">
                <img id="logoCelebLogin" src={Logo}></img>

                <h3  className="card-title heading text-center mt-0" style={{color:'#555f02'}}>Verify OTP</h3>
                <p>OTP has sent to the provided number</p>
                <input name='profession' placeholder='Your Profession' id="profession" class='profession' style={{marginTop:"2rem",marginBottom:'1.5rem'}}></input><br/>
                <div>
                <p id="fillError" style={{color:'red', marginTop: "-26px"}}></p>
                <button type="submit" className="save dpButton" id="next"  >Continue </button>
                </div>
              </div>
            </div>
        </div>
    )
}
