import React,{useEffect,useState} from 'react'
import {useParams,useHistory} from 'react-router-dom'
import './Chatbox.css'
import chatbg from '../../../../images/chatbg.jpg';
import { Icon, InlineIcon } from '@iconify/react';
import baselineCameraAlt from '@iconify/icons-ic/baseline-camera-alt';
import info20Regular from '@iconify/icons-fluent/info-20-regular';
import sharpVerified from '@iconify/icons-ic/sharp-verified';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import server from '../../../../Server'
import socketIOClient from "socket.io-client";

const useStyles = makeStyles((theme) => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
  }));

export default function Chatbox() {
    document.body.style = 'background-color: #f1f1f1;'

    const {displayName,starId} = useParams()
    console.log('param id',starId)

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    
    const history = useHistory()
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    const [chat,setChat] = useState([])
    const [response,setResponse] = useState()

    useEffect(()=>{
      const socket = socketIOClient.connect(server)

      let token = localStorage.getItem('token')
      let starToken = localStorage.getItem('starToken')

      if(!token&&!starToken){
        console.log('ondey..');
        history.push('/login')
      }

      socket.on('message',(data)=>{
        console.log('reply',data);
        // setResponse(data)
      })
    },[])
  
    return (
        
        <div>
            <div id="chatbox">
                <div id='chatHead'>
                    <img id='chatDp' src={server+'/images/profile-pictures/Celebrities/'+starId+'.jpg'} alt='profile-picture'></img>
                    <h6 style={{display:'inline',marginLeft:'1rem'}}>{displayName} </h6><Icon icon={sharpVerified} style={{color: '#3a86fe',verticalAlign:'middle'}}  />
                </div>
                <div id='chatBody'>

                </div>
                <div id='chatFooter' className='text-center'>
                    <button className='btn' id='cameraButton'><Icon icon={baselineCameraAlt} style={{color: 'white'}} /></button>
                    <Icon icon={info20Regular} style={{color: '#929292',fontSize: '23px',cursor:'pointer'}} onClick={handleClickOpen}/>
                </div>
            </div>

            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Info</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    1. Maximum duration for a message is 30 secs.<br/><br/>
                    2. User can send only one message at a time.<br/><br/>
                    3. Message will be expired automatically if it did not get a reply in 3 days.<br/><br/>
                    4. If a message get expired message credit will be returned back to the user account.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary" style={{border:'1px solid'}}>
                    Close
                </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}