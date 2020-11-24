import React, { useEffect } from "react";
import { useState } from "react";
import Card from "./components/Card";
import Query from "./components/Query";

import { labels, table } from "./components/CuisineList";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_KEY } from "./credentials";

function App() {
  const [rests, setRests] = useState(null);
  const [city, setCity] = useState(null);
  const [cuisines, setCuisines] = useState([]);
  const [search, setSearch] = useState(false);

  const cuisineHash = {};
  const axios = require("axios");

  //Is intended to search for and update data.
  const updateData = (searchCity, searchCuisines) => {
    const CITY_URL = "https://developers.zomato.com/api/v2.1/cities?q=";

    axios.get(CITY_URL + searchCity, { headers: { "user-key": API_KEY } }).then((response) => {
      debugger;
      if (response.data.location_suggestions.length > 0) {
        console.log("i got here");
        setCity(response.data.location_suggestions[0]);
        setSearch((prev) => !prev);
        setCuisines(searchCuisines);
      }
    });
  };

  const createSearchUrl = () => {
    table.forEach((entry) => {
      cuisineHash[entry.cuisine_name] = entry.cuisine_id;
    });

    const baseURL = "https://developers.zomato.com/api/v2.1/search?entity_id=";
    if (cuisines.length > 0) {
      let cuisineString = "";
      if (cuisines.length === 1) cuisineString = cuisineHash[cuisines[0].label];
      else {
        cuisines.forEach((id, idx) => {
          cuisineString += cuisineHash[id.label] + "%";
          if (idx < cuisines.length - 1) cuisineString += "2C";
        });
      }
      return `${baseURL + city.id}&entity_type=city&cuisines=${cuisineString}`;
    } else {
      return `${baseURL + city.id}&entity_type=city`;
    }
  };

  useEffect(() => {
    debugger;
    if (city) {
      axios
        .get(createSearchUrl(), {
          headers: { "user-key": API_KEY },
        })
        .then((response) => {
          setRests(response.data.restaurants);
        });
    }
  }, [search]);

  const body = rests ? (
    <div>
      <Query updateData={updateData} />
      <div className="card-group">
        {rests.map((rest) => (
          <Card rest={rest.restaurant} className="card" />
        ))}
      </div>
    </div>
  ) : (
    <div>
      <Query updateData={updateData} />
      <span>I'm fucking loading, chill.</span>
    </div>
  );

  if (city) {
    return body;
  } else
    return (
      <div>
        <Query updateData={updateData} />
        <br></br>
        <span>Enter a your city to get searching!</span>
      </div>
    );
}

export default App;
