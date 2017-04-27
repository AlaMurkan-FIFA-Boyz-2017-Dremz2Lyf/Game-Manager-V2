// Dependancies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
  PageHeader,
  Grid
} from 'react-bootstrap';

import { fetch } from '../actions/index';

export class App extends Component {

  componentDidMount() {
    // As the app fires up, we do some initial population of the store with our existing data.
    let { fetch } = this.props;
    fetch('players');
    fetch('table');
  }

  render() {

    return (
      <div className="home">
        <Link to='/'><PageHeader>Game Manager</PageHeader></Link>
        <Grid>
          {this.props.children}
        </Grid>
      </div>
    );
  }
}



export default connect(null, { fetch })(App);
