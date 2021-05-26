import React, {useEffect,useState} from 'react';
import {useHistory} from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import defaultDp from '../../../images/stargram-user.jpg';
import { Form,Row,Col } from 'react-bootstrap';
// import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Axios from 'axios';
import './Profile.css'
import Button from '@material-ui/core/Button';


import {Image} from 'react-bootstrap';



const useStyles = makeStyles((theme) => ({ 
  root: {
    display: 'flex',
    '& > *': {
      marginTop: theme.spacing(10),
      
      marginLeft: "14vw",
      marginRight: "14vw",
      marginBottom: theme.spacing(10),
      width: theme.spacing(120),
      height: theme.spacing(80),
    },
  },
  details: {
    marginTop: "7vh",
    marginLeft: "12vw"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function EditProfile() {
  const classes = useStyles();

  let history = useHistory()

  

  const [img, setImg] = useState()
  const [imgPreview, setImgPreview] = useState()
 
  let userId = localStorage.getItem('userId')
  console.log('uid',userId)

  const [name,setName] = useState();
  const [email,setEmail] = useState();

  useEffect(() => {
    let username = localStorage.getItem('displayName')
    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')

    if(!token){
      history.push('/login')
    }

    document.getElementById('eusername').innerHTML = username 

    Axios.get('http://localhost:3001/getUserDetails', {
        headers: {
            "x-access-token": localStorage.getItem("token")
          },
        }).then((response) => {
        console.log('response',response);
        if(response){
          console.log('in if');
          // document.getElementById('email').value = response.data.email
          setEmail(response.data.email)
          setName(response.data.displayName)
          console.log('evidde',email,name);
          
          // document.getElementById('usernameField').value = response.data.username
          document.getElementById("bio").defaultValue = response.data.bio;
          document.getElementById("dob").defaultValue = response.data.dob;
          document.getElementById("socialMedia").defaultValue = response.data.socialMedia;
          document.getElementById("gender").defaultValue = response.data.gender;

        }
    })
    
    let userPic = "http://localhost:3001/images/profile-pictures/"+userId+'.jpg'
    console.log('userPic',userPic)


    function UrlExists(url) {
      var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        if( http.status!= 404 ){
            console.log('found')
            setImg(userPic)
        } else {
            console.log('not found');
            // document.getElementById('profilePicture').src = defaultDp
            setImg(defaultDp)
        }
      }

      UrlExists(userPic)

})

  function changeDp(){

      document.getElementById('changeDp').click()    
      
  }

  const [profilePic, setProfilePic] = useState()

  const uploadImage = (event) => {
    console.log('changed',event.target.files[0]);
    setProfilePic({
        ...profilePic,
        "profilePic":event.target.files[0]    
    });

    document.getElementById('eprofilePicture').src = URL.createObjectURL(event.target.files[0])

    // const changeHandler = (event) => {
    //   setRegisterUser({
    //     ...registerUser,
    //     [event.target.name]: event.target.value,
    //   });
    // };

    console.log('nokkaamh',profilePic);

    // setImg(URL.createObjectURL(event.target.files[0]))
    
    // let profilePicture = document.getElementById('profilePicture')
    // let preview = URL.createObjectURL(event.target.files[0])
    // console.log('preview',preview);
    // profilePicture.src = URL.createObjectURL(event.target.files[0])

    const data = new FormData() 
    data.append('file', event.target.files[0]);
    console.log('bform',event.target.files[0]);

    
    console.log('idyee',userId);
    
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onloadend = function() {
        // console.log('RESULT: ', reader.result);
        var base = reader.result
        console.log('base::; - ',base);

        Axios.post("http://localhost:3001/changeProfilePic", {profilePic : base, userId : userId}, { 
        // receive two    parameter endpoint url ,form data
        }).then((response)=>{
        // console.log(response)
        //  setImg(document.getElementById('profilePicture').src = "http://localhost:3001" + response.data)
        
        })
      }
      reader.readAsDataURL(file);

    
      Axios.get(
        'https://localhost:3001'+userId+'.jpg',
        { responseType: 'arraybuffer' },
      )
      .then(response => {
        console.log('response',response);
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        setImg( "data:;base64," + base64 )
      });
  

    

    //   Axios.post('http://localhost:3001/changeProfilePic', event.target.files[0], {
    //     headers: {
    //         'Content-Type': 'multipart/form-data;'
    //     }
    //   }).then((response) => {
    //         console.log(response,"i response")
    //   })
  };

  //   for (var key of imageData.entries()) {
  //     console.log(key[0] + ', ' + key[1]);
  // }

    
  

  const [age, setAge] = React.useState('');

  const genderChange = (event) => {
    setAge(event.target.value);
  };

  const [userDetails, setUserDetails] = useState({
    email: email,
    username: name,
    socialMedia: "",
    bio: "",
    gender: "",
    dob: "",
  });

  const detailsHandler = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
    // let value = event.target.value
    // let field = event.target.name

    // console.log('nokkaam',value,field);

    // document.getElementById(field).value = value
  };

  function editDetails(){
    console.log('undalle',userDetails)
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(userDetails.email)) {
        console.log('correct')
        document.getElementById('emailError').style.display = "none"

        Axios.post('http://localhost:3001/changeUserDetails', {
          userDetails
        },{
          headers: {
              "x-access-token": localStorage.getItem("token")
          }
        })
        .then(function (response) {
          console.log(response);
        })

      } else if (userDetails.username=="") {
        console.log('incorrect');
        document.getElementById('usernameError').style.display = "block"
        document.getElementById('emailError').style.display = "none"

      } else {
        document.getElementById('usernameError').style.display = "none"

        document.getElementById('emailError').style.display = "block"

      }

  }

  return (
      <>
    <div className={classes.root}>
      <Paper variant="outlined" >
          <div className="row">
              <div className="col-md-3">
              <h4 className='sideOptions'>Edit Profile</h4>
              <h4 className='sideOptions'>Change Password</h4>

              </div>
              <div className="col-md-9">
                    <div id="details" className={classes.details}>
                        <img src={img} id="eprofilePicture"  className="rounded-circle" style={{float:"left"}}></img>  
                        <h4 id="eusername" style={{marginLeft: "13.3vw",marginTop: "2vw"}}></h4> 
                        <p style={{marginLeft: "13.3vw",color: "#007bff", cursor: "pointer"}} onClick={changeDp}>Edit profile photo</p>
                        <input type="file" id="changeDp" name="profilePic" onChange={uploadImage} hidden></input>
                        <div style={{marginTop:'3vw'}}>
                        <Form>
                        {/* <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                            Email : 
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control plaintext readOnly id="email" defaultValue="email@example.com" />
                            </Col>
                        </Form.Group> */}

                        <Form.Group as={Row} style={{width:"80%"}} controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                            Name :
                            </Form.Label>
                            <Col sm="7">
                            <Form.Control type="text" name="username" defaultValue={name} id="usernameField" onChange={detailsHandler} placeholder="Name" />
                            <p id="usernameError" style={{color:"red",marginBottom:'3px',display:'none'}}>Please enter your name</p>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} style={{width:"80%"}} controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                            Email :
                            </Form.Label>
                            <Col sm="7">
                            <Form.Control type="text" name="email" defaultValue={email} id="email" onChange={detailsHandler} placeholder="Email" />
                            <p id="emailError" style={{color:"red",marginBottom:'3px',display:'none'}}>Invalid email</p>
                            </Col>
                        </Form.Group>

                        

                        <Form.Group as={Row} style={{width:"80%"}} controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                            Social media link :
                            </Form.Label>
                            <Col sm="7">
                            <Form.Control type="text" name="socialMedia" id="socialMedia" onChange={detailsHandler} placeholder="Social media link" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{width:"80%"}} controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                            Bio :
                            </Form.Label>
                            <Col sm="7">
                            <Form.Control type="text" id="bio" name="bio" onChange={detailsHandler} placeholder="Bio" />
                            </Col>
                        </Form.Group>
                        {/* <Form.Group as={Row} style={{width:"80%"}} controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                            Gender :
                            </Form.Label>
                            <Col sm="7">
                            <Form.Control type="text" placeholder="Gender" />
                            </Col>
                        </Form.Group> */}
                        <Form.Group as={Row} style={{width:"80%"}} name="gender" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                              Gender : 
                            </Form.Label>
                            <Col sm="7">
                          <FormControl className={classes.formControl} id="gender"  style={{marginTop: "-12px"}}>
                          
                          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="gender"
                            value={userDetails.gender}
                            name="gender"
                            onChange={detailsHandler}
                          >
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                            <MenuItem value={"LGBT"}>LGBT</MenuItem>
                          </Select>
                        </FormControl>                              
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} style={{width:"80%"}} controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                            Date of birth :
                            </Form.Label>
                            <Col sm="7">
                            <Form.Control type="date" name="dob" id="dob" onChange={detailsHandler} placeholder="Date of birth" />
                            </Col>
                        </Form.Group>

                        <Button
                          style={{width:"50%",marginLeft:"14%"}}
                          variant="contained"
                          color="primary"
                          className="text-right"
                          onClick={editDetails}
                        >
                          SAVE CHANGES
                        </Button>
                        </Form>
                        </div>
                    </div>
              </div>
          </div>

      </Paper>
      

    </div>
    
      </>
  );
}
