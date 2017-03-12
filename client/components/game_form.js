import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Row,
  Col
} from 'react-bootstrap';

import { getValidationState } from '../utilities';

export const generateOptions = () => (
  new Array(11).fill(1).map((item, index) => (
    <option key={index} value={index}>{index}</option>
  ))
);

export const gameField = ({input}) => (
  <FormGroup>
    <FormControl {...input} componentClass='select'>
      {generateOptions()}
    </FormControl>
  </FormGroup>
);

export const Possession = ({input}) => (
  <Row className='game-field'>
    <Col xs={4}>
      <ControlLabel>Possession</ControlLabel>
    </Col>
    <Col xs={4}>
      <Field
        name='p1Poss'
        component='input'
        // TODO: drop in some validation here
      />
    </Col>
    <Col xs={4}>
      <Field
        name='p2Poss'
        component='input'
        // TODO: and here
      />
    </Col>
  </Row>
);

export const gameFieldRows = (rows) => {
  return rows.map((name) => (
    <Row className='game-field' key={name}>
      <Col xs={4}>
        <ControlLabel>{name}</ControlLabel>
      </Col>
      <Col xs={4}>
        <Field
          name={`p1${name}`}
          component={gameField}
        />
      </Col>
      <Col xs={4}>
        <Field
          name={`p2${name}`}
          component={gameField}
        />
      </Col>
    </Row>
  ));
};

export const GameForm = (props) => {
  // TODO: pull the validation info needed from props here and create an error warning if possession doesn't add up to 100
  return (
    <Form>
      {gameFieldRows(['Score', 'Shots', 'OnGoal', 'Reds', 'Yellows'])}
      <Possession />
    </Form>
  );
};

export default reduxForm({
  form: 'gameForm'
})(GameForm);
