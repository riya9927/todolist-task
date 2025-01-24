const API_KEY = '1ca9c6b78a6fd1a2df442815c3e4698f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const WeatherWidget = async () => {
  const location = 'Mumbai'; 
  const url = `${BASE_URL}?q=${location}&units=metric&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  const data = await response.json();
  return {
    description: data.weather[0].description,
    temp: data.main.temp,
  };
};
