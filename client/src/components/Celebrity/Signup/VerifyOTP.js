import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Logo from '../../../images/stargram logo cutted.png';
import OtpInput from 'react-otp-input';
import axios from 'axios';

export default function VerifyOTP(props) {

    let history = useHistory(); 

    function verify () {
        let otp = document.getElementById('otp').value
        console.log('otp',otp,props.values)
        // let data = {data:props.values,otp:otp}

        const data = new FormData();

        data.append('file', props.values.image);

        data.append('displayName', props.values.displayName)
        data.append('email', props.values.email)
        data.append('phone', props.values.phone)
        data.append('password', props.values.password)
        data.append('profession', props.values.profession)
        data.append('description', props.values.description)

        let dataWithOtp = {data:data,otp:otp}

        console.log('data aane',data)

        axios({
            method: "post",
            url: "http://localhost:3001/verifyCelebrityOTP",
            headers: {
              "Content-Type": "application/json",
            },
            data: dataWithOtp,
          }).then((response)=>{
              console.log(response);
              console.log('state image',props.values.image)

            //   if(response.data.verified){
            //         const data = new FormData();
            //         data.append('file', props.values.image);
            //         data.append('starId', response.data.starId)
            //         console.log('data aane',data)
            //         axios.post('http://localhost:3001/addImage', data)
            //         .then((res) => {
            //             console.log('ress',res);
            //             if(response.data.auth){

            //                 console.log('verified',response)
            //                 localStorage.removeItem('token')
            //                 localStorage.removeItem('userId')
            //                 localStorage.removeItem('username')
            //                 localStorage.setItem('starToken', response.data.token)
            //                 localStorage.setItem('starId', response.data.starId)
            //                 localStorage.setItem('starname', response.data.starname)
                            
            //                 history.push('/')

            //             }
            //         });
            //   }else{
            //       console.log('not verified')
            //       document.getElementById('otpError').innerHTML = "Invalid OTP"
            //   }

              if(response.data.auth){

                  console.log('verified',response)
                  localStorage.removeItem('token')
                  localStorage.removeItem('userId')
                  localStorage.removeItem('username')
                  localStorage.setItem('starToken', response.data.token)
                  localStorage.setItem('starId', response.data.starId)
                  localStorage.setItem('starname', response.data.starname)
                  
                  history.push('/')

              }else if(response.data.invalid){
                  console.log('inv',response)
                  document.getElementById('otpError').innerHTML = "Invalid OTP"
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
                <input name='otp' placeholder='Enter OTP' id="otp" class='profession' style={{marginTop:"2rem",marginBottom:'1.5rem'}}></input><br/>
                <p id="otpError"></p>
                <div>
                <p id="fillError" style={{color:'red', marginTop: "-26px"}}></p>
                <button type="submit" className="save dpButton" id="next" onClick={verify}  >Continue </button>
                </div>
              </div>
            </div>
        </div>
    )
}
