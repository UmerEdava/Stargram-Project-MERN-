import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import axios from 'axios';
import logo from '../../../images/Stargram icon.jpg'


const useStyles = makeStyles({    
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export default function BuyMessage() {

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [messagePack, setMessagePack] = React.useState('female');

  const handleChange = (event) => {
    setMessagePack(event.target.value);
  };

  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
  }

  async function displayRazorpay () {

    console.log('radio',messagePack)

      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {    
          alert("Razorpay SDK failed to load. Are you online?");
          return;
      }

      // creating a new order
      const result = await axios.post("http://localhost:3001/buy_messages", {
        messagePack : messagePack
      });

      console.log('returneee',result);

      if (!result) {
          alert("Server error. Are you online?");
          return;
      }

      // Getting the order details back
      const { amount, id: order_id, currency } = result.data;

      const options = {
          key: "rzp_test_pq8S6HNUCPVXHT", // Enter the Key ID generated from the Dashboard
          amount: amount.toString(),
          currency: currency,
          name: "Stargram",
          description: "Buy Message Test Transaction",
          image: { logo },
          order_id: order_id,
          handler: async function (response) {
              const data = {
                  orderCreationId: order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
              };

              const result = await axios.post("http://localhost:3001/payment_success", data);

              // alert(result.data.msg);

              if(messagePack=='Basic'){
                var messageCount = 1
              }else if(messagePack=='Recommended'){
                var messageCount = 5
              }else if(messagePack=='SuperSaver'){
                var messageCount = 12
              }

              axios.post("http://localhost:3001/add_credit",{
                messageCount : messageCount
              },{
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
              }).then((response)=>{
                if(response){
                  console.log(response)
                }
              })
          },
          prefill: {
              name: "Umer Sanil",
              email: "umeredava@gmail.com",
              contact: "7356317610",
          },
          notes: {
              address: "Stargram Corporate Office",
          },
          theme: {
              color: "#6d75e3",
          },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

  }
    
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" className="text-center" style={{marginTop:"6rem"}}>
        <h5 className="text-left" >Buy Message Credit</h5>
        <RadioGroup aria-label="messagePack" name="messagePack" value={messagePack} onChange={handleChange}>

        <Card className={classes.root}>
          {/* <CardContent> */}
            
            {/* <Typography variant="h5" component="h2">
              Basic
            </Typography> */}
            
          {/* </CardContent> */}
          <FormControl style={{float:"left", marginTop:"1rem"}} component="fieldset">
            <FormControlLabel className="ml-4 mt-3 mb-3" value="Basic" control={<Radio />} label="Basic" />
        
          </FormControl>
          <div>
            <h3 style={{textAlign:"right", lineHeight: "100px", marginRight:"2.5rem"}}>	&#8377; 20</h3>
          </div>
        </Card>
        
        <Card className={classes.root,"mt-3"} style={{minWidth:"275px"}}>
          
          <FormControl style={{float:"left", marginTop:"1rem"}} component="fieldset">
            <FormControlLabel className="ml-4 mt-3 mb-3" value="Recommended" control={<Radio />} label="Recommended" />
          </FormControl>

          <div>
            <h3 style={{ marginTop:"2rem", textAlign:"right", marginRight:"2.5rem"}}>	&#8377;	60</h3>
          </div>

        </Card>

        <Card className={classes.root,"mt-3"} style={{minWidth:"275px"}}>
          
          <FormControl style={{float:"left", marginTop:"1rem"}} component="fieldset">
            <FormControlLabel className="ml-4 mt-3" value="SuperSaver" control={<Radio />} label="Super saver" />
          </FormControl>
 
          <div>
            <h3 style={{lineHeight:"48px", textAlign:"right", textAlign: "right", marginTop: "30px",
              marginBottom: "-21px", marginRight: "2.5rem"}}>	&#8377; 120</h3>
          </div>
          
        </Card>

    </RadioGroup>

    <Button variant="contained" className="mt-5 mb-5" onClick={displayRazorpay} style={{width:"11rem"}} color="primary">
      Continue
    </Button>

        
        
      </Container>
    </React.Fragment>
  );
}
