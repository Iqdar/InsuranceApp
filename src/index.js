import React from 'react';
import ReactDOM from 'react-dom';
import './components/App.css'
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import EditInsuranceTaker from './components/EditInsuranceTaker';
import ClaimForm from './components/ClaimForm.js'
import ClaimTableUser from './components/ClaimTableUser.js'

const routes = (
    <Router>
        <Switch>
            <Route path="/" exact component={App}/>
            <Route path="/addClaim" component={ClaimForm}/>
            <Route path ="/viewClaims" component={ClaimTableUser}/>
            <Route path="/editInsuree" component={EditInsuranceTaker}/>
        </Switch>
    </Router>
)

ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
