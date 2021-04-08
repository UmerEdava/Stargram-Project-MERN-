import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import RegisterCss from './Register.css';
import { useHistory } from "react-router";
import Axios from 'axios';
import Logo from '../../../../images/Stargram icon.jpg';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Card from '@material-ui/core/Card';

import CardActionArea from '@material-ui/core/CardActionArea';

import CardActions from '@material-ui/core/CardActions';

import CardContent from '@material-ui/core/CardContent';

import CardMedia from '@material-ui/core/CardMedia';
import User from '../../../../images/stargram-user.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Image} from 'react-bootstrap';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      
        Stargram
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



function clickPicture(){
    document.getElementById('profilePicInput').click()
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  img: {
    
    height: "10rem",
   
  }
}));



export default function ChangeProfilePicture(props) {
  const classes = useStyles();
  
  const history = useHistory();

  

// const changeHandler = (event) => {
//     setProfilePic({
//       ...profilePic,
//       [event.target.name]: event.target.value,
//     });
//   };

  const [profilePic, setProfilePic] = useState();

 
  const uploadImage = (event) => {
    console.log('changed',event.target.files[0]);
      setProfilePic({
      ...profilePic,
      [event.target.name]: event.target.files[0],
    });
  };
  

  function addProfilePicture(event){
    console.log('sending',profilePic);
    event.preventDefault();

    const formData = new FormData()
    formData.append('file', profilePic)

    Axios.post("http://localhost:3001/addProfilePic", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    Axios({
        method: "post",
        url: "http://localhost:3001/addProfilePic",
        headers: {
          "Content-Type": "application/json",
        },
        data: profilePic,
      }).then((response)=>{
          if(response.data.success){
              console.log('ok')
              history.push("/")
          }
      })
        
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img src={Logo} alt='Logo' height="40px;"></img>
        </Avatar>
        
        {/* <Avatar alt="Remy Sharp" src={User} className={classes.img} /> */}
        
        <Image src={User} className={classes.img} roundedCircle onClick={clickPicture}/>
        <form className={classes.form} onSubmit={addProfilePicture} encType='multipart/form-data'>
            <input type="file" name="profilePic" id="profilePicInput" onChange={uploadImage}  hidden></input>
          
          <Grid item xs={12}>
          
          </Grid>          
       
          <p id="cPasswordError" style={{ color: 'rgb(255 0 0)' }}></p>
          
          <p id="editPic" onClick={clickPicture} style={{ color: '#4949f5', textAlign:'center', cursor:'pointer' }}>Edit Profile Photo</p>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            // className={classes.submit}
            //onClick={props.nextStep}
          >
            Continue
          </Button>
          
        </form>
      </div>
      <Box mt={8} style={{ position: "absolute",bottom: "0" }}>
        <Copyright />
      </Box>
    </Container>
  );
}