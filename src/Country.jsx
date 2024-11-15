function Country({ country }) {
    return (
      <div className="country">
        <img src={country.flags.png} alt={`${country.name.common} flag`} className="flag" />
        <h2>{country.name.common}</h2>
        <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
        <p><strong>Continent:</strong> {country.continents.join(', ')}</p>
        <p><strong>Sub-region:</strong> {country.subregion || 'N/A'}</p>
      </div>
    );
  }
  
  export default Country;
  