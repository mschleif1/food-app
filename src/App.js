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

  const cuisineHash = {};
  const axios = require("axios");

  //sets the
  const searchForCity = (city, cuisines) => {
    const CITY_URL = "https://developers.zomato.com/api/v2.1/cities?q=";

    setCuisines(cuisines);

    axios.get(CITY_URL + city, { headers: { "user-key": API_KEY } }).then((response) => {
      if (response.data.location_suggestions.length > 0) {
        setCity(response.data.location_suggestions[0]);
      }
    });
  };

  useEffect(() => {}, []);

  console.log("i rerenderd");
  const createSearchUrl = () => {
    table.forEach((entry) => {
      cuisineHash[entry.cuisine_name] = entry.cuisine_id;
      console.log("Cuisine Hash created");
    });

    const baseURL = "https://developers.zomato.com/api/v2.1/search?entity_id=";
    if (cuisines.length > 0) {
      let cuisineString = "";
      if (cuisines.length === 1) cuisineString = cuisineHash[cuisines[0].label];
      else {
        cuisines.forEach((id, idx) => {
          console.log(cuisineHash);
          console.log(id.label);
          console.log(cuisineHash[id.label]);
          cuisineString += cuisineHash[id.label] + "%";
          if (idx < cuisines.length - 1) cuisineString += "2C";
        });
      }
      return `${baseURL + city.id}&entity_type=city&cuisines=${cuisineString}`;
    }
  };
  //useEffect that displays the results. Runs whenever the searched city is changed by
  //searchForCity
  useEffect(() => {
    if (city) {
      const thing = createSearchUrl();
      axios
        .get(
          "https://developers.zomato.com/api/v2.1/search?entity_id=" + city.id + "&entity_type=city" + "&cuisines=",
          {
            headers: { "user-key": API_KEY },
          }
        )
        .then((response) => {
          setRests(response.data.restaurants);
        });
    }
  }, [city]);

  const body = rests ? (
    <div>
      <Query searchForCity={searchForCity} hello={10} />
      <div className="card-group">
        {rests.map((rest) => (
          <Card rest={rest.restaurant} className="card" />
        ))}
      </div>
    </div>
  ) : (
    <div>
      <Query searchForCity={searchForCity} />
      <span>I'm fucking loading, chill.</span>
    </div>
  );

  if (city) {
    return body;
  } else
    return (
      <div>
        <Query searchForCity={searchForCity} />
        <br></br>
        <span>Enter a your city to get searching!</span>
      </div>
    );
}

export default App;
