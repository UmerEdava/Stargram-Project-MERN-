import React from 'react'
import {useHistory} from 'react-router-dom'
import photo from '../../../images/stargram-user.jpg';
import { Icon, InlineIcon } from '@iconify/react';
import sharpVerified from '@iconify/icons-ic/sharp-verified';

export default function OtherPersonProfile(props) {
    //  const { id } =
    // (props.location && props.location.state) || {};
    // console.log('ii',props.location.state)
    const history = useHistory()
    return (
        <div>
            <div id='profileBox' className='text-center'>
            <div className='row container-fluid' style={{marginTop:'5em',marginLeft:'0'}}>
                <div className='col-md-6'>               
                    <img src={photo} className='img-circle' style={{borderRadius:'50%',height:'10em'}}></img>       
                </div>      
                <div className='col-md-6' style={{marginBottom:'3em'}}>
                    <h3 style={{marginTop:'1em', display:'inline'}}>Username </h3><Icon icon={sharpVerified} style={{color: '#3a86fe',display:'inline',verticalAlign:'inherit'}}  />
                    <div style={{marginTop: "3rem"}}>
                    {/* <h6 style={{float:"left"}}>1 Credits</h6>
                    <h6 >0 Messages</h6>
                    <h6 >0 Followers</h6> */}
                    <span style={{marginRight:"2rem"}} className="belongings">0 Messages</span>
                    <span className="belongings">0 Followers</span>
                    <p style={{marginTop:"1rem",marginBottom:'2em',fontSize:'16px'}} className="bio">Hi guys!! please support me on stargram</p>
                </div>

                    <button className='btn btn-primary mr-4' style={{backgroundColor: 'white',color: '#3a86fe'}}>Follow</button>
                    <button className='btn btn-primary' style={{backgroundColor:'#3a86fe'}} onClick={()=>{history.push('/chatbox')}}>Message</button>
                </div>
                <h4 style={{marginLeft:'4vw'}}>Favourite Messages</h4>
                

            </div> 
            </div>
        </div>
    )
}
