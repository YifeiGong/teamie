import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Component from 'react';
import Poll from 'react-polls';
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
  
  
  const db = firebase.database().ref();

// Declaring poll question and answers
const pollQuestion = 'Select Restaurant';
let pollAnswers = [
  {option: '', votes: 0},
]


const VotingApp = ({match}) => {
    const eventID = match.params.id;
    const [currRestaurants, setCurrRestaurants] = useState({restaurants: []});
    const [pollResponses, setPollResponses] = useState({pollResponses: pollAnswers});

    useEffect(() => {
        const handleData = snap => {
          if (snap.val()) setCurrRestaurants(snap.val());
        }
        db.on('value', handleData, error => alert(error));
        return () => {
          db.off('value', handleData);
        };
      }, []);

    const handleVote = () => {
        /* 
        
        This is where we update firebase data?

        */
        
        console.log("voted!");


    }

    let restaurantPollList = eventID.split(",").map((v) => {

        for(var x = 0; x < currRestaurants.restaurants.length; x++) {
            if (currRestaurants.restaurants[x].id == v) {
                return currRestaurants.restaurants[x].name;
            }
        }
    });
    restaurantPollList = restaurantPollList.filter((v) => v !== undefined);
    console.log(restaurantPollList);

    for(var y = 0; y < restaurantPollList.length; y++) {
        const tempDict = {
            option: restaurantPollList[y],
            votes: 0 
        };
        console.log(tempDict)
        pollAnswers.push(tempDict);
    }

    console.log(pollAnswers);

    return(

        // <h1>Voting for Event</h1>
        <Poll question={pollQuestion} 
        answers={pollAnswers} 
        onVote={handleVote}
        />

    )
}

export default VotingApp;