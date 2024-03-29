import React, { useState, useEffect } from "react";
import NavbarTop from "../../components/Navbar/NavbarTop.jsx";
import WeeklyCard from "./components/WeeklyCards/WeeklyCard.jsx";
import { getFiveDayForecast, getWeatherOutfits } from "../../api.js";
import { getOutfitByTemp, getDate, getLocation } from "../../util.js";
import { groupBy, get, uniqBy } from "lodash";

import "./Weekly.scss";

function Weekly(props) {
  const [dayForecast, setDayForecast] = useState({
    list: [],
    city: {},
    weather: [],
  });
  const [weatherOutfits, setWeatherOutfits] = useState({});

  useEffect(() => {
    if (!get(props.location.state, "zipCode", false)) {
      props.history.push("/");
    } else {
      const fetchDayForecast = async () => {
        const response = await getFiveDayForecast(props.location.state.zipCode);
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
    }
  }, [props.location.state.zipCode]);

  const onSeeMoreClick = (tempInfo, outfits) => {
    const { history } = props;
    const dailyProps = {
      tempInfo: tempInfo,
      cityInfo: dayForecast,
      outfits: outfits,
      zipCode: props.location.state.zipCode,
    };
    history.push("/daily", dailyProps);
  };

  return (
    <div className="weekly-container">
      <NavbarTop {...props} />
      <div className="get-local">{getLocation(dayForecast)}</div>
      <div className="weekly-body">
        {uniqBy(
          dayForecast.list.map((val) => {
            return { ...val, dt_txt: val.dt_txt.split(" ")[0] };
          }),
          "dt_txt"
        ).map((item, index) => {
          if (index <= 4) {
            return (
              <div id="forecast-day-key" key={index}>
                <WeeklyCard
                  temp={Math.round(item.main.temp_max)}
                  date={getDate(item.dt_txt)}
                  weather={item.weather[0].main}
                  outfit={
                    getOutfitByTemp(item.main.temp_max, weatherOutfits).outfit
                  }
                  onClick={() =>
                    onSeeMoreClick(
                      item,
                      getOutfitByTemp(item.main.temp_max, weatherOutfits).group
                    )
                  }
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Weekly;
