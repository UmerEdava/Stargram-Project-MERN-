import React, { useEffect } from 'react'
import {useHistory,useParams} from 'react-router-dom'
import photo from '../../../images/stargram-user.jpg';
import { Icon, InlineIcon } from '@iconify/react';
import sharpVerified from '@iconify/icons-ic/sharp-verified';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MuiMenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import server from '../../../Server'

export default function OtherPersonProfile(props) {
    console.log('props',props)
    const {starId} = useParams()
    console.log('params',starId)
    var displayName 

    useEffect(()=>{
        axios.get(server+`/getCelebrityDetails/?starId=${starId}`)
            .then(function (response) {
                // handle success
                console.log(response);
                displayName = response.data.displayName
                document.getElementById('displayName').textContent = response.data.displayName+' '
                document.getElementById('messages').textContent = response.data.messages+' Messages'
                document.getElementById('followers').textContent = response.data.followers+' Followers'
                document.getElementById('bio').textContent = response.data.bio
                document.getElementById('dp').src = `${server}/images/profile-pictures/Celebrities/${response.data._id}.jpg`
            })
    })
    //  const { id } =
    // (props.location && props.location.state) || {};
    // console.log('ii',props.location.state)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    const MenuItem = withStyles({
        root: {
          justifyContent: "flex-start"
        }
      })(MuiMenuItem);

    const history = useHistory()
    return (
        <div>
            <div id='profileBox' className='text-center'>
            <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    style={{float:'right'}}
                >
                    <MoreVertIcon style={{color:'black'}}/>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Copy Profile Link</MenuItem>
                <MenuItem onClick={handleClose}>Share this profile</MenuItem>
            </Menu>
            <div className='row container-fluid' style={{marginTop:'5em',marginLeft:'0'}}>
                
                <div className='col-md-6'>               
                    <img id='dp' className='img-circle' style={{borderRadius:'50%',height:'8em'}}></img>       
                </div>      
                <div className='col-md-6' style={{marginBottom:'3em'}}>
                    <h3 id='displayName' style={{marginTop:'1em', display:'inline'}}> </h3><Icon icon={sharpVerified} style={{color: '#3a86fe',display:'inline',verticalAlign:'inherit'}}  />
                    <div style={{marginTop: "3rem"}}>
                    {/* <h6 style={{float:"left"}}>1 Credits</h6>
                    <h6 >0 Messages</h6>
                    <h6 >0 Followers</h6> */}
                    <span id='messages' style={{marginRight:"2rem"}} className="belongings"></span>
                    <span id='followers' className="belongings">0 Followers</span>
                    <p id='bio' style={{marginTop:"1rem",marginBottom:'2em',fontSize:'16px'}} className="bio">Hi guys!! please support me on stargram</p>
                </div>

                    <button className='btn btn-primary mr-4' style={{backgroundColor: 'white',color: '#3a86fe'}}>Follow</button>
                    <button className='btn btn-primary' style={{backgroundColor:'#3a86fe'}} onClick={()=>{history.push(`/chatbox/${displayName}/${starId}`)}}>Message</button>
                </div>
                <h4 style={{marginLeft:'4vw'}}>Favourite Messages</h4>
                

            </div> 
            </div>
        </div>
    )
}
