const React = require('react');
import Home from '../../client/components/home';


describe('Home Component', () => {
  let wrapper;

  it('should match snapshot', () => {
    wrapper = shallow(<Home/>);

    expect(wrapper).toMatchSnapshot();
  });
  it('should have a ".home" class', () => {
    wrapper = shallow(<Home/>);

    expect(wrapper.is('.home')).toBe(true);
  });


});
