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
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState(true);
  const [sortBy, setSortBy] = useState(0);

  const cuisineHash = {};
  const axios = require("axios");

  //Is intended to search for and update data.
  const updateData = (searchCity, searchCuisines, sortOption) => {
    setLoading(true);
    const CITY_URL = "https://developers.zomato.com/api/v2.1/cities?q=";

    axios.get(CITY_URL + searchCity, { headers: { "user-key": API_KEY } }).then((response) => {
      if (response.data.location_suggestions.length > 0) {
        setCity(response.data.location_suggestions[0]);
        setCuisines(searchCuisines);
        setSortBy(sortOption);
        setSearch((prev) => !prev);
        if (initial) setInitial(false);
      }
    });
  };

  const createSearchUrl = () => {
    table.forEach((entry) => {
      cuisineHash[entry.cuisine_name] = entry.cuisine_id;
    });

    const baseURL = "https://developers.zomato.com/api/v2.1/search?entity_id=";

    let sortString = "";

    //Sort by highest rated
    if (sortBy === 0) {
      sortString = "&sort=rating&order=desc";
    }

    //Sort by most expensive
    else if (sortBy === 1) {
      sortString = "&sort=cost&order=desc";
    }

    //Sort by the cheapest
    else {
      sortString = "&sort=cost&order=asc";
    }

    if (cuisines.length > 0) {
      let cuisineString = "";
      if (cuisines.length === 1) cuisineString = cuisineHash[cuisines[0].label];
      else {
        cuisines.forEach((id, idx) => {
          cuisineString += cuisineHash[id.label] + "%";
          if (idx < cuisines.length - 1) cuisineString += "2C";
        });
      }
      return `${baseURL + city.id}&entity_type=city&cuisines=${cuisineString}${sortString}`;
    } else {
      return `${baseURL + city.id}&entity_type=city${sortString}`;
    }
  };

  useEffect(() => {
    if (city) {
      axios
        .get(createSearchUrl(), {
          headers: { "user-key": API_KEY },
        })
        .then((response) => {
          setRests(response.data.restaurants);
          setLoading(false);
        });
    }
  }, [search]);

  const body =
    !loading && rests ? (
      <div>
        <div className="card-group">
          {rests.map((rest) => (
            <Card rest={rest.restaurant} className="card" />
          ))}
        </div>
      </div>
    ) : (
      <div>
        <span>I'm fucking loading, chill.</span>
      </div>
    );

  if (!initial) {
    return (
      <div>
        <Query updateData={updateData} />
        {body}
      </div>
    );
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
