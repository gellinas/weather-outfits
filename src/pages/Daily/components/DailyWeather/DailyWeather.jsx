import React from "react";
import { getDate } from "../../../../util.js";
import Button from "react-bootstrap/Button";

import "./DailyWeather.scss";

function DailyWeather(props) {
  const { tempInfo } = props;
  const theTempF = `${Math.round(tempInfo.main.temp_max)} F`;

  const onBackButtonClick = () => {
    const { history } = props;
    history.push("/weekly", { zipCode: props.location.state.zipCode });
  };

  return (
    <div className="daily-weather-container">
      <div className="day-date">{getDate(tempInfo.dt_txt)}</div>
      <div className="day-temp">{theTempF}</div>
      <div className="day-weather">{tempInfo.weather[0].main}</div>
      <Button
        className="daily-back-button"
        variant="light"
        onClick={onBackButtonClick}
      >
        Back
      </Button>
    </div>
  );
}

export default DailyWeather;
