import React, {useCallback, useEffect, useState} from "react";
import EditableSection from "./EditableSection";
import WeatherCard from "./WeatherCard";
import "./styles/App.css";
import data from './data/test-data.json';
import {WEATHER_TYPE_MAP} from './constants'

const App = () => {
  const [startDate, changeStartDate] = useState(new Date('Wed Jan 01 2020 00:00:00'));
  const [endDate, changeEndDate] = useState(new Date('Thu Feb 11 2021 00:00:00'));
  const [location, changeLocation] = useState('');
  const [weatherData, setWeatherData] = useState(new Map());
  const [filteredWeatherArray, setFilteredWeatherArray] = useState([]);

  useEffect(() => {
    const townMap = new Map();
    data.forEach(({date, town, weather}) => {
      if (!townMap.has(town)) {
        townMap.set(
          town, [{date: new Date(date), formattedDate: date, weather: WEATHER_TYPE_MAP[weather]}]
        );
      } else {
        townMap.get(town).push(
          {date: new Date(date), formattedDate: date, weather: WEATHER_TYPE_MAP[weather]}
        );
      }
    });
    /*const dateSorter = (b,a) => {
      return b.date > a.date ? 1 : -1
    };
    townMap.forEach((value, key) => {
      const sortedWeather = value.sort(dateSorter);
      townMap.set(key, sortedWeather);
    });*/
    setWeatherData(townMap);
  }, []);

  useEffect(() => {
    console.log('changing');
     if(!weatherData.has(location)){
       setFilteredWeatherArray([]);
     }else{
       console.log('here');

       const weatherArray = weatherData.get(location).filter(({date}) => {
         return date <= endDate && date >= startDate;
       });
       console.log(weatherArray);
       setFilteredWeatherArray(weatherArray);
     }
  }, [startDate, endDate, location, weatherData]);

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
        {filteredWeatherArray.map((item, index) => (
          <WeatherCard
            date={item.formattedDate}
            weather={item.weather}
            location={location}
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
