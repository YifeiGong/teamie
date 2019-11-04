import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
chip: {
  marginTop:10,
  width:100,
},
}));

const Restaurant = ({key, restaurant, selectedRestaurants, setSelectedRestaurants}) => {
    // const {name, price, tables, type} = this.props
    const classes = useStyles()
    const [btnToggle, toggleBtn] = useState(false);
    const [btnColor, setBtnColor] = useState("default");
  
    const handleClick = () => {
      console.log("adding to list!")
      const btnToggleState = !btnToggle;
      if (btnToggle) {
        setBtnColor("default");
        const new_selectedRestaurants = selectedRestaurants.filter(r => r.name  !== restaurant.name);
        setSelectedRestaurants(new_selectedRestaurants);
      }
      else {
        setBtnColor("primary");
        const new_selectedRestaurants = selectedRestaurants.concat([restaurant]);
        setSelectedRestaurants(new_selectedRestaurants);
      }
      toggleBtn(btnToggleState);
    }
  
    return(
      <div className="restaurant-card">
       <Grid container spacing={10}>
        <Grid item xs={8}>
        <type>{restaurant.type}</type>
     <h2>{restaurant.name}</h2>
       
     <h5>Average ${restaurant.price}
     <br></br>Open Hours{restaurant.start} ~{restaurant.end} 
     <br></br>
     Available Table Sizes: {restaurant.tables.map(size => <span>{size}, </span>)}</h5>
    
     {/*<vegan>Vegan</vegan>
     <gltfree>Gluton Free</gltfree> */}
    </Grid>
    
    <Grid item xs={4}>

    <img src= {`../images/${restaurant.id}.jpg`} alt = {restaurant.name}/>


  <Chip className={classes.chip} label="Add to list" clickable color={btnColor} onClick={handleClick}/>
  </Grid>
  
  </Grid>
  
  </div>
  )}

  export default Restaurant;