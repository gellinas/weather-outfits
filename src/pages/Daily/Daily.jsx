import React, { useEffect, useState } from "react";
import NavbarTop from "../../components/Navbar/NavbarTop.jsx";
import DailyOutfit from "./components/DailyOutfit/DailyOutfit.jsx";
import DailyWeather from "./components/DailyWeather/DailyWeather.jsx";
import { getLocation, getOutfitByTemp } from "../../util.js";
import { getTodaysForecast, getWeatherOutfits } from "../../api.js";
import { get, isEmpty, groupBy } from "lodash";

import "./Daily.scss";

function Daily(props) {
  const [dayForecast, setDayForecast] = useState({
    list: [],
    city: {},
    weather: [],
  });
  const [weatherOutfits, setWeatherOutfits] = useState({});

  useEffect(() => {
    if (
      get(props.location.state, "zipCode") &&
      !get(props.location.state, "tempInfo", false)
    ) {
      const fetchDayForecast = async () => {
        const response = await getTodaysForecast(props.location.state.zipCode);
        setDayForecast(response);
      };

      const fetchWeatherOutfits = async () => {
        const response = await getWeatherOutfits();
        const groupedTempOutfits = groupBy(
          response.documents,
          "fields.temp_key.stringValue"
        );
        setWeatherOutfits(groupedTempOutfits);
      };
      fetchWeatherOutfits();
      fetchDayForecast();
    } else if (isEmpty(props.location.state)) {
      history.push("/");
    }
  }, []);

  if (get(props.location.state, "tempInfo")) {
    return (
      <div className="daily-container">
        <NavbarTop {...props} />
        <div className="get-local">
          {getLocation(props.location.state.cityInfo)}
        </div>
        <div className="daily-body">
          <DailyWeather {...props} tempInfo={props.location.state.tempInfo} />
          <div className="daily-outfits-contained">
            {props.location.state.outfits.map((item, index) => {
              if (index < 10) {
                return (
                  <div id="weather-outfit-key" key={item.name}>
                    <DailyOutfit
                      outfit={item.fields.outfit.stringValue}
                      outfitTemp={item.fields.temp_key.stringValue}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  } else {
    const outfits = getOutfitByTemp(
      dayForecast.list[0].temp.day,
      weatherOutfits
    );
    return (
      <div className="daily-container">
        <NavbarTop {...props} />
        <div className="get-local">{getLocation(dayForecast)}</div>
        <div className="daily-body">
          <DailyWeather {...props} tempInfo={dayForecast.list[0].temp.day} />
          <div className="daily-outfits-contained">
            {outfits.group.map((item, index) => {
              if (index < 10) {
                return (
                  <div id="weather-outfit-key" key={item.name}>
                    <DailyOutfit
                      outfit={item.fields.outfit.stringValue}
                      outfitTemp={item.fields.temp_key.stringValue}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Daily;
