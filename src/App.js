import React from 'react';
import './App.css';
import  Credentials  from "./Credentials.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export default class App extends React.Component{

  // constructor() {
  //   super()
  // }

  render() {

    return (
      <Router>
      <div>

        <Switch>
        
          <Route path="/">
            <Credentials />
          </Route>

        </Switch>
      </div>
    </Router>
    );

  }
}

