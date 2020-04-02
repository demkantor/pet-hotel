import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import {HashRouter as Router, Route} from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import OwnerPage from '../OwnerPage/OwnerPage';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Dashboard}/>
            <Route exact path="/owners" component={OwnerPage}/>
          </div>
        </Router>
      </>
    );
  }
}

export default App;