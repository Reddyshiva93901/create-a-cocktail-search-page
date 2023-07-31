import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchCocktails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await response.json();
      setCocktails(data.drinks || []);
    } catch (error) {
      console.error("Error fetching cocktails:", error);
      setCocktails([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchCocktails();
  };

  return (
    <div className="App">
      <h1>Cocktail Search</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search cocktails..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="Cocktails">
          {cocktails.length === 0 ? (
            <p>No cocktails found.</p>
          ) : (
            cocktails.map((cocktail) => (
              <div key={cocktail.idDrink} className="Cocktail">
                <h2>{cocktail.strDrink}</h2>
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default App;
