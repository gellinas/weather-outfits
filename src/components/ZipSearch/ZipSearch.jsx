import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFiveDayForecast } from "../../api.js";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./ZipSearch.scss";

function ZipSearch(props) {
  const [zipCode, setZipCode] = useState("");
  const [zipcodeValid, setZipcodeValid] = useState(true);

  const fetchDayForecast = async () => {
    const response = await getFiveDayForecast(zipCode);
    if (response.cod === "404") {
      return false;
    } else {
      return true;
    }
  };

  const onSearchRedirect = async () => {
    const { history } = props;
    const zipcodeValidity = await fetchDayForecast();
    if (zipcodeValidity) {
      setZipcodeValid(true);
      history.push("/weekly", { zipCode: zipCode });
    } else {
      setZipcodeValid(false);
    }
  };

  const onReturn = async (event) => {
    if (event.key === "Enter") {
      const { history } = props;
      const zipcodeValidity = await fetchDayForecast();
      if (zipcodeValidity) {
        setZipcodeValid(true);
        history.push("/weekly", { zipCode: zipCode });
      } else {
        setZipcodeValid(false);
      }
    }
  };

  const zipcodeOnLanding = props.landingZip ? "landing-zip" : "not-valid";

  return (
    <div className="zip-search">
      <InputGroup className="zip-input">
        <FormControl
          placeholder="Search US Zip Code"
          aria-label="Search Zip Code"
          aria-describedby="basic-addon2"
          value={zipCode}
          onChange={(event) => {
            setZipCode(event.target.value);
          }}
          onKeyPress={onReturn}
        />
        <InputGroup.Append>
          <Button variant="outline-dark" onClick={onSearchRedirect}>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {zipcodeValid ? null : (
        <div className={zipcodeOnLanding}>ZIPCODE IS NOT VALID</div>
      )}
    </div>
  );
}

export default ZipSearch;
