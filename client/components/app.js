// Dependancies
import React, { Component } from 'react';
import { Link } from 'react-router';
import {
  PageHeader,
  Grid
} from 'react-bootstrap';


class App extends Component {

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



export default App;
