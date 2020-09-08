import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'

export class WeatherForecast extends Component {
  static displayName = WeatherForecast.name;

  constructor(props) {
    super(props);
      this.state = { forecasts: [], loading: true };
      this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
      this.populateWeatherData();
  }

    static renderForecastsTable(forecasts) {
        return (
            <div>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Temp. (C)</th>
                            <th>Summary</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {forecasts.map(forecasts =>
                            <tr key={forecasts.created}>
                                <td>{forecasts.applicable_date}</td>
                                <td>{forecasts.the_temp}</td>
                                <td>{forecasts.weather_state_name}</td>
                                <td><img src={"https://www.metaweather.com/static/img/weather/png/64/" + forecasts.weather_state_abbr + ".png"} alt={forecasts.weather_state_name}></img></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
        );
    }
  render() {
      let contents = this.state.loading
          ? <p><em>Loading...</em></p>
          : WeatherForecast.renderForecastsTable(this.state.forecasts); 

    return (
      <div>
        <h1 id="tabelLabel" >Belfast Weather forecast</h1>
            <p>This fetches data from api www.metaweather.com as suggested.</p>
            {contents}
            <button onClick={this.refresh}>Refresh Data</button>
      </div>
    );
  }

  async populateWeatherData() {

        const token = await authService.getAccessToken();
        const response = await fetch('MetaWeatherforecast', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }

    refresh() {
        this.setState({ forecasts: [], loading: true });
        this.populateWeatherData();
    }
}
