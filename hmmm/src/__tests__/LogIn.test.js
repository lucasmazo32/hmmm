import React from 'react';
import { shallow } from 'enzyme';
import LogIn from '../components/LoginForm';

describe('A suit', () => {
  it('should render the sign up', () => {
    const mock = () => '';
    expect(shallow(<LogIn type="signup" userType="user" handleLogin={mock} handleSignUp={mock} />)
      .contains(<h2 className="form">Sign up</h2>)).toBe(true);
  });

  it('should render the user login view', () => {
    const mock = () => '';
    expect(shallow(<LogIn type="login" userType="user" handleLogin={mock} handleSignUp={mock} />).contains(
      <label className="login-label" htmlFor="email">
        User email
        <input className="form-control" id="email" type="email" placeholder="Email" />
      </label>,
    )).toBe(true);
  });

  it('should render the client login view', () => {
    const mock = () => '';
    expect(shallow(<LogIn type="login" userType="client" handleLogin={mock} handleSignUp={mock} />).contains(
      <label className="login-label" htmlFor="email">
        Company email
        <input className="form-control" id="email" type="email" placeholder="Email" />
      </label>,
    )).toBe(true);
  });
});
