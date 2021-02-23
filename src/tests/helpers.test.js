import {
  isValidWeatherDataSet
} from '../helpers';

const validInput = {
  date: "01/01/2021 04:00 AM",
  town: "Arlington",
  weather: "Cloudy"
};

describe('isValidWeatherDataSet', () => {
  it('should return true if input is valid', () => {
    expect(isValidWeatherDataSet(validInput)).toEqual(true);
  });

  it('should return false if all 3 keys are not there', () => {
    const input = {}
    expect(isValidWeatherDataSet(input)).toEqual(false);
  });

  it('should return false if date is invalid ', () => {
    const input = {...validInput, date: "55/70/123"}
    expect(isValidWeatherDataSet(input)).toEqual(false);
  });

  it('should return false if town is invalid', () => {
    const input = {...validInput, town: {town: 'arlington'}}
    expect(isValidWeatherDataSet(input)).toEqual(false);
  });

  it('should return false if weather is invalid', () => {
    const input = {...validInput, weather: "Tornado"}
    expect(isValidWeatherDataSet(input)).toEqual(false);
  });
});
