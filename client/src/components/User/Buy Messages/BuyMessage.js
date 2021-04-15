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

  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
    
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" style={{marginTop:"6rem"}}>
        <h5>Buy Message Credit</h5>
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>

        <Card className={classes.root}>
      {/* <CardContent> */}
        
        {/* <Typography variant="h5" component="h2">
          Basic
        </Typography> */}
        
      {/* </CardContent> */}
      <FormControl component="fieldset">
    <FormControlLabel className="ml-4 mt-3 mb-3" value="female" control={<Radio />} label="Basic" />
</FormControl>
    </Card>
    <Card className={classes.root,"mt-3"}>
      
      <FormControl component="fieldset">
    <FormControlLabel className="ml-4 mt-3 mb-3" value="male" control={<Radio />} label="Recommended" />
</FormControl>

    </Card>

    <Card className={classes.root,"mt-3"}>
      
      <FormControl component="fieldset">
    <FormControlLabel className="ml-4 mt-3" value="other" control={<Radio />} label="Super saver" />
    </FormControl>
    </Card>

    </RadioGroup>

        
        
      </Container>
    </React.Fragment>
  );
}
