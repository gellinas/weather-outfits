import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import DailyOutfit from "../../../Daily/components/DailyOutfit/DailyOutfit.jsx";

import "./WeeklyCard.scss";

function WeeklyCard(props) {
  const { temp, date, weather, outfit, onClick } = props;

  return (
    <Card className="weekly-card">
      <Card.Text>{date}</Card.Text>
      <Card.Title>{temp}</Card.Title>
      <Card.Text>{weather}</Card.Text>
      <DailyOutfit outfit={outfit} />
      <Button className="see-more-button" variant="light" onClick={onClick}>
        See More Outfits
      </Button>
    </Card>
  );
}

export default WeeklyCard;
