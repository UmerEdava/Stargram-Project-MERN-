import React, { useEffect } from 'react'
import './MessagePage.css'
import InboxPicture from '../../../images/input.jpg'
import DraftsPicture from '../../../images/drafts-icon.png'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


export default function MessagePage() {
    var allMessages = ""
    var allDrafts = ""
    useEffect(() => {

        let test = 'test'

        

        var messages = 0
        var drafts = 0

  
        allMessages = messages
        allDrafts = drafts

        
     
          if(messages){
            var elements = document.getElementsByClassName('demo');

            while(elements.length > 0){
                elements[0].parentNode.removeChild(elements[0]);
            }

            document.getElementById("draftsList").style.display = 'none'
            document.getElementById("draftsImage").style.display = 'none'
            document.getElementById("draftsLabel").style.display = 'none'
          } else{
            document.getElementById("chatList").style.display = 'none'
            document.getElementById("draftsList").style.display = 'none'
            document.getElementById("draftsImage").style.display = 'none'
            document.getElementById("draftsLabel").style.display = 'none'
          }

        //   if(drafts){
        //     var elements = document.getElementsByClassName('draftDemo');
        //     while(elements.length > 0){
        //         elements[0].parentNode.removeChild(elements[0]);
        //     }
        //   } else{
        //     document.getElementById("draftsList").style.display = 'none'
        //   }
    
    })


    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          backgroundColor: theme.palette.background.paper,
        },
        inline: {
          display: 'inline',
        },
      }));

      function UserGreeting(props) {
        return <h1>Welcome back!</h1>;
      }
      
      function GuestGreeting(props) {
        return <h1>Please sign up.</h1>;
      }

    function myTest(props){
        let mes = props.isMessage
        if(mes){
            return <h2>message und</h2>
        }
            return <h2>message illa</h2>
        
    }

    function inboxButton (e) {
        let button = e.target 
        if(button.value != 'active'){
            document.querySelectorAll('.btn').forEach(e => e.classList.remove('active'));
            button.classList.add('active');
            if(allMessages){

            }else{
                document.getElementById('demoImage').src = InboxPicture
                document.getElementById('label').textContent = 'Your messages will appear here'
            }
        }
    }

    function draftsButton (e) {
        let button = e.target 
        if(button.value != 'active'){
            document.querySelectorAll('.btn').forEach(e => e.classList.remove('active'));
            button.classList.add('active');
            
            if(allDrafts){

            }else{
                document.getElementById('draftsImage').src = DraftsPicture
                document.getElementById('draftsLabel').textContent = 'Drafted messages will appear here'
            }
            
        }
    }
    const classes = useStyles();


      


    return (
        <div>
            <div className="text-center box-parent">
                <div className="box">
                    <div className="row">
                        <div className="col-6 pr-0">
                            <button className="btn message-category-button active" onClick={inboxButton}>Inbox</button>
                        </div>
                        <div className="col-6 pl-0">
                            <button className="btn message-category-button" onClick={draftsButton}>Drafts</button>
                        </div>
                    </div>

                    <img src={InboxPicture} className="inputPicture demo" id="demoImage"></img>
                    <p id="label" className="demo">Your messages will appear here</p>

                    <img src={DraftsPicture} className="inputPicture draftDemo" id="draftsImage"></img>
                    <p id="draftsLabel" className="draftDemo">Your draft messages will appear here</p>

                    <List className={classes.root} id="chatList">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Amal"
                secondary={
                  <React.Fragment>
                    
                    {"5 minutes ago"}
                  </React.Fragment>
                }
              />
              <span style={{marginTop: "13px",color: "rgb(167 167 167 / 84%)"}}>read</span>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Nikhil Kilivayil"
                secondary={
                  <React.Fragment>
                    {"5 days ago"}
                  </React.Fragment>
                }
              />
              
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Ziyaf Muhammed"
                secondary={
                  <React.Fragment>
                    {'7 days ago'}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Muhammed Faizal"
                secondary={
                  <React.Fragment>
                    {'7 days ago'}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>

          <List className={classes.root} id="draftsList">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Elon Musk"
                secondary={
                  <React.Fragment>
                    
                    {"5 minutes ago"}
                  </React.Fragment>
                }
              />
              <span style={{marginTop: "13px",color: "rgb(167 167 167 / 84%)"}}>read</span>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Nikhil Kilivayil"
                secondary={
                  <React.Fragment>
                    {"5 days ago"}
                  </React.Fragment>
                }
              />
              
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>


            <myTest isMessage={true}/>

                </div>
            </div>
        </div> 
    )
}