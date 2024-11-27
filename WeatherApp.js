import React from 'react'
import axios from "axios";
import "./Weather.css";

function WeatherApp() {
  const [data, setData] = React.useState(null);
  const [location, setLocation] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  let key = "bcf71a78f2714a1c84e85029242402";

  const handleClick = () => {
    setIsLoading(true);
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`
      )
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="container">
      <div className="input-container">
        <label>Enter the City or State:</label>
        <input
          type="text"
          className="input-group-text"
          onChange={handleChange}
        />
        <button className="btn-dark" onClick={handleClick}>
          Submit
        </button>
        <hr />
      </div>

      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        data && (
          <div className="d-flex justify-content-center">
            <div className="card text-bg-primary mb-3">
              <div className="card-header">Information</div>
              <div className="card-body">
                <h5 className="card-title">
                  {data.location.name}, {data.location.region},{" "}
                  {data.location.country}
                  <br />
                  Temperature: {data.current.temp_c}°C
                  <br />
                  Temperature in F: {data.current.temp_f}°F
                  <br />
                  Latitude: {data.location.lat}
                  <br />
                  Longitude: {data.location.lon}
                  <br />
                  Last updated: {data.current.last_updated}
                  <br />
                  Timezone: {data.location.tz_id}
                </h5>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default WeatherApp
