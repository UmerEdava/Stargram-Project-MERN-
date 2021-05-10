import React from 'react'
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

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
        
        <div>
            <div id="chatbox">
                <div id='chatHead'>
                    <img id='chatDp' src='https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' alt='profile-picture'></img>
                    <h6 style={{display:'inline',marginLeft:'1rem'}}>Display name </h6><Icon icon={sharpVerified} style={{color: '#3a86fe',display:'middle',verticalAlign:'inherit'}}  />
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