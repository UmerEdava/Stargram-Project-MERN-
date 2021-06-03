import React, { useEffect,useState } from 'react'
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
import defaultDp from '../../../images/stargram-user.jpg'

export default function OtherPersonProfile(props) {
    console.log('props',props)
    const {starId} = useParams()
    console.log('params',starId)
    var displayName 

    const [following,setFollowing] = useState(false)

    useEffect(()=>{
        console.log('useeffect')

        axios.get(server+`/getCelebrityDetails/?starId=${starId}`)
            .then(function (response) {
                // handle success
                console.log('getotherdetails',response);
                var followersList = response.data.followers
                console.log('axios',followersList)
                displayName = response.data.displayName
                document.getElementById('displayName').textContent = response.data.displayName+' '
                document.getElementById('messages').textContent = response.data.messages+' Messages'
                document.getElementById('followers').textContent = response.data.followers.length+' Followers'
                document.getElementById('bio').textContent = response.data.bio

                // let starUrl = `${server}/images/profile-pictures/Celebrities/${response.data._id}.jpg`

                // let starUrlExists = UrlExists(starUrl)

                // function UrlExists(url) {
                //     var http = new XMLHttpRequest();
                //     http.open('HEAD', url, false);
                //     http.send();
                //     if( http.status!= 404 ){
                //         console.log('found')
                //         return true
                //     } else {
                //         console.log('not found');
                //     }
                // }

                if(response.data.verified){
                    document.getElementById('dp').src = `${server}/images/profile-pictures/Celebrities/${response.data._id}.jpg`
                    document.getElementById('oVerifiedIcon').style.display = 'inline'
                }else{
                    let userPic = server+'/images/profile-pictures/'+starId+'.jpg'
                    document.getElementById('oVerifiedIcon').style.display = 'none'
                    let dpExists = UrlExists(userPic)
                    if(dpExists){
                        document.getElementById('dp').src = server+'/images/profile-pictures/'+starId+'.jpg'
                    }else{
                        document.getElementById('dp').src = defaultDp
                    }
                }

                function UrlExists(url) {
                    var http = new XMLHttpRequest();
                    http.open('HEAD', url, false);
                    http.send();
                    if( http.status!= 404 ){
                        console.log('found')
                        // let userPic = server+'/images/profile-pictures/'+starId+'.jpg'
                        // document.getElementById('chatDp').src = userPic
                        return true
                    } 
                    return false
                }
            
                let currentUser = localStorage.getItem('userId')
                let isFollowing = followersList.find(e => e == currentUser)
                console.log('find return',followersList,currentUser,following)
                if(isFollowing){
                    setFollowing(true)                      
                }else{
                    setFollowing(false)     
                }
            
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

    function followButton () {

        if(following){
            axios.post(server+'/unFollow', {
                secondId : starId
            },{
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }).then((data)=>{
                    console.log('thne') 

                    setFollowing(false) 
             
            })
        }else{
            axios.post(server+'/follow', {
                secondId : starId
            },{
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }).then((data)=>{
                    console.log('then',data)
                    setFollowing(true)
                
            })
        }

    }

    function unfollowButton () {

    }

    return (
        <div style={{paddingTop:'2rem'}}>
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
                    <img id='dp' className='img-circle' style={{borderRadius:'50%',height:'8em',width:'8em'}}></img>       
                </div>      
                <div className='col-md-6' style={{marginBottom:'3em'}}>
                    <h3 id='displayName' style={{marginTop:'1em', display:'inline'}}> </h3>
                    <Icon icon={sharpVerified} id='oVerifiedIcon' style={{color: '#3a86fe',display:'none',verticalAlign:'inherit'}}  />
                    <div style={{marginTop: "3rem"}}>
                    {/* <h6 style={{float:"left"}}>1 Credits</h6>
                    <h6 >0 Messages</h6>
                    <h6 >0 Followers</h6> */}
                    <span id='messages' style={{marginRight:"2rem"}} className="belongings"></span>
                    <span id='followers' className="belongings">0 Followers</span>
                    <p id='bio' style={{marginTop:"1rem",marginBottom:'2em',fontSize:'16px'}} className="bio">Hi guys!! please support me on stargram</p>
                </div>

                    {/* {
                        following ? <button id='unfollowButton' className='btn btn-primary mr-4' style={{backgroundColor: 'white',color: 'rgb(119 119 119)',borderColor:'rgb(119 119 119)'}} onClick={unfollowButton}>Following</button> : <button id='followButton' className='btn btn-primary mr-4' style={following ? {backgroundColor: 'white',color: 'rgb(119 119 119)',borderColor:'rgb(119 119 119)'} : {backgroundColor: 'white',color: '#3a86fe'}} onClick={followButton}>Follow</button>
                    } */}

                    <button id='followButton' className='btn btn-primary mr-4' style={following ? {backgroundColor: 'white',color: 'rgb(119 119 119)',borderColor:'rgb(119 119 119)'} : {backgroundColor: 'white',color: '#3a86fe'}} onClick={followButton}>{following ? 'Following' : 'Follow'}</button>

                    {/* {if(setFollowing){
                       <button id='followButton' className='btn btn-primary mr-4' style={{backgroundColor: 'white',color: '#3a86fe'}} onClick={followButton}>Follow</button>

                    }else{
                        <button id='unfollowButton' className='btn btn-primary mr-4' style={{backgroundColor: 'white',color: 'rgb(119 119 119)',borderColor:'rgb(119 119 119)'}} onClick={unfollowButton}>Following</button>
                    }} */}

                    <button className='btn btn-primary' style={{backgroundColor:'#3a86fe'}} onClick={()=>{history.push(`/chatbox/${displayName}/${starId}`)}}>Message</button>
                </div>
                <h4 style={{marginLeft:'4vw'}}>Favourite Messages</h4>
                

            </div> 
            </div>
        </div>
    )
}
