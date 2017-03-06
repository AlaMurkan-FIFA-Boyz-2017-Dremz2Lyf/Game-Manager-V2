// Dependancies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetch } from '../actions/index';

//Pre-built components from react bootstrap
import {
  Panel,
  Tabs,
  Tab
} from 'react-bootstrap';

// Components
import { Tournament } from './tournament';
import CreateTournament from './create_tournament';

export class Tournaments extends Component {

  componentDidMount() {
    this.props.fetch('tournaments');
    this.props.fetch('players');
  }

  renderList(finished) {
    let { tournaments = {} } = this.props;

    return Object.keys(tournaments).reduce((list, id) => {
      if (!!tournaments[id].winner === finished) {
        list.push(<Tournament key={id} tournament={tournaments[id]}/>);
      }
      return list;
    }, []);

  }

  render() {

    return (
      <div className="tournaments">
        <Panel>
          <Tabs defaultActiveKey={2} id='tournaments'>
            <Tab eventKey={1} title='Finished'>
              <h4>Finished Tournaments</h4>
              {this.renderList(true)}
            </Tab>
            <Tab eventKey={2} title='OnGoing'>
              <h4>OnGoing Tournaments</h4>
              {this.renderList(false)}
            </Tab>
            <Tab eventKey={3} title='Create One'>
              <CreateTournament />
            </Tab>
          </Tabs>
        </Panel>
      </div>
    );
  }
}

export const mapStateToProps = ({data}) => {

  return {
    tournaments: data.tournaments
  };
};

export default connect(mapStateToProps, { fetch })(Tournaments);
