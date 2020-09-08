import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Hello!</h1>

            <p> Welcome to the App, to access the weather forecast tab, You will need to register and login in the top right, you dont need a real email address, it just creates a psudeo confirmation page.  </p>
      </div>
    );
  }
}
