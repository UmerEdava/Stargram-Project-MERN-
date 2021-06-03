import React, {useEffect,useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import logo from '../../../images/stargram_logo.png'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router';
import appbar from './appbar.css';
import server from '../../../Server'
import axios from 'axios'
import defaultDp from '../../../images/stargram-user.jpg';
import sharpVerified from '@iconify/icons-ic/sharp-verified';
import { Icon, InlineIcon } from '@iconify/react';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    cursor: 'pointer'
  },
  search: {
    left: '50%',
    /* width: 100%; */
    transform: 'translate(-50%, -50%)',
    top: '50%',
    position: 'absolute',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));



export default function Appbar() {
  useEffect(() => {
    var user = localStorage.getItem('user')
   
    console.log("effect...",user);
    
  })

  

  let user = localStorage.getItem('displayName')
  let history = useHistory()

  function logout(){
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    localStorage.removeItem('displayName')

    history.push('/login')
  }

  function profile(){
    history.push('/profile')
  }

  function home(){
    console.log('***');
    history.push('/')
  }

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={profile}>{user}</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={()=>{history.push('/messages')}}>
        <IconButton aria-label="show 4 new mails" color="inherit" >
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={()=>{history.push('/notifications')}}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  window.addEventListener('mouseup',function(event){
    var pol = document.getElementById('searchDropdown');
    if(event.target != pol && event.target.parentNode != pol){
        pol.style.display = 'none';
    }
  });  
  const [searchResult,setSearchResult] = useState([])
  function searchFunction(e){
    if(e.target.value != ""){
      console.log(e.target.value)
      axios.post(server+'/search',{
        keyword:e.target.value
      }).then((response)=>{
        console.log(response.data)
        let starSearch = response.data.starSearchResult;
        let userSearch = response.data.userSearchResult;
        let combined = starSearch.concat(userSearch);
        console.log('combined',combined)
        if(combined){
          document.getElementById('searchDropdown').style.display = 'block'
          if(combined.length > 0){
            document.getElementById('noResult').style.display = 'none'
            
            console.log('verifiers',combined)

            let currentUser = localStorage.getItem('userId')
            let obj = combined.find(o => o._id === currentUser);
            console.log('obj',obj)

            if(obj){
              let index = combined.findIndex(x => x._id === currentUser);
              combined.splice(index, 1);
            }

            setSearchResult(combined)
            console.log('state',searchResult)
          }else{
            document.getElementById('noResult').style.display = 'block'
            setSearchResult([])
          }
        }else{
          document.getElementById('searchDropdown').style.display = 'none'
        }

      })
    }else{
      document.getElementById('searchDropdown').style.display = 'none'
    }
  }

  // function UrlExists(url) {
  //   var http = new XMLHttpRequest();
  //   http.open('HEAD', url, false);
  //   http.send();
  //   return http.status!=404;
  // }

  function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if( http.status!= 404 ){
        console.log('found')
        return true
    } else {
        console.log('not found');
        return false
    }
  }

  return (
    <>
    <div className={classes.grow} style={{position: 'fixed',width: '100%',zIndex: 1}}>
      <AppBar position="static" style={{ background: '#FFFFFF' }}>
        <Toolbar>
          

          <img src={logo} onClick={home} id="logo" alt="logo" height="40px"></img>

            
          
          <Typography className={classes.title} id='navHeading' onClick={home} variant="h6" style={{ color: '#FDDC03' }} noWrap>
            Stargram
          </Typography>
          <div className={classes.search} style={{ backgroundColor : '#E5E5E5' }}>
            <div className={classes.searchIcon}>
              <SearchIcon style={{ color: '#424242' }} />
            </div>
            <InputBase
              style = {{ color : '#989898' }}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              // onChange={searchFunction}
              onKeyUp={searchFunction}
            />
            
          </div>

          

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" onClick={()=>{history.push('/messages')}} >
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" onClick={()=>{history.push('/notifications')}}>
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon style={{color:'black'}}/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      
    </div>

    <div className='searchDropdownBox' id='searchDropdown'>
      <div className='dropdownArrow'></div>
      <div className='searchResultBox'>
        <p className='noResult' id='noResult'>No result found</p>    

        {searchResult.map((data,index) => 
        <div className='searchListContainer' onClick={()=>history.push(`/secondProfile/${data._id}`)}>
          <div className='searchImageContainer'>
            
              <img className='searchImage' src={data.verified ? server+'/images/profile-pictures/Celebrities/'+ data._id + '.jpg' :
              UrlExists(server+'/images/profile-pictures/'+ data._id + '.jpg') ? server+'/images/profile-pictures/'+ data._id + '.jpg' : defaultDp}></img>
           
          </div>
          <div className='searchNameContainer'>
            <h5 style={{display:'inline-block'}}>{data.displayName}</h5>
            <Icon icon={sharpVerified} id='verfiedIcon' style={{color: '#3a86fe',verticalAlign:'text-top',marginLeft:'5px',display:data.verified ? 'inline-block' : 'none'}}  />
          </div>
        </div>
        )}
        
      </div> 
    </div>
    </>
  );
}