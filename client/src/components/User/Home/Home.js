import React, { useState, useEffect } from "react";
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
        height: "35vh",
        
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
        console.log("effect...",user,token);

        if(!token){
            history.push('/login')
        }
    })
 

    return (

        <div>

            <Appbar/>   
            <div  style={{paddingTop: "6vh",paddingRight: "5vw",paddingLeft: "5vw"}}>        
                <img src={cover} alt="cover" style={{width:"100%"}}></img>
                <div style={{marginTop: "6vh"}}>

                   <Card className={classes.root}>
                   <CardActionArea>
                   <CardMedia
                     className={classes.media}
                     image={sampleStar}
                     title="Contemplative Reptile"
                   />
                   
                    </CardActionArea>
                    </Card>
                </div>
           </div>
        </div>
    )
}

export default Home