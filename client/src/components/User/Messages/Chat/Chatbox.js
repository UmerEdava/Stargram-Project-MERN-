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

      // if(!token&&!starToken){
      //   console.log('ondey..');
      //   history.push('/login')
      // }

      socket.on('message',(data)=>{
        console.log('reply',data);
        // setResponse(data)
      })

      socket.emit('message',('react testing'))
    },[])

    var recorder = document.getElementById('recorder'); 
    function normalRecordTest (e) {
      var file = e.target.files[0];   
      // Do something with the video file.
      var player = document.getElementById('player'); 
      player.src = URL.createObjectURL(file); 
    }

  
    let startButton = document.getElementById("startButton");
    let stopButton = document.getElementById("stopButton");

    let recordingTimeMS = 30000;

    function log(msg) {
      let logElement = document.getElementById("log");
      logElement.innerHTML += msg + "\n";
    }

    function wait(delayInMS) {
      return new Promise(resolve => setTimeout(resolve, delayInMS));
    }

    function startRecording(stream, lengthInMS) {
      let recorder = new MediaRecorder(stream);
      let data = [];
    
      recorder.ondataavailable = event => data.push(event.data);
      recorder.start();
      log(recorder.state + " for " + (lengthInMS/1000) + " seconds...");
    
      let stopped = new Promise((resolve, reject) => {
        recorder.onstop = resolve;
        recorder.onerror = event => reject(event.name);
      });
    
      let recorded = wait(lengthInMS).then(
        () => recorder.state == "recording" && recorder.stop()
      );
    
      return Promise.all([
        stopped,
        recorded
      ])
      .then(() => data);
    }

    function stop(stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    function ready() {
      let recording = document.getElementById("recording");
      let preview = document.getElementById("preview");
      let downloadButton = document.getElementById("downloadButton");
      
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(stream => {
        preview.srcObject = stream;
        downloadButton.href = stream;
        preview.captureStream = preview.captureStream || preview.mozCaptureStream;
        return new Promise(resolve => preview.onplaying = resolve);
      }).then(() => startRecording(preview.captureStream(), recordingTimeMS))
      .then (recordedChunks => {
        let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
        recording.src = URL.createObjectURL(recordedBlob);
        downloadButton.href = recording.src;
        downloadButton.download = "RecordedVideo.webm";
    
        log("Successfully recorded " + recordedBlob.size + " bytes of " +
            recordedBlob.type + " media.");
      })
      .catch(log);
    
    }

    // startButton.addEventListener("click", function() {}, false);

    function stoppy () {
      let preview = document.getElementById("preview");
      stop(preview.srcObject);
    }
         
    // stopButton.addEventListener("click", function() {
    // }, false);
  
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

                {/* <input type="file" capture="camera" onChange={normalRecordTest} id="recorder"/><video id="player" controls></video> */}
           
                <div className="left">
                  <div id="startButton" className="button" onClick={ready}>
                    Start
                  </div>
                  <h2>Preview</h2>
                  <video id="preview" width="160" height="120" autoplay muted controls></video>
                </div>

                <div className="right">
                  <div id="stopButton" className="button" onClick={stoppy}>
                    Stop
                  </div>
                  <h2>Recording</h2>
                  <video id="recording" width="160" height="120" controls></video>
                  <a id="downloadButton" class="button">
                    Download
                  </a>
                </div>
                <p id='log'></p>

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