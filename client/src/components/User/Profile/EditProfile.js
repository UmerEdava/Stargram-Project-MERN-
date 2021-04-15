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
      height: theme.spacing(64),
    },
  },
  details: {
    marginTop: "15vh",
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

  useEffect(() => {
    let username = localStorage.getItem('username')
    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')

    if(!token){
      history.push('/login')
    }

    document.getElementById('username').innerHTML = username

    Axios.get('http://localhost:3001/getUserDetails', {
        headers: {
            "x-access-token": localStorage.getItem("token")
          },
        }).then((response) => {
        console.log(response);
    })
     
    
    if("http://localhost:3001/images/profile-pictures"+userId+'.jpg'){    
      setImg("http://localhost:3001/images/profile-pictures/"+userId+'.jpg')
    }else{
      setImg(defaultDp)
    }

    


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

    document.getElementById('profilePicture').src = URL.createObjectURL(event.target.files[0])

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
        console.log(response)
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

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
      <>
    <div className={classes.root}>
      <Paper variant="outlined" >
          <div className="row">
              <div className="col-md-3">
              <h4>Edit Profile</h4>

              </div>
              <div className="col-md-9">
                    <div id="details" className={classes.details}>
                        <img src={img} id="profilePicture"  className="rounded-circle" style={{float:"left"}}></img>  
                        <h4 id="username" style={{marginLeft: "15vw",marginTop: "2vw"}}></h4> 
                        <p style={{marginLeft: "15vw",color: "#007bff", cursor: "pointer"}} onClick={changeDp}>Edit profile photo</p>
                        <input type="file" id="changeDp" name="profilePic" onChange={uploadImage} hidden></input>
                        <div style={{marginTop:'5vw'}}>
                        <Form>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                            Email : 
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue="email@example.com" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} style={{width:"80%"}} controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                            Social media link :
                            </Form.Label>
                            <Col sm="7">
                            <Form.Control type="text" placeholder="Social media link" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{width:"80%"}} controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                            Bio :
                            </Form.Label>
                            <Col sm="7">
                            <Form.Control type="text" placeholder="Bio" />
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
                        <Form.Group as={Row} style={{width:"80%"}} controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                              Gender : 
                            </Form.Label>
                            <Col sm="7">
                          <FormControl className={classes.formControl} style={{marginTop: "-12px"}}>
                          
                          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={handleChange}
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
                            <Form.Control type="date" placeholder="Date of birth" />
                            </Col>
                        </Form.Group>
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
