import React from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "./Map.jsx";
import { Icon } from "@iconify/react";
import star from "@iconify/icons-mdi/star";

export default ({ rest }) => {
  const createHeader = () => {
    if (rest.featured_image === "") {
      return <Map location={{ lat: parseFloat(rest.location.latitude), lng: parseFloat(rest.location.longitude) }} />;
    } else {
      return <img src={rest.featured_image} className="card-img" />;
    }
  };

  return (
    <div>
      <Card style={{ width: "250px" }}>
        <div className="crop-div">{createHeader()}</div>
        <Card.Body>
          <Card.Title style={{ fontSize: "1rem" }}>{rest.name}</Card.Title>
          <Card.Text>
            {rest.location.city}
            <br></br>
            {rest.user_rating.aggregate_rating}
            <Icon icon={star} />
            <br></br>
            {rest.establishment[0]}
          </Card.Text>
          <Button variant="primary" onClick={() => window.open(rest.menu_url)}>
            Menu
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
