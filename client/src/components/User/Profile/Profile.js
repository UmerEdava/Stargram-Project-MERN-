import React, {useEffect} from 'react';
import {useHistory} from 'react-router'
import Appbar from '../Appbar/Appbar';
import {Row, Col} from 'react-bootstrap'; 
import defaultDp from '../../../images/stargram-user.jpg';
import styles from './Profile.css';
import {Button} from 'react-bootstrap';
import { Icon, InlineIcon } from '@iconify/react';
import shareAlt from '@iconify/icons-el/share-alt';
import screenSmartphone from '@iconify/icons-simple-line-icons/screen-smartphone';
import Axios from 'axios'
import axios from 'axios';

export default function Profile(){

    useEffect(() => {
        let username = localStorage.getItem('displayName')
        let token = localStorage.getItem('token')
        // console.log("effect...",user);
        document.getElementById('username').innerHTML = username

        if(!token){
            history.push('/login')
        }

        // const [img, setImg] = useState()

        function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if( http.status!= 404 ){
        console.log('found')
        document.getElementById('profilePicture').src = userPic
    } else {
        console.log('not found');
        document.getElementById('profilePicture').src = defaultDp
    }
}

        let userId = localStorage.getItem('userId')
        let userPic = "http://localhost:3001/images/profile-pictures/"+userId+'.jpg'
        console.log('userpic',userPic);
        // document.getElementById('profilePicture').src = userPic

        UrlExists(userPic)

        axios.get('http://localhost:3001/getUserDetails',{
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
          }).then(function (response) {
            // handle success
            console.log('wit',response)
            if(response.data.displayName){
                console.log(response);
                document.getElementById('creditMessages').innerHTML = response.data.creditMessages+" Credits"
            }
        })   
    })

    // Axios.get('/user?ID=12345')
    //     .then(function (response) {
    //       // handle success
    //       console.log(response);
    //     })

    const profile = () => {
        Axios.get('http://localhost:3001/profile', {
          headers: {
            "x-access-token": localStorage.getItem("token")
          },
        }).then((response) => {
          console.log('res',response);
        })
      }

      let history = useHistory()

      function editProfile(){
          history.push('/edit_profile')
      }

      function buy(){
          console.log('whaaa');
          history.push("/buy_message")
      }


    return(
        <>
        <Appbar/>
        <div className="body">
        <Row className='pt-5 container-fluid' style={{marginRight: "0",marginLeft: "0"}}>
            <Col className="text-center" md={5}>
                <img src={defaultDp} id="profilePicture" className="rounded-circlem"></img>            
            </Col>
            <Col className="text-center mt-5" md={7} >
                <h4 id="username"></h4>
                <div style={{marginTop: "3rem"}}>
                    {/* <h6 style={{float:"left"}}>1 Credits</h6>
                    <h6 >0 Messages</h6>
                    <h6 >0 Followers</h6> */}
                    <span style={{marginRight:"2rem"}} id="creditMessages" className="belongings"></span>
                    <span style={{marginRight:"2rem"}} className="belongings">0 Messages</span>
                    <span className="belongings">0 Followers</span>
                    <p style={{marginTop:"2rem"}} className="bio">Hi guys!! please support me on stargram</p>
                </div>
                <Button variant="outline-secondary" size="lg" onClick={editProfile}>Edit Profile</Button>{' '}
                <Button variant="outline-secondary" size="lg">Payments</Button>
                <div className="mt-2">
                    <Button variant="outline-primary" size="lg" style={{width: "5.5rem"}}><Icon icon={shareAlt} style={{color: '#3278FF'}} /></Button>{' '}
                    <Button variant="primary" size="lg" onClick={buy}>Buy Messages</Button>
                </div>
            </Col>
            <Col className="text-right pt-5" md={5}>
                <h2>Favourite Messages</h2>
                <Icon icon={screenSmartphone} style={{fontSize: "7rem",marginTop: "4rem"}} />
            </Col>
        </Row>
        </div>
            
        </>
    )
}