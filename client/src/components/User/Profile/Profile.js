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
import settingsIcon from '@iconify/icons-system-uicons/settings';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import returnBackButton from '@iconify/icons-openmoji/return-back-button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import baselineEdit from '@iconify/icons-ic/baseline-edit';
import outlineCreditCard from '@iconify/icons-ic/outline-credit-card';
import Referral from '../../../images/referral.png'
import chatHelp20Regular from '@iconify/icons-fluent/chat-help-20-regular';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 600,
      hover:'none'
    //   backgroundColor: theme.palette.background.paper,
    },
    options: {
        color:'black',
        width:'16rem'
    },
    icons: {
        color: 'black',
        fontSize: '24px',
        marginRight: '14px'
    }
  }));

export default function Profile(){
    const classes = useStyles();

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

        const [open, setOpen] = React.useState(false);
        const theme = useTheme();
        const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

    return(
        <>
        <Appbar/>
        <div className="body container">
        <Row className='pt-5 container-fluid' style={{marginRight: "0",marginLeft: "0"}}>
            <Col className="text-center" md={5}>
                <img src={defaultDp} id="profilePicture" className="rounded-circlem"></img>            
            </Col>
            <Col id='detailsDiv' className="mt-3" md={7} >
                <h4 id="username"></h4><Icon onClick={handleClickOpen} icon={settingsIcon} id='settingsIcon'/>

                <div style={{marginTop: "2rem"}}>
                    {/* <h6 style={{float:"left"}}>1 Credits</h6>
                    <h6 >0 Messages</h6>
                    <h6 >0 Followers</h6> */}
                    <span style={{marginRight:"2rem"}} id="creditMessages" className="belongings"></span>
                    <span style={{marginRight:"2rem"}} className="belongings">0 Messages</span>
                    <span className="belongings">0 Followers</span>
                    <p style={{marginTop:"2rem"}} className="bio">Hi guys!! please support me on stargram</p>
                </div>
                {/* <Button variant="outline-secondary" size="lg" onClick={editProfile}>Edit Profile</Button>{' '}
                <Button variant="outline-secondary" size="lg">Payments</Button> */}
                <div className="mt-2">
                    <Button variant="outline-primary" size="lg" style={{width:'5.5rem', height: '37px', paddingTop:'0px'}}><Icon icon={shareAlt} style={{color: '#3278FF'}} /></Button>{' '}
                    <Button id='buyButton' variant="primary" size="lg" style={{height:'37px',paddingTop:'0px'}} onClick={buy}>Buy Messages</Button>
                </div>
            </Col>
            <hr style={{borderTop: '1px solid #dbdbdb',marginTop:'14rem'}}/>
        </Row>
        <hr/>
        <p id='favHeading'>Favourites</p>

        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title"><Icon onClick={handleClose} style={{fontSize:'32px',verticalAlign: 'bottom',cursor:'pointer'}} icon={returnBackButton} />{" Settings"}</DialogTitle>
            <Divider/>
            <DialogContent>
            <DialogContentText>
            <List component="nav" className={classes.root} aria-label="mailbox folders">
                <ListItem button onClick={editProfile}>
                <Icon icon={baselineEdit} className={classes.icons} /> <ListItemText primary="Edit Profile" className={classes.options} />
                </ListItem>                
                <ListItem button>
                <Icon icon={outlineCreditCard} className={classes.icons} /><ListItemText primary="Payments" className={classes.options} />
                </ListItem>
                <ListItem button>
                <img src={Referral} style={{height: '24px',marginRight: '12px'}}></img><ListItemText primary="Referral" className={classes.options} />
                </ListItem>
                <ListItem button>
                <Icon icon={chatHelp20Regular} className={classes.icons} /><ListItemText primary="Help" className={classes.options} />
                </ListItem>
            </List>
            </DialogContentText> 
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>

        </div>
            
        </>
    )
}