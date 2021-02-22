import React, {useCallback, useState} from "react";
import EditableSection from "./EditableSection";
import WeatherCard from "./WeatherCard";
import "./styles/App.css";
import data from './data/test-data.json';

const App = () => {
    const [startDate, changeStartDate] = useState(new Date('Thu Feb 11 2021 00:00:00'));
    const [endDate, changeEndDate] = useState(new Date('Thu Feb 11 2021 00:00:00'));
    const [location, changeLocation] = useState('');


    const changeLocationMemoized = useCallback(
    (e) => {
      changeLocation(e.target.value)
    },
    [changeLocation],
  );

    return (
      <div className="App">
        <EditableSection
          startDate={startDate}
          endDate={endDate}
          location={location}
          onStartDateChange={changeStartDate}
          onEndDateChange={changeEndDate}
          onLocationChange={changeLocationMemoized}
        />
        <div className="editable-section">
          {[
            {
              date: "2020-01-01 10:00AM",
              weather: "Cloudy",
              location: "Tyson's Corner",
            },
          ].map((item) => (
            <WeatherCard
              date={item.date}
              weather={item.weather}
              location={item.location}
            />
          ))}
        </div>
        <text>
          TODO: Implement the visual application using the provided components
          And by displaying data from test-data.csv or test-data.json
        </text>
      </div>
    );
}

export default App;
