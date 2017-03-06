// Dependancies
import React, { Component } from 'react';
import {
  PageHeader,
  Grid
} from 'react-bootstrap';


class App extends Component {

  render() {
    return (
      <div className="home">
        <PageHeader>Game Manager</PageHeader>
        <Grid>
          {this.props.children}
        </Grid>
      </div>
    );
  }
}



export default App;
