import React from "react";
import LandingHeader from "./components/LandingHeader/LandingHeader.jsx";
import ZipSearch from "../../components/ZipSearch/ZipSearch.jsx";

import "./Landing.scss";

function Landing(props) {
  return (
    <div className="landing-container">
      <LandingHeader />
      <div className="landing-body">
        <div>Providing you with outfit inspiration for the weather</div>
        <div className="zip-searching">
          <ZipSearch {...props} landingZip="landing-zip" />
        </div>
      </div>
    </div>
  );
}

export default Landing;
