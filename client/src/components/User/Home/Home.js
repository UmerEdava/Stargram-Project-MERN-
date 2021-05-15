import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Appbar from '../Appbar/Appbar'
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import cover from '../../../images/cover.PNG';
import sampleStar from '../../../images/Karthik Surya.jpg';
import axios from "axios";
import server from '../../../Server'
import {ListItem,ListItemText} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: "FAFAFA",
    },
    gridList: {
      flexWrap: 'nowrap'
    },
    root: {
        maxWidth: "21vw",
      },
      media: {
        height: "44vh",
        
      },
  }));
  
  const tileData = [
  {
    img: 'images/image1.jpg',
    title: 'title'
  },
  {
    img: 'images/image2.jpg',
    title: 'title'
  },
  {
    img: 'images/image3.jpg',
    title: 'title'
  }
  ];

  // function otherProfile (id) {
  //     console.log('idd',id)
  //   //   history.push({
  //   //      pathname: '/secondProfile',
  //   //      state: id
  //   // })
  //   history.push('/secondProfile',id)
  //   }

function Home() {
    const classes = useStyles();
    let history = useHistory()

    // function checking (){
    //     var user = localStorage.getItem('user')
    //      var 
    // }

    useEffect(() => {
        var user = localStorage.getItem('user')
        let token = localStorage.getItem('token')
        let starToken = localStorage.getItem('starToken')

        if(starToken){
          axios.post('http://localhost:3001/checkCelebrityVerification', {
            
          },{
            headers:{
              "x-access-token": localStorage.getItem("starToken")
            }
          })
          .then(function (response) {
            console.log(response);
            if(response.data.notVerified){
              console.log('on verification process');
              history.push('/celebrity/onverification')
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        
        
        console.log("effect...",token,starToken);

        if(!token && !starToken){
            history.push('/login')
        }

        let referredUser = localStorage.getItem('referredUser')

        if(referredUser){

          

          localStorage.removeItem('referredUser')

        }

        axios.get(server+'/getAllVerifiedCelebrities').then((response)=>{
          console.log('verifiers',response.data)
          setStarDetails(response.data.verifiedCelebrities)
        
        })

    }, [])
         const [starDetails,setStarDetails] = useState([])
         console.log('varulla alle',starDetails)

        // var width = document.getElementById('card').offsetWidth
        
    

    return (

        <div>

            <Appbar/>   
            <div  style={{paddingTop: "6vh",paddingRight: "5vw",paddingLeft: "5vw"}}>
                <img src={cover} alt="cover" style={{width:"100%"}}></img>
                <div style={{marginTop: "6vh"}}>
                <h4># Trending on Stargram</h4>
                <div className="row">
                
                {starDetails.map((data,index) => 
                
                  <div className='col-3' id="card">
                   {/* <Card className={classes.root} key={index}>
                   <CardActionArea>
                   <CardMedia
                     className={classes.media}
                     image={server+'/images/profile-pictures/Celebrities/'+ data._id + '.jpg'}
                     title="Contemplative Reptile"
                   />                        
                   
                    </CardActionArea>
                    </Card> */}
                    {/* <Link to={{
                      pathname: "/secondProfile", 
                      state: data._id
                    }}> */}

                    <img onClick={()=>history.push(`/secondProfile/${data._id}`)}
                      src={server+'/images/profile-pictures/Celebrities/'+ data._id + '.jpg'} style={{height: '49vh',
                      width: '18vw',
                      borderRadius: '2%',
                      cursor:'pointer'}}>
                    </img>
      
                    {/* </Link>  */}
 
                     <h5 style={{marginTop: '8px',marginBottom: '2px'}}>{data.displayName}</h5>
                     <p style={{color: '#a7a0a0'}}>{data.bio.substr(0,29)}...</p>
                     {/* <p>{width}</p> */}
                  </div>
                  )}
                </div>
                
                </div>
           </div>
        </div>
    )
}

export default Home