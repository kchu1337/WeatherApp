import {WEATHER_TYPE_MAP} from './constants'
/**
 * Returns true if valid weather data set, false otherwise
 *
 * @param {String} date - date in any valid format
 * @param {String} town - string that represents the town
 * @param {enum[String]} weather - type of weather
 * @return {Boolean}
 */
export const isValidWeatherDataSet = ({date, town, weather}) => {

  if(!date || isNaN(Date.parse(date))){
    return false;
  }
  if (!town || typeof town !== 'string'){
    return false;
  }
  if (!weather || typeof weather !== 'string' || !WEATHER_TYPE_MAP[weather]){
    return false;
  }
  return true;
}
