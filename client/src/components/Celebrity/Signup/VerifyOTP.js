import React, { useState } from 'react';
import Logo from '../../../images/stargram logo cutted.png';
import OtpInput from 'react-otp-input';
import axios from 'axios';

export default function VerifyOTP(props) {

    

    function verify () {
        let otp = document.getElementById('otp').value
        console.log('otp',otp,props.values)
        let data = {data:props.values,otp:otp}

        axios({
            method: "post",
            url: "http://localhost:3001/verifyCelebrityOTP",
            headers: {
              "Content-Type": "application/json",
            },
            data: data,
          }).then((response)=>{
              console.log(response);
              if(response){
                  console.log('verified',response);
              }else if(response.data.invalid){

              }
          })
        
    }

    return (
        <div>
            <div className="card text-center" style={{width: "30rem", display:"flex" }} >  
              <div className="card-body">
                <img id="logoCelebLogin" src={Logo}></img>

                <h3  className="card-title heading text-center mt-0" style={{color:'#555f02'}}>Verify OTP</h3>
                <p>OTP has sent to the provided number</p>
                <input name='profession' placeholder='Enter OTP' id="otp" class='profession' style={{marginTop:"2rem",marginBottom:'1.5rem'}}></input><br/>
                
                <div>
                <p id="fillError" style={{color:'red', marginTop: "-26px"}}></p>
                <button type="submit" className="save dpButton" id="next" onClick={verify}  >Continue </button>
                </div>
              </div>
            </div>
        </div>
    )
}
