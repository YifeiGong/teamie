import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import VotingApp from './voting'
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router} from 'react-router-dom'


const route = (
    <Router>
        <div>
            <Route path="/voting/:id" component={VotingApp} />
            <Route exact path="/" component={App} />
            <Route exact path="/hello" component={App} />
        </div>   
    </Router>
);

ReactDOM.render(route, document.getElementById('root'));

serviceWorker.unregister();
