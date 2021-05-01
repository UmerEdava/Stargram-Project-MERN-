import React, {useEffect} from 'react'
import Logo from '../../../images/stargram logo cutted.png';
import axios from 'axios'

export default function DetailsPage(props) {

    useEffect(()=>{
        console.log('seconddd',props.values)
    })

    function next() {
        let profession = document.getElementById('profession').value
        let description = document.getElementById('description').value

        let otp = {phone:props.values.phone}
 

        if(profession!="" && description !=""){

            axios({
                method: "post",
                url: "http://localhost:3001/sendCelebrityOTP",
                headers: {
                  "Content-Type": "application/json",
                },
                data: otp,                
                
              }).then((response)=>{
                if(response){
                  console.log(response,'sent..next');
                }
              })

            props.nextStep()
        }else{
            document.getElementById('fillError').innerHTML = "Please fill the form"
        }
    }

    const { values, handleChange } = props;

    return (
        <div>
            <div className="card text-center" style={{width: "30rem", display:"flex" }} >  
              <div className="card-body">
                <img id="logoCelebLogin" src={Logo}></img>

                <h3  className="card-title heading text-center mt-0" style={{color:'#555f02'}}>Tell us about your yourself</h3>
                <input name='profession' onChange={handleChange('profession')} placeholder='Your Profession' id="profession" class='profession' style={{marginTop:"2rem",marginBottom:'1.5rem'}}></input><br/>
                <textarea name='profession' onChange={handleChange('description')} id="description" placeholder='Short description about what you do' class='profession' style={{marginBottom:'2rem'}}></textarea>
                
                <div>
                    <p id="fillError" style={{color:'red', marginTop: "-26px"}}></p>
                    <button type="submit" className="save dpButton" id="next" onClick={next} >Continue </button>
                </div>
              </div>
            </div> 
        </div>
    )
}
