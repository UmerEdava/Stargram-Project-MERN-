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
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StopIcon from '@material-ui/icons/Stop';
import SendIcon from '@material-ui/icons/Send';
import VideoThumbnail from 'react-video-thumbnail';
import defaultDp from '../../../../images/stargram-user.jpg'; 
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ShareIcon from '@material-ui/icons/Share';

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
    const [alertOpen, setAlertOpen] = useState(false);
    
    const history = useHistory()
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [shareAlertOpen, setShareAlertOpen] = useState(false);
    const [selectedToFavourites, setSelectedToFavourites] = useState()

    const handleShareClickOpen = (messageId) => {
      setShareAlertOpen(true);
      setSelectedToFavourites(messageId)
    };

    const handleShareAlertClose = () => {
      setShareAlertOpen(false);
    };


    const [chat,setChat] = useState()
    const [response,setResponse] = useState()
    const userId = localStorage.getItem('userId')


    let outerSocket;

    useEffect(()=>{

      let token = localStorage.getItem('token')
      let starToken = localStorage.getItem('starToken')

      const socket = socketIOClient.connect(server)

      outerSocket = socket

      function UrlExists(url) {
          var http = new XMLHttpRequest();
          http.open('HEAD', url, false);
          http.send();
          if( http.status!= 404 ){
              console.log('found')
              let userPic = server+'/images/profile-pictures/'+starId+'.jpg'
              document.getElementById('chatDp').src = userPic
          } else {
              console.log('not found');
              document.getElementById('chatDp').src = defaultDp
          }
      }

      axios.post(server+'/checkVerified',{
        starId:starId
      }).then((response)=>{
        console.log(response.data)
        if(response.data.isStar){
          document.getElementById('chatDp').src = server+'/images/profile-pictures/Celebrities/'+starId+'.jpg'
          console.log('in if isStar') 
          document.getElementById('cVerfiedIcon').style.display = 'inline-block'
        }else{
          let userPic = server+'/images/profile-pictures/'+starId+'.jpg'
          UrlExists(userPic)
          document.getElementById('cVerfiedIcon').style.display = 'none'
        }
      })

      document.getElementById('chatDp').src = 

      // if(!token&&!starToken){
      //   console.log('ondey..');
      //   history.push('/login')
      // }

      // socket.on(`from:${userId},to:${starId}`||`from:${starId},to:${userId}`,(data)=>{
      //   console.log('reply');
      //   let chatBody = document.getElementById('chatBody')

      //   // let chatVideo = document.getElementsByClassName('chatVideo')
      //   // chatVideo.style.display = 'block'
      //   // chatVideo.src = data 

      //   let video = document.createElement("video");
      //   let outer = document.createElement("div")
        
      //   video.classList.add('chatVideo');
      //   outer.classList.add('outer');
      //   video.src = data
      //   video.onclick = function(event) {
      //     video.requestFullscreen();
      //     video.play();
      //   }
        
      //   video.addEventListener(
      //     'fullscreenchange',
      //     function(event) {
      //       if (!document.fullscreenElement) {
      //         video.pause();
      //       }
      //     },
      //     false
      //   );

      //   outer.appendChild(video)
      //   chatBody.append(outer)

      // })

      // user: username2, anotherUser: username1
      socket.emit('join', `${userId}--with--${starId}`);
      
     
      
    },[])

    useEffect(() => {
      // receive message
    outerSocket.on('onMessage', message => {
        
      console.log('reply');
      
      let chatBody = document.getElementById('chatBody')

          // let chatVideo = document.getElementsByClassName('chatVideo')
          // chatVideo.style.display = 'block'
          // chatVideo.src = data 

          let oldChat = response.data.oldChat

          oldChat.map((message,index)=>{
            let video = document.createElement("video");
            let outer = document.createElement("div");
            let bubble = document.createElement("div");
            let shareContainer = document.createElement("div")
            let downloadContainer = document.createElement("div")
            let optionsDiv = document.createElement("div")
            let dateText = document.createElement("p");
            
            video.classList.add('chatVideo');
            if(message.sender == starId){
              outer.classList.add('outerLeft')
              dateText.classList.add('dateTextLeft');

              // shareContainer.classList.add('shareContainer')
              // downloadContainer.classList.add('downloadContainer')

            }else if(message.sender == userId){
              outer.classList.add('outer');
              dateText.classList.add('dateText');
            }
            
            bubble.classList.add('bubble');
  
            video.src = `${server}/chatVideos/${message._id}.mp4`
            dateText.textContent = message.date
            video.onclick = function(event) {
              video.requestFullscreen();
              video.play();
            }
            
            video.addEventListener(
              'fullscreenchange',
              function(event) {
                if (!document.fullscreenElement) {
                  video.pause();
                }
              },
              false
            );
  
            outer.appendChild(video)
            // chatBody.append(outer)
            // chatBody.appendChild(dateText) 
            bubble.appendChild(outer)
            optionsDiv.appendChild(shareContainer)
            optionsDiv.appendChild(downloadContainer)
            bubble.appendChild(optionsDiv)
            // bubble.appendChild(shareContainer)
            // bubble.appendChild(downloadContainer)
            bubble.appendChild(dateText)
            chatBody.append(bubble)
  
            var elem = document.getElementById('chatBody'); 
            elem.scrollTop = elem.scrollHeight;
          })
    });
    
    }, [])

    useEffect(() => {
      axios.post(server+'/getOldChat',{
        thisUser:userId,
        otherUser:starId
      }).then((response)=>{
        console.log('oldChat',response.data)
        
        if(response.data.oldChat){
          let chatBody = document.getElementById('chatBody')

          // let chatVideo = document.getElementsByClassName('chatVideo')
          // chatVideo.style.display = 'block'
          // chatVideo.src = data 

          let oldChat = response.data.oldChat

          oldChat.map((message,index)=>{
            let video = document.createElement("video");
            let outer = document.createElement("div");
            let bubble = document.createElement("div");
            let shareContainer = document.createElement("div")
            let downloadContainer = document.createElement("div")
            let optionsDiv = document.createElement("div")
            let dateText = document.createElement("p");
            let share = document.createElement("i")
            let download = document.createElement("i")        
            
            shareContainer.addEventListener('click',(e)=>{
              handleShareClickOpen(message._id)
            })

            shareContainer.classList.add('shareContainer')
            downloadContainer.classList.add('downloadContainer')
            share.classList.add('fas', 'fa-share-alt');
            share.classList.add('shareIcon')
            download.classList.add('fas', 'fa-arrow-down')
            download.classList.add('downloadIcon')
            
            video.classList.add('chatVideo');
            if(message.sender == starId){
              outer.classList.add('outerLeft')
              dateText.classList.add('dateTextLeft');

              optionsDiv.classList.add('optionsDiv')

            }else if(message.sender == userId){
              outer.classList.add('outer');
              dateText.classList.add('dateText'); 
              optionsDiv.classList.add('optionsDivRight')

            }
            
            bubble.classList.add('bubble');
  
            video.src = `${server}/chatVideos/${message._id}.mp4`
            dateText.textContent = message.date
            video.onclick = function(event) {
              video.requestFullscreen();
              video.play();
            }
            
            video.addEventListener(
              'fullscreenchange',
              function(event) {
                if (!document.fullscreenElement) {
                  video.pause();
                }
              },
              false
            );
  
            outer.appendChild(video)
            // chatBody.append(outer)
            // chatBody.appendChild(dateText) 
            // if(message.sender == starId) {
              bubble.appendChild(outer)
              shareContainer.appendChild(share)
              downloadContainer.appendChild(download)
              optionsDiv.appendChild(shareContainer)
              optionsDiv.appendChild(downloadContainer)
              bubble.appendChild(optionsDiv)
              // bubble.appendChild(shareContainer)
              // bubble.appendChild(downloadContainer)
              bubble.appendChild(dateText)
              chatBody.append(bubble)
            // }else if(message.sender == userId) {
            //   shareContainer.appendChild(share)
            //   downloadContainer.appendChild(download)
            //   optionsDiv.appendChild(shareContainer)
            //   optionsDiv.appendChild(downloadContainer)
            //   bubble.appendChild(optionsDiv)
            //   bubble.appendChild(outer)
            //   // bubble.appendChild(shareContainer)
            //   // bubble.appendChild(downloadContainer)
            //   bubble.appendChild(dateText)
            //   chatBody.append(bubble)
            // }
            
            
  
            var elem = document.getElementById('chatBody'); 
            elem.scrollTop = elem.scrollHeight;
          })     
        }

      })     
    }, [])
    
         

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

    // function startRecording(stream, lengthInMS) {
    //   let recorder = new MediaRecorder(stream);
    //   let data = [];
    
    //   recorder.ondataavailable = event => data.push(event.data);
    //   recorder.start();
    //   log(recorder.state + " for " + (lengthInMS/1000) + " seconds...");
    
    //   let stopped = new Promise((resolve, reject) => {
    //     recorder.onstop = resolve;
    //     recorder.onerror = event => reject(event.name);
    //   });
    
    //   let recorded = wait(lengthInMS).then(
    //     () => recorder.state == "recording" && recorder.stop()
    //   );
    
    //   return Promise.all([
    //     stopped,
    //     recorded
    //   ])
    //   .then(() => data);
    // }

    // function stop(stream) {
    //   stream.getTracks().forEach(track => track.stop());
    // }

    // function ready() {
    //   let recording = document.getElementById("recording");
    //   let preview = document.getElementById("preview");
    //   let downloadButton = document.getElementById("downloadButton");
      
    //   navigator.mediaDevices.getUserMedia({
    //     video: true
    //   }).then(stream => {
    //     preview.srcObject = stream;
    //     downloadButton.href = stream;
    //     preview.captureStream = preview.captureStream || preview.mozCaptureStream;
    //     return new Promise(resolve => preview.onplaying = resolve);
    //   }).then(() => startRecording(preview.captureStream(), recordingTimeMS))
    //   .then (recordedChunks => {
    //     let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
    //     recording.src = URL.createObjectURL(recordedBlob);
    //     downloadButton.href = recording.src;
    //     downloadButton.download = "RecordedVideo.webm";
    
    //     log("Successfully recorded " + recordedBlob.size + " bytes of " +
    //         recordedBlob.type + " media.");
    //   })
    //   .catch(log);
    
    // }

    // startButton.addEventListener("click", function() {}, false);

    // function stoppy () {
    //   let preview = document.getElementById("preview");
    //   stop(preview.srcObject);
    // }
         
    // stopButton.addEventListener("click", function() {
    // }, false);
  
    // function hasGetUserMedia() {
    //   console.log('function called')
    //   return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    // }
    // if (hasGetUserMedia()) {
    //   // Good to go!
    //   alert('good')
    // } else {
    //   alert("getUserMedia() is not supported by your browser");
    // }

    const constraints = {
      video: true,
    };
    
    // const video = document.getElementById('myVideo');

    function openCamera () {
      console.log('function called')

      axios.get('http://localhost:3001/getUserDetailsAndIdentification',{
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
      }).then(function (response) {
        // handle success
        console.log('wit',response.data)
        let userDetails = response.data.details
        if(userDetails.messageReceived == true || userDetails.messageSent == false){

          if(response.data.isUser){
            if(userDetails.creditMessages != 0){
              document.getElementById('myVideo').style.display = 'block'
              navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                // video.srcObject = stream;
                console.log('aahh',stream)
                document.getElementById('cameraButton').style.display = 'none'
                document.getElementById('record').style.display = 'inline-block'
                document.getElementById('myVideo').srcObject = stream
                document.getElementById('record').disabled = false;
                window.stream = stream;
              });
            }else{
              //no credit error
              document.getElementById('noCreditWarning').style.display = 'block'

            }
          }else if(response.data.isStar){
            document.getElementById('myVideo').style.display = 'block'
              navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                // video.srcObject = stream;
                console.log('aahh',stream)
                document.getElementById('cameraButton').style.display = 'none'
                document.getElementById('record').style.display = 'inline-block'
                document.getElementById('myVideo').srcObject = stream
                document.getElementById('record').disabled = false;
                window.stream = stream;
            });
          }
          
        }else if(userDetails.messageSent == true){
          setAlertOpen(true)
        }
      })  

      
    }

    function recordnew () {
      console.log('record function called')
      let recordButton = document.getElementById('booleanButton')
      if (recordButton.textContent === 'Record') {
        startRecording();
      } else {
        stopRecording();
        recordButton.textContent = 'Record';
        document.getElementById('myVideo').style.display = 'none'
        document.getElementById('resultVideo').style.display = 'block'
        document.getElementById('stopButton').style.display = 'none'
        document.getElementById('sendButton').style.display = 'inline-block'
      }
    }

    let recordedBlobs ;
    let mediaRecorder;

    function startRecording() {
      console.log('recording started')
      document.getElementById('record').style.display = 'none'
      document.getElementById('stopButton').style.display = 'inline-block'

      recordedBlobs = [];
      let options = {mimeType: 'video/webm;codecs=vp9,opus'};
      try {
        mediaRecorder = new MediaRecorder(window.stream, options);
      } catch (e) {
        console.error('Exception while creating MediaRecorder:', e);
        // errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
        return;
      }
    
      console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
      document.getElementById('booleanButton').textContent = 'Stop Recording';
      
      mediaRecorder.onstop = (event) => {
        console.log('Recorder stopped: ', event);
        console.log('Recorded Blobs: ', recordedBlobs);
      };
      
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start();
      console.log('MediaRecorder started', mediaRecorder);
    }

    function handleDataAvailable(event) {
      console.log('handleDataAvailable', event);
      if (event.data && event.data.size > 0) {   
        recordedBlobs.push(event.data);
      }
    }

    function stopRecording() {
      console.log('stop called')
      mediaRecorder.stop();
    }

    function playButton () {
      console.log('play button clicked')
      let recordedVideo = document.getElementById('resultVideo')
      const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
      recordedVideo.src = null;
      recordedVideo.srcObject = null;
      recordedVideo.src = window.URL.createObjectURL(superBuffer);
      recordedVideo.controls = true;
      recordedVideo.play();
    }

    useEffect(() => {
      document.getElementById('sendButton').addEventListener('click',()=>{

          console.log('bblob or:',recordedBlobs)
          const bufferOrBlob = new Blob(recordedBlobs, {type: 'video/webm'});
    
    
          var reader = new FileReader();
          reader.readAsDataURL(bufferOrBlob); 
          
          reader.onloadend = function() {
              var base64data = reader.result;                
              console.log('converted to base64');
              // socket.emit('message',({from:userId,to:starId,message:base64data})) 
    
              // send message
              let message = {sender:userId,receiver:starId,msg:base64data}
              outerSocket.emit(`emitMessage`, message)
          }

          // axios({
          //   method: 'post',
          //   url: `${server}/makeMessageSentAndReceived`,
          //   data: {
          //     sender: userId,
          //     receiver: starId
          //   },
          //   headers: {"x-access-token": localStorage.getItem("token")}
          // }).then((response)=>{
          //   console.log('res',response)
          // })
          
          // axios.post(server+'/makeMessageSentAndReceived',{

          // }, {
          //   headers: {
          //       "x-access-token": localStorage.getItem("token")
          //     }
          // }).then((response)=>{
          //   console.log('re',response.data)
          // })
    
          document.getElementById('resultVideo').style.display = 'none'
          document.getElementById('sendButton').style.display = 'none'
          document.getElementById('cameraButton').style.display = 'inline-block'
      })
      
    }, []) 

    

    //  function screenshotButton () {
    //   const canvas = document.createElement("canvas");
    //   const videoo = document.getElementById('myVideo')

    //   canvas.width = document.getElementById('myVideo').videoWidth;
    //   canvas.height = document.getElementById('myVideo').videoHeight;
    //   canvas.getContext("2d").drawImage(videoo, 0, 0);
    //   // Other browsers will fall back to image/png
    //   img.src = canvas.toDataURL("image/webp");
    // }; 

    function addToFavourites () {
      axios.post(server+'/addToFavourites',{
        messageId:selectedToFavourites,
      }).then((response) => {
        console.log(response)
      })
    }
    
    return (
        
        <div style={{paddingTop: '3.53rem'}}>        
            <div id="chatbox">  
                <div id='chatHead'>
                    <img onClick={()=>history.push(`/secondProfile/${starId}`)} id='chatDp' alt='profile-picture'></img>
                    <h6 onClick={()=>history.push(`/secondProfile/${starId}`)} style={{display:'inline',marginLeft:'1rem',cursor:'pointer'}}>{displayName} </h6>
                    <Icon onClick={()=>history.push(`/secondProfile/${starId}`)} icon={sharpVerified} id='cVerfiedIcon' style={{color: '#3a86fe',verticalAlign:'middle',display:'none'}}  />
                </div>
                <div id='chatBody'>
                  <video autoplay='true' id='myVideo' style={{width:'100%',height:'100%',display:'none',objectFit:'fill'}}></video>
                  <video id="resultVideo" onClick={playButton} style={{width:'100%',height:'100%',display:'none',objectFit:'fill'}} controls='true' ></video>
                
                {/* <div id='outer'>
                  <video id='chatVideo' style={{display:'none',position:'relative'}}></video>
                </div> */}

                {/* <img src='https://pbs.twimg.com/profile_images/2152052100/t_400x400.png' id='chatBubbleImage'></img>
                
                <VideoThumbnail
                    videoUrl="https://dl.dropboxusercontent.com/s/7b21gtvsvicavoh/statue-of-admiral-yi-no-audio.mp4?dl=1"
                    thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                    width={120}
                    height={80}
                    /> */}

{/* width: 9rem;
    height: 11rem;
    float: right;
    margin-right: 18px;
    margin-top: 23px;
    border-radius: 8px; */}

            <Collapse in={alertOpen} id="alertContainer">
              <Alert
                 variant="filled" severity="" 
                 id='alertMessage'
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setAlertOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                You can send another another message only after you get a reply
              </Alert>
            </Collapse>
          
                  <div id='noCreditWarning' style={{display:'none'}}>
                    <p>Oh no..<span>??????</span></p>
                    <p>You need message credits to send this message</p>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => {
                          history.push('/buy_message');
                      }}
                      id='noCreditBuyNowButton'
                      >
                        Buy Now
                    </Button>
                  </div>
            
                
                </div>
                <div id='chatFooter' className='text-center'>
                    <button className='btn' onClick={openCamera} className='commonButton' id='cameraButton' style={{paddingBottom:'4px'}}><Icon icon={baselineCameraAlt} style={{color: 'white'}} /></button>
                    <button className='btn' onClick={recordnew} className='startAndStopBtn' id='record' style={{paddingBottom:'4px',display:'none'}}><FiberManualRecordIcon style={{color:'#ff3939'}}/></button>
                    <button className='btn' onClick={recordnew} className='startAndStopBtn' id='stopButton' style={{paddingBottom:'4px',display:'none'}}><StopIcon style={{color:'white'}}/></button>
                    <button className='btn' className='commonButton' id='sendButton' style={{paddingBottom:'4px',display:'none'}}><SendIcon style={{color:'white'}}/></button>

                   
                    <Icon icon={info20Regular} style={{color: '#929292',fontSize: '23px',cursor:'pointer'}} onClick={handleClickOpen}/>
                </div>
                
                <button id="booleanButton" hidden >Record</button>
                {/* <button id='play' onClick={playButton}>play</button> */}
                

                {/* <video id="player" controls></video> */}
           
                {/* <div className="left">
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
                <p id='log'></p> */}

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

            {/* Share alert popup */}
            <Dialog
              open={shareAlertOpen}
              onClose={handleShareAlertClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description" style={{color:'black',fontWeight:'600'}}>
                  Do you want to share this message to your profile?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleShareAlertClose} color="primary" style={{color:'black'}}>
                  Cancel
                </Button>
                <Button  color="primary" onClick={addToFavourites} autoFocus style={{color:'black'}}>
                  Share
                </Button>
              </DialogActions>
            </Dialog>

        </div>
    )
}