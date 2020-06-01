import React from 'react';
import { shallow } from 'enzyme';
import { Welcome } from '../components/Welcome';

describe('A suit', () => {
  it('should render without throwing error', () => {
    const mock = () => '';
    expect(shallow(<Welcome logInClient={mock} logInUser={mock} />).is('.welcome-container')).toBe(true);
  });

  it('should contain are you a user', () => {
    const mock = () => '';
    const wrapper = shallow((<Welcome logInClient={mock} logInUser={mock} />));
    expect(wrapper.contains(<h2>Are you a user?</h2>)).toBe(true);
  });
});
