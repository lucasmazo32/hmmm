import React from 'react';
import { shallow } from 'enzyme';
import Welcome from '../components/WelcomeContainer';

describe('A suit', () => {
  it('should render the user division', () => {
    const mock = () => '';
    expect(shallow(<Welcome handleUser={mock} type="user" handleClient={mock} />).is('.welcome-user')).toBe(true);
  });

  it('should render the client division', () => {
    const mock = () => '';
    expect(shallow(<Welcome handleUser={mock} type="client" handleClient={mock} />).is('.welcome-client')).toBe(true);
  });
});
