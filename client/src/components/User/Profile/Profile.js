import React from 'react';
import Appbar from '../Appbar/Appbar';
import {Row, Col} from 'react-bootstrap'; 
import defaultDp from '../../../images/stargram-user.jpg';
import styles from './Profile.css';
import {Button} from 'react-bootstrap'
import { Icon, InlineIcon } from '@iconify/react';
import shareAlt from '@iconify/icons-el/share-alt';
import screenSmartphone from '@iconify/icons-simple-line-icons/screen-smartphone';

export default function Profile(){
    return(
        <>
        <Appbar/>
        <div className="body">
        <Row className='pt-5 container-fluid' style={{marginRight: "0",marginLeft: "0"}}>
            <Col className="text-center" md={5}>
                <img src={defaultDp} className="rounded-circle" style={{height: "9rem"}}></img>            
            </Col>
            <Col className="text-center mt-5" md={7} >
                <h4>Username</h4>
                <div style={{marginTop: "3rem"}}>
                    {/* <h6 style={{float:"left"}}>1 Credits</h6>
                    <h6 >0 Messages</h6>
                    <h6 >0 Followers</h6> */}
                    <span style={{marginRight:"2rem"}} className="belongings">1 Credits</span>
                    <span style={{marginRight:"2rem"}} className="belongings">0 Messages</span>
                    <span className="belongings">0 Followers</span>
                    <p style={{marginTop:"2rem"}} className="bio">Hi guys!! please support me on stargram</p>
                </div>
                <Button variant="outline-secondary" size="lg">Edit Profile</Button>{' '}
                <Button variant="outline-secondary" size="lg">Payments</Button>
                <div className="mt-2">
                    <Button variant="outline-primary" size="lg" style={{width: "5.5rem"}}><Icon icon={shareAlt} style={{color: '#3278FF'}} /></Button>{' '}
                    <Button variant="primary" size="lg">Buy Messages</Button>
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