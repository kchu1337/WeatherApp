import React, {useCallback, useEffect, useState} from "react";
import EditableSection from "./EditableSection";
import WeatherCard from "./WeatherCard";
import "./styles/App.css";
import data from './data/test-data.json';
import {WEATHER_TYPE_MAP} from './constants'

const App = () => {
  const [startDate, changeStartDate] = useState(new Date());
  const [endDate, changeEndDate] = useState(new Date());
  const [location, changeLocation] = useState('');
  const [weatherData, setWeatherData] = useState(new Map());
  const [filteredWeatherArray, setFilteredWeatherArray] = useState([]);

  useEffect(() => {
    const townMap = new Map();
    let min = new Date();
    let max = new Date(0);
    data.forEach(({date, town, weather}) => {
      const dateObj = new Date(date);
      min = Math.min(dateObj, min);
      max = Math.max(dateObj, max);
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
    /*const dateSorter = (b,a) => {
      return b.date > a.date ? 1 : -1
    };
    townMap.forEach((value, key) => {
      const sortedWeather = value.sort(dateSorter);
      townMap.set(key, sortedWeather);
    });*/
    changeStartDate(min);
    changeEndDate(max);
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
        {filteredWeatherArray.map((item) => (
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
