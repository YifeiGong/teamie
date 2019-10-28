import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import imgURL from '../images/rest1.jpg';
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

import Restaurant from './Restaurant';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,

  },

  title: {
    flexGrow: 1,
  },
    gridList: {
    width: "100%",
  },
  card:{
    margin: 20,
  },
  paper: {
   // background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    position: "fixed",
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginTop:'200px',
    margin: theme.spacing(2),
  },
  }));

  const Poll = ({selectedRestaurants}) => {
    const classes = useStyles();
    const handleClick = () => {
      const urlCode = selectedRestaurants.map(r => r.id).toString();
      window.location.href = "/voting/" + urlCode;
    }
    
    return(
      <div>
        <Typography variant="h5" component="h3">Poll</Typography>
        <GridList>
          <GridListTile>
            {
              selectedRestaurants.map( (r) => 
              <Card className={classes.card}><Typography>{r.name}</Typography></Card>
              )
            }
          </GridListTile>
        </GridList>
   
    <Button onClick={handleClick} variant="contained" color="primary">Send out Poll</Button>
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
          <Typography variant="h6" className={classes.title}>
            Teamie
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        </Container>
        <Container>
        <Toolbar>
        <Grid container>
        <Grid item xs={3}>
        <AmbienceFilter setVibe={setVibe}></AmbienceFilter>
        </Grid>
<Grid item xs={2}>
        <TeamMemberFilter setNumPeople={setNumPeople}></TeamMemberFilter>
          </Grid>
          <Grid item xs={2}>
            <BudgetFilter setBudget={setBudget}></BudgetFilter>
            </Grid> 
            
              {/*<Grid item xs={3}>
             <DateFilter></DateFilter> 
          </Grid> */}

            <Grid item xs={2}>
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
        label="We have"
        placeholder="$ budget"
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
      //budget
      if ((numPeople === "" && budget === "" && vibe === "" && selectedTime === "") || (parseFloat(r.price) <= parseFloat(budget)))
      {
        filter_or_not = true;
      }
      
      //vibe
      if ((numPeople === "" && budget === "" && vibe === "" && selectedTime === "") || (r.vibes.includes(vibe)))
      {
        filter_or_not = true;
      }
      
      //size of party
      //small - 1-5
      //medium - 6-10
      //large - 10+
      if ((numPeople === "" && budget === "" && vibe === "" && selectedTime === "") || (r.party_size.includes(numPeople)))
      {
        filter_or_not = true;
      }

      //time (lunch vs dinner)
      //11:30-1:30 - lunch
      //5:30-7:30 - dinner
      const isLunch = () => {
        if ((parseFloat(r.start) <= 1130) && (parseFloat(r.end) >= 1330))
        {
          return true;
        }
        return false;
      }
      
      const isDinner = () => {
        if ((parseFloat(r.start) <= 1730) && (parseFloat(r.end) >= 1930))
        {
          return true;
        }
        return false;        
      }
      
      let restaurantTime = "neither";
      if (isLunch())
      {
        if (isDinner())
        {
          restaurantTime = "both";
        }
        restaurantTime = "lunch";
      }
      if (isDinner())
      {
        if (!isLunch())
        {
          restaurantTime = "dinner";
        }
        restaurantTime = "both";
      }
      //console.log(restaurantTime);

      if((numPeople === "" && budget === "" && vibe === "" && selectedTime === "") || (selectedTime === restaurantTime) || (restaurantTime === "both"))
      {
        filter_or_not = true;
      }

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
            <Grid container spacing={10}>
                

                {/* <Grid item xs={4}>
                    <TeamMemberFilter state={{numPeople, setNumPeople}}></TeamMemberFilter> 
                    <BudgetFilter setBudget={setBudget}></BudgetFilter>
                    <TimeFilter state={{filterOnOff, setFilterOnOff}}></TimeFilter>
                    <br/>
                    <Button variant="contained" color="primary">Send out Poll</Button>
                </Grid> */}

                <Grid item xs={6}>
                    {filteredRestaurants.map(r => <Restaurant key={r.id} 
                                        restaurant={r}
                                        selectedRestaurants={selectedRestaurants}
                                        setSelectedRestaurants={setSelectedRestaurants}
                                        />)}
                </Grid>

                <Grid item xs={6}>
                <Paper className={classes.paper}>

          
<Poll selectedRestaurants={selectedRestaurants}></Poll>

</Paper>
                </Grid>
            </Grid>
            </Container>
          </div>
        </React.Fragment>
    )
}

export default RestaurantList;