import React from 'react';
import { CreateTournament, mapStateToProps } from '../../client/components/create_tournament';
import { mockData } from '../mockData';

describe('CreateTournament', () => {
  let mockCreate = jest.fn();
  let wrapper = shallow(<CreateTournament players={mockData.players} create={mockCreate}/>);

  afterEach(() => {
    wrapper.setState({
      playerSearch: '',
      name: '',
      rounds: '1 Round',
      added: []
    });
  });

  test('should match the snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });

  test('rounds selection should work as expected', () => {
    // Expect our initial state
    expect(wrapper.state('rounds')).toBe('1 Round');
    // Simulate a click on one of the MenuItems
    wrapper.find('MenuItem').last().simulate('click');
    // Expect our state to be correct
    expect(wrapper.state('rounds')).toBe('12 Rounds');
  });

  test('player search should be controlled', () => {
    // Expect our initial state
    expect(wrapper.state('playerSearch')).toBe('');
    // simulate the change
    wrapper.find('[name="playerSearch"]').simulate('change', {target: {value: 'Alice'}});

    // Expect our state to be correct
    expect(wrapper.state('playerSearch')).toBe('Alice');
  });

  test('tournament name should be controlled', () => {
    // Expect our initial state
    expect(wrapper.state('name')).toBe('');
    // simulate the change
    wrapper.find('[name="name"]').simulate('change', {target: {value: 'New Tournament'}});

    // Expect our state to be correct
    expect(wrapper.state('name')).toBe('New Tournament');

  });

  test('should handle the submit by calling "create"', () => {
    let expected = {
      name: 'Best Tournament',
      rounds: '2 Rounds',
      added: ['1', '2']
    };

    wrapper.setState(expected);

    let mockPrevent = jest.fn();


    wrapper.find('form').simulate('submit', {preventDefault: mockPrevent});
    expect(mockCreate.mock.calls[0]).toEqual(['tournaments', {
      name: 'Best Tournament',
      rounds: '2',
      added: ['1', '2']
    }]);
    expect(mockPrevent).toHaveBeenCalled();
    mockPrevent.mockClear();
    mockCreate.mockClear();
  });

  test('should call move when playerList item is clicked', () => {
    // check that our initial state is correct
    expect(wrapper.state('added')).toEqual(expect.arrayContaining([]));

    // call our move function with an id.
    wrapper.instance().move('1');

    // expect the state to be updated
    expect(wrapper.state('added')).toEqual(expect.arrayContaining(['1']));

    //call move again with the same id,
    wrapper.instance().move('1');

    // then the id should be removed
    expect(wrapper.state('added')).toEqual(expect.arrayContaining([]));
  });

  test('mapStateToProps', () => {
    let expected = {
      players: mockData.players.slice(0)
    };

    let state = {
      data: {
        players: mockData.players.slice(0)
      }
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });

  test('players should default to an empty object', () => {
    let noProps = shallow(<CreateTournament />);

    expect(noProps).toMatchSnapshot();
  });
});
