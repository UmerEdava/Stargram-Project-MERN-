import React from 'react'
import photo from '../../../images/stargram-user.jpg';

export default function OtherPersonProfile(props) {
    //  const { id } =
    // (props.location && props.location.state) || {};
    // console.log('ii',props.location.state)
    return (
        <div>
            <div id='' className='text-center'>
            <div className='row container-fluid' style={{marginTop:'5em'}}>
                <div className='col-md-6'>               
                    <img src={photo} className='img-circle' style={{borderRadius:'50%',height:'10em'}}></img>       
                </div>      
                <div className='col-md-6'>
                    <h3 style={{marginTop:'1em'}}>Username</h3>
                    <div> 
                        
                       <h5>0</h5>
                       <h5>Messages</h5>
                     
                      
                        <p>0</p>
                        <h5>Followers</h5> 
                      
                    </div>
                    <p>Hi guys! please support me on Stargram</p>
                    <button className='btn btn-primary mr-4' style={{backgroundColor: 'white',color: '#007bff'}}>Follow</button>
                    <button className='btn btn-primary'>Message</button>
                </div>
                <h4>Favourite Messages</h4>
            </div>
            </div>
        </div>
    )
}
