import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import '../App.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';
import { positions } from '@material-ui/system';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Restaurant from './Restaurant';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: 6,
    minWidth: 200,

  },
  textField:{
    margin: 6,
    minWidth: 180,
  },
  title: {
    padding:20,
    flexGrow: 1,
  },
  card: {
    margin: 20,
  },
  paper: {
    //background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    position: "fixed",
    width: '300px',
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginTop:'20px',
    margin: theme.spacing(2),
  },
  }));

  const Poll = ({selectedRestaurants}) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const classes = useStyles();
    const urlCode = selectedRestaurants.map(r => r.id).toString();
    const urlToRedirect = "/voting/" + urlCode;
    const fullURL = "https://teamie-blue.firebase.com" + urlToRedirect;
    const handleClick = () => {
      document.execCommand("copy");
      alert("Copied " + fullURL + " to clipboard!");
    }
    const handleRemove = (selectedRestaurants) => {}
    
    return(
      <div>
        <Typography variant="h5" component="h3">Poll</Typography>
        
        {
              selectedRestaurants.map( (r) => 
              <div className="poll-card">
              
               {r.name}  
               
                <Chip color="primary" label="Delete" clickable 
               // color={btnColor} 
                onClick={handleRemove}
                />

              </div>
              )
            }
            
         
   
  
    <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Generate Poll Link
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Generated Poll Link</DialogTitle>
        <DialogContent>
          <DialogContentText focused="true" id="hurl">
            {fullURL}
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close 
          </Button>
          <Button onClick={handleClick} variant="contained" color="primary">Copy to Clipboard</Button>
        </DialogActions>
      </Dialog>
   </div>     
    )
  }

const AppBar_header =  ({numPeople, setNumPeople, setBudget, setVibe, setTime}) => {
  const classes = useStyles()

  return (
    <div>
      <AppBar position="fixed" color="inherit">
      <Container>
        <Toolbar>
          
         
       
       
       
        <Grid container>
        <Grid item xs={1}>
        <Typography variant="h6" className={classes.title}>
            Teamie
          </Typography>

        </Grid>
        <Grid item xs={2.5}>
        <AmbienceFilter setVibe={setVibe}></AmbienceFilter>
        </Grid>
<Grid item xs={2.5}>
        <TeamMemberFilter setNumPeople={setNumPeople}></TeamMemberFilter>
          </Grid>
          <Grid item xs={2.5}>
            <BudgetFilter setBudget={setBudget}></BudgetFilter>
            </Grid> 
            
              {/*<Grid item xs={3}>
             <DateFilter></DateFilter> 
          </Grid> */}

            <Grid item xs={2.5}>
              <TimeFilter setTime={setTime}></TimeFilter>
            </Grid> 
          </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

const TeamMemberFilter = ({setNumPeople}) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    age: '',
  });

  const inputLabel = React.useRef(null);


  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    setNumPeople(event.target.value);
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">We have</InputLabel>
        <Select
          value={values.age}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-simple',
          }}
        >
          <MenuItem value={"small"}>Small 4~6</MenuItem>
          <MenuItem value={"medium"}>Medium</MenuItem>
          <MenuItem value={"large"}>Large</MenuItem>
         
          
        </Select>
      </FormControl>
      </form>
      )
}

const BudgetFilter = ({setBudget}) => {
  const classes = useStyles()
    return(       
        <form class="filter">
        <TextField id="standard-with-placeholder"
        label="Our budget is "
        placeholder="$ average"
        className={classes.textField}
        margin="normal"
        onChange={(e) => setBudget(e.target.value)} id="party-budget" margin="normal"></TextField>
        </form> 
    )
  }
 
const TimeFilter = ({setTime}) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    age: '',
  });
  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    setTime(event.target.value);
  };
  
  const inputLabel = React.useRef(null);
    const handleOnClick = (time) => {
        console.log("filtering")
        // setSelectedTime(time);
        // setFilteredRestaurants(filteredData);
    }
    // onClick={(e) => handleOnClick("11:30-1:30")}

    return(
      <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">During</InputLabel>
        <Select
          value={values.age}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-simple',
          }}
        >
          <MenuItem value={"lunch"}>Lunch 11:30AM-1:30PM</MenuItem>
          <MenuItem value={"dinner"}>Dinner 5:30PM-7:30PM</MenuItem>
          
        </Select>
      </FormControl>
      </form>   
    )
}

const AmbienceFilter = ({setVibe}) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    age: '',
  });

  const inputLabel = React.useRef(null);


  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    setVibe(event.target.value);
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">The vibe we want</InputLabel>
        <Select
          value={values.age}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-simple',
          }}
        >
          <MenuItem value={"happy_hour"}>Happy Hour</MenuItem>
          <MenuItem value={"good_for_clients"}>Good for clients</MenuItem>
          <MenuItem value={"family_friendly"}>Family Friendly</MenuItem>
          <MenuItem value={"team_bonding"}>Internal team bonding</MenuItem>
          
        </Select>
      </FormControl>
      </form>
      )
}
 
const DateFilter = ({}) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    age: '',
  });

  const inputLabel = React.useRef(null);


  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">We would like to go on</InputLabel>
        <Select
          value={values.age}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-simple',
          }}
        >
          <MenuItem value={10}>Next 5 workdays</MenuItem>
          <MenuItem value={20}>Next 7 workdays</MenuItem>
          
        </Select>
      </FormControl>
      </form>
      )
}

const RestaurantList = ({restaurants, selectedRestaurants, setSelectedRestaurants}) => {
    const [numPeople, setNumPeople] = useState("");
    const [budget, setBudget] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [vibe, setVibe] = useState("");
    const classes = useStyles();
    const filteredRestaurants = restaurants.filter((r) => {
      let filter_or_not = false;
      let filterStatus = []
      // Vibe
      if (vibe === "" || r.vibes.includes(vibe)) {
        filterStatus.push(true);
      }
      else {
        filterStatus.push(false);
      }
      // Party Size
      if (numPeople === "" || (r.party_size.includes(numPeople))) {
        filterStatus.push(true);
      }
      else {
        filterStatus.push(false);
      }
      // Budget
      if (budget === "" || (parseFloat(r.price) <= parseFloat(budget))) {
        filterStatus.push(true);
      }
      else {  
        filterStatus.push(false);
      }
      // Time
      let selectedStart;
      let selectedEnd;
      if (selectedTime === "lunch") {
        selectedStart = 1130;
        selectedEnd = 1330;
      }
      else if (selectedTime === "dinner") {
        selectedStart = 1730;
        selectedEnd = 1930;
      }
      if (selectedTime === "" || (selectedStart >= r.start && selectedEnd <= r.end)) {
        filterStatus.push(true);
      }
      else {
        filterStatus.push(false);
      }

      filter_or_not = filterStatus.every(val => val);
      return filter_or_not;
    }); // this will re-render because of the changes in filter attributes which are states (time, etc)
  
    return(
        <React.Fragment>
          <AppBar_header  numPeople={numPeople} 
                          setNumPeople={setNumPeople} 
                          setBudget={setBudget}
                          setVibe={setVibe}
                          setTime={setSelectedTime} />
          <div className='list'>
            <Container>
            <Grid container spacing={6}>
                

                {/* <Grid item xs={4}>
                    <TeamMemberFilter state={{numPeople, setNumPeople}}></TeamMemberFilter> 
                    <BudgetFilter setBudget={setBudget}></BudgetFilter>
                    <TimeFilter state={{filterOnOff, setFilterOnOff}}></TimeFilter>
                    <br/>
                    <Button variant="contained" color="primary">Send out Poll</Button>
                </Grid> */}
<Grid item xs={1}></Grid>
                <Grid item xs={5}>
                    {filteredRestaurants.map(r => <Restaurant key={r.id} 
                                        restaurant={r}
                                        selectedRestaurants={selectedRestaurants}
                                        setSelectedRestaurants={setSelectedRestaurants}
                                        />)}
                </Grid>
               
                <Grid item xs={4}>
                <Paper className={classes.paper}>

          
<Poll selectedRestaurants={selectedRestaurants}></Poll>

</Paper>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            </Container>
          </div>
        </React.Fragment>
    )
}

export default RestaurantList;