import { useState, useEffect } from 'react';
import Countries from './Countries';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [continentFilter, setContinentFilter] = useState('');
  const [subRegionFilter, setSubRegionFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [top10Metric, setTop10Metric] = useState('');
  const [subRegions, setSubRegions] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data); 
      })
      .catch((error) => console.error('Error fetching country data:', error));
  }, []);

  useEffect(() => {
    if (continentFilter) {
      const filteredByContinent = countries.filter((country) =>
        continentFilter === 'North America' || continentFilter === 'South America'
          ? country.subregion === continentFilter
          : country.continents.includes(continentFilter)
      );
      const uniqueSubRegions = Array.from(
        new Set(filteredByContinent.map((country) => country.subregion).filter(Boolean))
      );
      setSubRegions(uniqueSubRegions.sort());
    } else {
      setSubRegions([]);
    }

    setSubRegionFilter('');
  }, [continentFilter, countries]);

  useEffect(() => {
    let data = [...countries];

    if (continentFilter) {
      if (continentFilter === 'North America' || continentFilter === 'South America') {
        data = data.filter((country) => country.subregion === continentFilter);
      } else {
        data = data.filter((country) => country.continents.includes(continentFilter));
      }
    }

    if (subRegionFilter) {
      data = data.filter((country) => country.subregion === subRegionFilter);
    }

    if (sortOption === 'alphabetically') {
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sortOption === 'population') {
      data.sort((a, b) => b.population - a.population);
    } else if (sortOption === 'area') {
      data.sort((a, b) => b.area - a.area);
    }

    if (top10Metric) {
      if (top10Metric === 'population') {
        data = data.sort((a, b) => b.population - a.population).slice(0, 10);
      } else if (top10Metric === 'area') {
        data = data.sort((a, b) => b.area - a.area).slice(0, 10);
      }
    }

    setFilteredCountries(data);
  }, [continentFilter, subRegionFilter, sortOption, top10Metric, countries]);

  const handleContinentChange = (e) => {
    setContinentFilter(e.target.value);
    setSubRegionFilter('');
  };

  const handleSubRegionChange = (e) => {
    setSubRegionFilter(e.target.value);
    setContinentFilter('');
  };

  return (
    <div className="App">
      <h1>Countries of the World</h1>

      <div className="filters">
        <label>
          Continent:
          <select onChange={handleContinentChange} value={continentFilter}>
            <option value="">All</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
          </select>
        </label>

        <label>
          Subregion:
          <select
            onChange={handleSubRegionChange}
            value={subRegionFilter}
            disabled={!continentFilter}
          >
            <option value="">All</option>
            {subRegions.map((subregion) => (
              <option key={subregion} value={subregion}>
                {subregion}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sort by:
          <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
            <option value="">None</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="population">Population</option>
            <option value="area">Area</option>
          </select>
        </label>

        <label>
          Top 10:
          <select onChange={(e) => setTop10Metric(e.target.value)} value={top10Metric}>
            <option value="">None</option>
            <option value="population">Top 10 by Population</option>
            <option value="area">Top 10 by Area</option>
          </select>
        </label>
      </div>

      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
