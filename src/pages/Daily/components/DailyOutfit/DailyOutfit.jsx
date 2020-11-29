import React from "react";

import "./DailyOutfit.scss";

function DailyOutfit(props) {
  const { outfit } = props;
  return (
    <img className="outfit-daily-img" src={outfit} alt="outfit for weather" />
  );
}

export default DailyOutfit;
