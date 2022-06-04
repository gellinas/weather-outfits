const getFiveDayForecast = async (zipcode) => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&units=imperial&appid=0e36b28a5153fda888b2619f10568722`;
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
  const url = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&units=imperial&appid=0e36b28a5153fda888b2619f10568722`;
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  return data;
};

export { getFiveDayForecast, getWeatherOutfits, getTodaysForecast };
