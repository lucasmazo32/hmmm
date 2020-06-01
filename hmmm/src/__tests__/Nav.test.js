import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

describe('View rendering', () => {
  it('should render the user view', () => {
    const currUser = {
      type: 'user',
      info: {
        name: 'Foobar',
        username: 'foobar',
      },
    };
    expect(shallow(<Nav currentUser={currUser} />).contains(<Link className="btn btn-down" to={`/me/${currUser.info.username}`}>Profile</Link>)).toBe(true);
  });

  it('should render the client view', () => {
    const currUser = {
      type: 'client',
      info: {
        id: 1,
        company_name: 'Foo Bar',
      },
    };
    expect(shallow(<Nav currentUser={currUser} />).contains(<Link className="btn btn-down" to={`/client/${currUser.info.id}`}>Profile</Link>)).toBe(true);
  });
});
