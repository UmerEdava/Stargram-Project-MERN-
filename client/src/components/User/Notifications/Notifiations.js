import React from 'react'
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
import NotificationPicture from '../../../images/notifications.jpeg' 

export default function Notifiations() {

    

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          backgroundColor: theme.palette.background.paper,
        },
        inline: {
          display: 'inline',
        },
    }))

    const classes = useStyles();

    return (
        <div>
           <div className="text-center box-parent">
                <div className="box">
                    <h6 className="text-left notification-label">Notifications</h6>

                    <img src={NotificationPicture} className="inputPicture demo" id="demoImage"></img>
                    <p id="label" className="demo">No notification to show</p>

                    {/* <img src={DraftsPicture} className="inputPicture draftDemo" id="draftsImage"></img>
                    <p id="draftsLabel" className="draftDemo">Your draft messages will appear here</p> */}

                    {/* <List className={classes.root} id="chatList">
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
          </List> */}


                </div>
            </div>
        </div>
    )
}
