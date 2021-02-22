import React from "react";
import "./styles/WeatherCard.css";

const WeatherCard = (props) => {
    const { date, location, weather } = props;
    if (date) {
      return (
        <div className="weather-card" key={date + location}>
          <div className="weather-datetime">{date}</div>
          <div
            className={"weather-forecast " + weather}
            title={weather}
          ></div>
          <div className="weather-location">{location}</div>
        </div>
      );
    }
    return <div></div>;
}

export default WeatherCard;
