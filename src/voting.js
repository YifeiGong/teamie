import React, { useState, useEffect } from 'react';
import Poll from 'react-polls';
import firebase from 'firebase/app';
import 'firebase/database';

//create the database
const db = firebase.database();

// Declaring poll question and answers
const pollQuestion = 'Select Restaurant';
let pollState = []

const VotingApp = ({match}) => {
    const eventID = match.params.id;
    const [currRestaurants, setCurrRestaurants] = useState({restaurants: []});

    useEffect(() => {
        const handleData = snap => {
          if (snap.val()) setCurrRestaurants(snap.val());
        }
        
        db.ref().on('value', handleData, error => alert(error));
        return () => {
          db.ref().off('value', handleData);
        };
      }, []);
    
    const handleVote = (e) => {
      const idx = restaurantPollList.indexOf(e);
      let newVotingData = currRestaurants.votingData[eventID];
      newVotingData[idx] += 1;
      db.ref("votingData/"+eventID+"/").set(
        newVotingData
      );
    }

    let restaurantPollList = eventID.split(",").map((v) => {

        for(var x = 0; x < currRestaurants.restaurants.length; x++) {
            if (currRestaurants.restaurants[x].id == v) {
                return currRestaurants.restaurants[x].name;
            }
        }
    });

    restaurantPollList = restaurantPollList.filter((v) => v !== undefined);

    useEffect(() => {
      try {
        const temp = currRestaurants.votingData[eventID];
      }
      catch (error) {
        //create entry    
        //db.ref("votingData/"+eventID+"/").set(
          //new Array(restaurantPollList.length).fill(0)
        //);
      }
    },[currRestaurants]); // run after currRestaurants has been loaded

    pollState = [];

    for(var y = 0; y < restaurantPollList.length; y++) {
        const tempDict = {
            option: restaurantPollList[y],
            votes: currRestaurants.votingData[eventID][y],
        };
        pollState.push(tempDict);
    }

    return(

        // <h1>Voting for Event</h1>
        <Poll question={pollQuestion} 
        answers={pollState} 
        onVote={handleVote}
        />

    )
}

export default VotingApp;