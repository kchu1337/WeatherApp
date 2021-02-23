import React, {useCallback, useEffect, useState} from "react";
import EditableSection from "./EditableSection";
import WeatherCard from "./WeatherCard";
import "./styles/App.css";
import data from './data/test-data.json';
import {WEATHER_TYPE_MAP} from './constants'
import { isValidWeatherDataSet } from './helpers'

const App = () => {
  const [startDate, changeStartDate] = useState(new Date(new Date()- 1000 * 60 * 60 * 24 * 1));
  const [endDate, changeEndDate] = useState(new Date());
  const [location, changeLocation] = useState('');
  const [weatherData, setWeatherData] = useState(new Map());
  const [filteredWeatherArray, setFilteredWeatherArray] = useState([]);

  useEffect(() => {
    const townMap = new Map();
    data.filter(isValidWeatherDataSet).forEach(({date, town, weather}) => {
      const dateObj = new Date(date);
      if (!townMap.has(town)) {
        townMap.set(
          town, [{date: dateObj, formattedDate: date, weather: WEATHER_TYPE_MAP[weather]}]
        );
      } else {
        townMap.get(town).push(
          {date: dateObj, formattedDate: date, weather: WEATHER_TYPE_MAP[weather]}
        );
      }
    });

    setWeatherData(townMap);
  }, []);

  useEffect(() => {
     if(!weatherData.has(location)){
       setFilteredWeatherArray([]);
     }else{
       const weatherArray = weatherData.get(location).filter(({date}) => {
         return date <= endDate && date >= startDate;
       });
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
        {filteredWeatherArray.map(({formattedDate, weather}) => (
          <WeatherCard
            date={formattedDate}
            key={`${formattedDate}-${location}`}
            location={location}
            weather={weather}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
