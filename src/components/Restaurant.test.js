import React from 'react';
import {render, fireEvent, wait} from '@testing-library/react';
import Restaurant from './Restaurant';
//import 'jest-dom/extend-expect';
//import 'react-testing-library/cleanup-after-each';

const restaurant = [{
            id: "2",
            name: "Shinsen Evanston",
            type: "Japanese",
            price: 20,
            start: "900",
            end: "2200",
            tables: [2, 4, 6, 10],
            party_size: ["small", "medium"],
            vibes: ["happy_hour", "family_friendly", "team_bonding"]}];
            
            let selectedRestaurants = [];
            let setSelectedRestaurants = jest.fn();        
describe('restaurant', () => {
  it('display card', () => {
    const {getByTestId} = render(
    <Restaurant 
    //key={key} 
    restaurant={restaurant}
    selectedRestaurants={selectedRestaurants}
    setSelectedRestaurants={setSelectedRestaurants}/>);

    const elem = getByTestId('restaurant2');
    expect(elem.innerHTML).toBe('Shinsen Evanston');
  })


}); 

