import React, { Component } from 'react';
import { Field, reduxForm, getFormSyncErrors, isValid, isPristine } from 'redux-form';
import { connect } from 'react-redux';
import { 
  Button,
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel,
  Checkbox,
  Row,
  Col,
  InputGroup,
  OverlayTrigger,
  Popover
} from 'react-bootstrap';

import { create } from '../actions/index';
import { getValidationState, required } from '../utilities';

export const renderField = ({ input, label, type, meta: { valid, pristine } }) => (
  <FormGroup validationState={getValidationState(valid, pristine)}>
      <FormControl {...input} placeholder={label} type={type}/>
  </FormGroup>
);

// displayName for coverage testing
renderField.displayName = 'renderField';

export const popover = (
  <Popover id='popover-trigger-hover-focus'>
    Select this to make a doubles team.
  </Popover>
);

export class PlayerForm extends Component {

  notTaken(value) {
    let { allPlayers } = this.props;

    return Object.keys(allPlayers).reduce((error, id) => {
      let player = allPlayers[id];
      return player.username.toLowerCase() === value.toLowerCase() ? 'Tough luck, someone beat you to it.' : error;
    }, undefined);
  }


  render() {
    const { handleSubmit, pristine, submitting, syncErrors, valid, isPristine, isValid } = this.props;

    const didError = isPristine ? undefined : (isValid ? undefined : syncErrors.username);


    return (
      <form onSubmit={handleSubmit}>
        <div>
          <ControlLabel>Username</ControlLabel>
          <InputGroup>
            <OverlayTrigger trigger={['hover', 'focus']} placement='bottom' overlay={popover}>
            <InputGroup.Addon>
              <Field
                autoComplete='false'
                label='Doubles Team?'
                name='isTeam'
                component='input'
                type='checkbox'
              />
            </InputGroup.Addon>
            </OverlayTrigger>
            <Field
              label='Username'
              name='username'
              type='text'
              component={renderField}
              validate={[required, this.notTaken.bind(this)]}
            />
            <InputGroup.Button>
              <Button type='submit' disabled={!!didError || isPristine}>Add</Button>
            </InputGroup.Button>
          </InputGroup>
          <HelpBlock>{didError}</HelpBlock>
        </div>
      </form>
    );
  }
}



const mapStateToProps = state => {
  let { data: { players }} = state;
  return {
    allPlayers: players,
    syncErrors: getFormSyncErrors('playerForm')(state),
    isValid: isValid('playerForm')(state),
    isPristine: isPristine('playerForm')(state)
  };
};


const connected = connect(
  mapStateToProps
)(PlayerForm);

export default reduxForm({
  form: 'playerForm'
})(connected);
