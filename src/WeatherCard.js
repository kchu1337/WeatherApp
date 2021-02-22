import React from "react";
import "./styles/WeatherCard.css";

const WeatherCard = (props) => {
    const { date, location, weather } = props;
    if (date) {
      let weatherClass = "sunny";
      if (weather === "Rainy") {
        weatherClass = "rainy";
      } else if (weather === "Partly Cloudy") {
        weatherClass = "partly-cloudy";
      } else if (weather === "Cloudy") {
        weatherClass = "cloudy";
      }
      return (
        <div className="weather-card" key={date + location}>
          <div className="weather-datetime">{date}</div>
          <div
            className={"weather-forecast " + weatherClass}
            title={weather}
          ></div>
          <div className="weather-location">{location}</div>
        </div>
      );
    }
    return <div></div>;
}

export default WeatherCard;
