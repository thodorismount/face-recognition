import React from 'react';

const Navigation = props => {
  return props.isSingedIn ? (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '50px'
      }}
    >
      <p
        onClick={() => props.onRouteChange('signout')}
        className='f3 link dim black underline pa3 pointer'
      >
        Sign out
      </p>
    </nav>
  ) : (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '50px'
      }}
    >
      <p
        onClick={() => props.onRouteChange('signin')}
        className='f3 link dim black underline pa3 pointer'
      >
        Sign In
      </p>
      <p
        onClick={() => props.onRouteChange('register')}
        className='f3 link dim black underline pa3 pointer'
      >
        Register
      </p>
    </nav>
  );
};

export default Navigation;
