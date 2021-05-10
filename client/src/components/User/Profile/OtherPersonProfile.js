import React from 'react'
import {useHistory} from 'react-router-dom'
import photo from '../../../images/stargram-user.jpg';
import { Icon, InlineIcon } from '@iconify/react';
import sharpVerified from '@iconify/icons-ic/sharp-verified';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MuiMenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

export default function OtherPersonProfile(props) {
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
                    <img src={photo} className='img-circle' style={{borderRadius:'50%',height:'8em'}}></img>       
                </div>      
                <div className='col-md-6' style={{marginBottom:'3em'}}>
                    <h3 style={{marginTop:'1em', display:'inline'}}>Username </h3><Icon icon={sharpVerified} style={{color: '#3a86fe',display:'inline',verticalAlign:'inherit'}}  />
                    <div style={{marginTop: "3rem"}}>
                    {/* <h6 style={{float:"left"}}>1 Credits</h6>
                    <h6 >0 Messages</h6>
                    <h6 >0 Followers</h6> */}
                    <span style={{marginRight:"2rem"}} className="belongings">0 Messages</span>
                    <span className="belongings">0 Followers</span>
                    <p style={{marginTop:"1rem",marginBottom:'2em',fontSize:'16px'}} className="bio">Hi guys!! please support me on stargram</p>
                </div>

                    <button className='btn btn-primary mr-4' style={{backgroundColor: 'white',color: '#3a86fe'}}>Follow</button>
                    <button className='btn btn-primary' style={{backgroundColor:'#3a86fe'}} onClick={()=>{history.push('/chatbox')}}>Message</button>
                </div>
                <h4 style={{marginLeft:'4vw'}}>Favourite Messages</h4>
                

            </div> 
            </div>
        </div>
    )
}
