import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      country: 'us', 
    };
  }

  handleCountrySearch = (newCountry) => {
    this.setState({ country: newCountry }); 
  };

  render() {
    return (
      <div>
        <Router>
          <Navbar onCountrySearch={this.handleCountrySearch} />
          <Routes>
            <Route
              exact
              path='/'
              element={<News key="general" pageSize={5} country={this.state.country} category="general" />}
            />
            <Route
              exact
              path='/business'
              element={<News key="business" pageSize={5} country={this.state.country} category="business" />}
            />
            <Route
              exact
              path='/entertainment'
              element={<News key="entertainment" pageSize={5} country={this.state.country} category="entertainment" />}
            />
            <Route
              exact
              path='/general'
              element={<News key="general" pageSize={5} country={this.state.country} category="general" />}
            />
            <Route
              exact
              path='/health'
              element={<News key="health" pageSize={5} country={this.state.country} category="health" />}
            />
            <Route
              exact
              path='/science'
              element={<News key="science" pageSize={5} country={this.state.country} category="science" />}
            />
            <Route
              exact
              path='/sports'
              element={<News key="sports" pageSize={5} country={this.state.country} category="sports" />}
            />
            <Route
              exact
              path='/technology'
              element={<News key="technology" pageSize={5} country={this.state.country} category="technology" />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}




