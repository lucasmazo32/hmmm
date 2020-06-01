import React from 'react';
import { shallow } from 'enzyme';
import { LogIn } from '../components/LogIn';

describe('A suit', () => {
  it('should render the user view', () => {
    const mock = () => '';
    expect(shallow(<LogIn userType="user" setUser={mock} />).contains(
      <label className="login-label" htmlFor="email">
        User email
        <input className="form-control" id="email" type="email" placeholder="Email" />
      </label>,
    )).toBe(true);
  });

  it('should render the client view', () => {
    const mock = () => '';
    expect(shallow(<LogIn userType="client" setUser={mock} />).contains(
      <label className="login-label" htmlFor="email">
        Company email
        <input className="form-control" id="email" type="email" placeholder="Email" />
      </label>,
    )).toBe(true);
  });
});
