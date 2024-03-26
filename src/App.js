import "./styles.css";
import React, { useState, useEffect } from "react";
// Assuming you have an external CSS file for styling

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search country..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="countryGrid">
        {filteredCountries.map((country) => (
          <div className="countryCard" key={country.name.common}>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
            />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
