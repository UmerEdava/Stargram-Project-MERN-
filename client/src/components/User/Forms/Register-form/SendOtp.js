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

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'



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



// function OtpCard() {
//   const classes = useStyles();

//   return (
//     <Card className={classes.root}>
//       <CardActionArea>
//         <CardMedia
//           className={classes.media}
//           image="/static/images/cards/contemplative-reptile.jpg"
//           title="Contemplative Reptile"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="h2">
//             Lizard
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//             Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
//             across all continents except Antarctica
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <Button size="small" color="primary">
//           Share
//         </Button>
//         <Button size="small" color="primary">
//           Learn More
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }



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
}));



export default function SendOtp(props) {
  const classes = useStyles();
  
  function checkAndNext(){

      otpMethod.phone = props.values.phone
      
      console.log('functionil keriye..',otpMethod);

      
        
            Axios({
              method: "post",
              url: "http://localhost:3001/sendOTP",
              headers: {
                "Content-Type": "application/json",
              },
              data: otpMethod,                
              
            }).then((response)=>{
              if(response.data.sent){
                console.log('sent..next');
                
                props.nextStep()

              }

            })
            //   .then((response) => {
            //       if(response.data.existingEmail){
            //         document.getElementById('cPasswordError').innerHTML = "Another account is using this email address"
            //       }else if(response.data.existingPhone){
            //         document.getElementById('cPasswordError').innerHTML = "Another account is using this phone number"
            //       }else if(response.data.existingUsername){
            //         document.getElementById('cPasswordError').innerHTML = "Sorry, this username is already exists"
            //       }else if(response.data.newUser){
            //           props.nextStep()
            //       }
                 
      
            //   //   if(response.data.email){
            //   //     console.log('ok',response);
            //   //     document.getElementById('signupForm').style.display = "none"
            //   //     //history.push("/");
            //   //   }else if(response.data.existingEmail){
            //   //     console.log('Existing email')
            //   //     document.getElementById('cPasswordError').innerHTML = "Another account is using this email address"
            //   //   }else if(response.data.existingPhone){
            //   //     console.log('Existing phone');
            //   //     document.getElementById('cPasswordError').innerHTML = "Another account is using this phone number"
            //   //   }
                
            //   })
            //   .catch((error) => {
            //      console.error(`Error :${error}`);
            //   });
          
          
     
}
  
  
  var [otpMethod,setOtpMethod] = useState({
    method:'sms'
  })

  const methodChange = e => {
    const method = e.target.value
    console.log(method);
  
    setOtpMethod({
      ...otpMethod,
       method: method
    });
  };

  console.log(setOtpMethod);

  const history = useHistory();

  const [registerUser, setRegisterUser] = useState({
    email: "",
    phone: "",
    password: ""
  });

  const [showOtp, setShowOtp] = useState(false)
  const onNext = () => setShowOtp(true)

  const changeHandler = (event) => {
    setRegisterUser({
      ...registerUser,
      [event.target.name]: event.target.value,
    });
  };
 
    

  const submitButton = (event) => {
    event.preventDefault();
    let cPass = document.getElementById('Cpassword').value
    if (registerUser.password !== cPass) {
      document.getElementById('cPasswordError').innerHTML = "Passwords doesn't match"
    }else{
    
      console.log("form submitting...");
      Axios({
        method: "post",
        url: "http://localhost:3001/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: registerUser,
      })
        .then((response) => {
           console.log('***',response);

          if(response.data.email){
            console.log('ok',response);
            document.getElementById('signupForm').style.display = "none"
            //history.push("/");
          }else if(response.data.existingEmail){
            console.log('Existing email')
            document.getElementById('cPasswordError').innerHTML = "Another account is using this email address"
          }else if(response.data.existingPhone){
            console.log('Existing phone');
            document.getElementById('cPasswordError').innerHTML = "Another account is using this phone number"
          }
          
        })
        .catch((error) => {
           console.error(`Error :${error}`);
        });
      }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img src={Logo} alt='Logo' height="40px;"></img>
        </Avatar>
        <Typography component="h1" variant="h5">
          Choose OTP method
        </Typography>
        <form className={classes.form} >
          
        <RadioGroup aria-label="otpMethod" name="otpMethod" value={otpMethod.method} >

      <Card className={classes.root}>
      <Button size="small" color="primary" onClick={props.previousStep}>
             Back
           </Button>
       <CardActionArea>
         <CardMedia
          className={classes.media}
         image="/static/images/cards/contemplative-reptile.jpg"
           title="Contemplative Reptile"
         />
         <CardContent>
           {/* <Typography gutterBottom variant="h5" component="h2">
             Send OTP to this number
           </Typography> */}
           

    <FormControlLabel value="sms" onChange={methodChange} control={<Radio />} label="Send OTP to this number" />
  
         </CardContent>
         </CardActionArea>
         
         
       </Card>

       <Card className={classes.root}>
       <CardActionArea>
         <CardMedia
          className={classes.media}
         image="/static/images/cards/contemplative-reptile.jpg"
           title="Contemplative Reptile"
         />
         <CardContent>
           {/* <Typography gutterBottom variant="h5" component="h2">
             Send OTP to this number
           </Typography> */}
           

    <FormControlLabel value="email" onChange={methodChange} control={<Radio />} label="Send OTP to this address" />
  
         </CardContent>
         </CardActionArea>
         
       </Card>
       </RadioGroup>
                
          
          
          <Button
            //type="submit"
            fullWidth
            variant="contained"
            color="primary"
            //className={classes.submit}
            onClick={checkAndNext}
          >
            Continue
          </Button>
          { showOtp ? <SendOtp /> : null }
          
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}