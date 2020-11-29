const getFiveDayForecast = async (zipcode) => {
  const url = `http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipcode}&units=imperial&appid=bd4b7345ee94566aaa64bca2c95f14b2&cnt=5`;
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  return data;
};

const getWeatherOutfits = async () => {
  const url =
    "https://firestore.googleapis.com/v1/projects/projects-9e89d/databases/(default)/documents/weather-outfits?pageSize=100";
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  return data;
};

const getTodaysForecast = async (zipcode) => {
  const url = `http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipcode}&units=imperial&appid=bd4b7345ee94566aaa64bca2c95f14b2&cnt=1`;
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  return data;
};

export { getFiveDayForecast, getWeatherOutfits, getTodaysForecast };
