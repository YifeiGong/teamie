import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import './App.css';
import RestaurantList from './components/RestaurantList';
import firebase from 'firebase/app';
import 'firebase/database';
 
const firebaseConfig = {
  apiKey: "AIzaSyAFzpavaaS5qMRo8FSZsqsZAaglgXL8H04",
  authDomain: "teamie-blue.firebaseapp.com",
  databaseURL: "https://teamie-blue.firebaseio.com",
  projectId: "teamie-blue",
  storageBucket: "teamie-blue.appspot.com",
  messagingSenderId: "373175945503",
  appId: "1:373175945503:web:0ce516f07c5d387642882a"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database().ref();

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }, 
  title: {
    flexGrow: 1,
  },
    gridList: {
    width: "100%",
    height: 700,
  },
  card:{
    margin: 20,
  }
}));



const App = ({}) => {
  const [restaurants, setRestaurants] = useState({restaurants: []});
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const url = '/data/restaurants.json';

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) setRestaurants(snap.val());
    }
    db.on('value', handleData, error => alert(error));
    return () => {
      db.off('value', handleData);
    };
  }, []);
  
  const classes = useStyles();

  return (
    <React.Fragment>
        <RestaurantList restaurants={restaurants.restaurants}
                        selectedRestaurants={selectedRestaurants}
                        setSelectedRestaurants={setSelectedRestaurants}/>
    </React.Fragment>
  );
}

export default App;