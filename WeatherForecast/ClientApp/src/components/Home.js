import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Hello!</h1>

            <p> This is my applciation for a ASP.NET MVC application task. It uses a standard visual studio mvc react template, which includes an authorised user function. You will need a login to reach the weather page. (doesn't have to be a real address mind you)</p>
            <p> Code wise, almost all of the changes were in MetaWeatherForecastController.cs, MetaWeatherForecast.cs and WeatherForecast.js.  </p>
      </div>
    );
  }
}
