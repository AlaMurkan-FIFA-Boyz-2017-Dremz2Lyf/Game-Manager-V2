import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormSyncErrors } from 'redux-form';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Row,
  Col,
  Popover,
  OverlayTrigger,
  Button,
  HelpBlock
} from 'react-bootstrap';

import { getValidationState, required, possValidation, helpMessage, onlyNumbers, validPercentage } from '../utilities';

export const gameField = ({input, meta: {touched, error, valid, pristine}}) => (
  <FormGroup validationState={getValidationState(valid, !touched)}>
    <FormControl {...input} componentClass='select'>
      {generateOptions()}
    </FormControl>
  </FormGroup>
);

// displayName for coverage testing
gameField.displayName = 'gameField';

export const generateOptions = (num) => (
  new Array(21).fill(1).map((item, index) => (
    <option key={index} value={index}>{index}</option>
  ))
);

export const PercentageField = ({input, type, meta: {touched, error, valid}}) => (
  <FormGroup validationState={getValidationState(valid, !touched)}>
    <FormControl {...input} type={type} placeholder='00'/>
  </FormGroup>
);

// displayName for coverage testing
PercentageField.displayName = 'PercentageField';

export const Percentage = ({errors = {}, name, label}) => (
  <Row className='game-field'>
    <Col xs={3}>
      <ControlLabel>{label}</ControlLabel>
    </Col>
    <Col xs={2}>
      <Field
        name={`p1${name}`}
        component={PercentageField}
        type='text'
        validate={name === 'Poss' ? possValidation : validPercentage}
        normalize={onlyNumbers}
      />
    </Col>
    <Col xs={2}>
      <Field
        name={`p2${name}`}
        component={PercentageField}
        type='text'
        validate={name === 'Poss' ? possValidation : validPercentage}
        normalize={onlyNumbers}
      />
    </Col>
    <Col xs={5}>
      <HelpBlock>{errors[`p1${name}`] ? errors[`p1${name}`] : undefined}</HelpBlock>
    </Col>
  </Row>
);

// displayName for coverage testing
Percentage.displayName = 'Percentage';

const ConnectedPercentage = connect(
  (state) => ({
    errors: getFormSyncErrors('gameForm')(state)
  })
)(Percentage);

export const generateFields = (names) => names.map((name) => (
  <Row className='game-field' key={name}>
    <Col xs={3}>
      <ControlLabel>{name}</ControlLabel>
    </Col>
    <Col xs={2}>
      <Field
        name={`p1${name}`}
        component={gameField}
        validate={name === 'Score' ? required : null}
        normalize={Number}
      />
    </Col>
    <Col xs={2}>
      <Field
        name={`p2${name}`}
        component={gameField}
        validate={name === 'Score' ? required : null}
        normalize={Number}
      />
    </Col>
    <Col xs={5}>
      <HelpBlock>{helpMessage(name)}</HelpBlock>
    </Col>
  </Row>
));

export const GameForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    {generateFields(['Score', 'Shots', 'OnGoal', 'Reds', 'Yellows'])}
    <ConnectedPercentage name='Poss' label='Possession'/>
    <ConnectedPercentage name='PassAcc' label='Passing Accuracy'/>
    <Button disabled={props.invalid} type='submit'>Finish this game!</Button>
  </form>
);

// displayName for coverage testing
GameForm.displayName = 'GameForm';

export default reduxForm({
  form: 'gameForm'
})(GameForm);
