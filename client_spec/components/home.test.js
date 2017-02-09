const React = require('react');
import Home from '../../client/components/home';
// const Home = require(__components + '/home');


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

  it('should render props properly', () => {
    wrapper = mount(<Home list={[1, 2, 3]}/>);

    expect(wrapper.find('.listItem')).toHaveLength(3);
  });
});
