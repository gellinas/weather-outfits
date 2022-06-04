import React from "react";
import { isEmpty } from "lodash";

const getLocation = (dayForecast) => {
  const location = `${dayForecast.city.name}, ${dayForecast.city.country}`;
  return <div>{location}</div>;
};

const getDate = (dt) => {
  const dateString = new Date(dt).toLocaleDateString("en-US",{timeZone: "UTC", day: "2-digit", month: "short", year: "numeric", weekday: "short"});
  return dateString;
};

const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getOutfitByTemp = (temp, outfits) => {
  if (!isEmpty(outfits)) {
    if (temp <= 55) {
      return {
        outfit: outfits.cold[randomNumber(0, 8)].fields.outfit.stringValue,
        group: outfits.cold,
      };
    } else if (temp > 55 && temp <= 65) {
      return {
        outfit: outfits.chilly[randomNumber(0, 9)].fields.outfit.stringValue,
        group: outfits.chilly,
      };
    } else if (temp > 65 && temp <= 75) {
      return {
        outfit: outfits.warm[randomNumber(0, 8)].fields.outfit.stringValue,
        group: outfits.warm,
      };
    } else if (temp > 75 && temp <= 85) {
      return {
        outfit: outfits.hot[randomNumber(0, 4)].fields.outfit.stringValue,
        group: outfits.hot,
      };
    } else {
      return {
        outfit: outfits.scorching[randomNumber(0, 4)].fields.outfit.stringValue,
        group: outfits.scorching,
      };
    }
  } else {
    return { outfit: "", group: {} };
  }
};

export { getOutfitByTemp, randomNumber, getLocation, getDate };
