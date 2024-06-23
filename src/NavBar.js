import { useRef } from "react";
import { useKey } from "./useKey";

export function Logo() {
  return (
    <div className="logo">
      <h1>TravelImportant</h1>
    </div>
  );
}

export function LocationResult({ location, isLoading }) {
  let locationName = "🤔";
  if (location.name) locationName = location.name;

  return (
    <div className="results">
      <div className="default-text-container">
        <h2 className="default-text">Main info for</h2>
        {location.country_code ? (
          <img
            src={`https://flagcdn.com/${location.country_code?.toLowerCase()}.svg`}
            height="26"
            alt={`${location.countryCode} flag`}
          />
        ) : (
          <div className="flag-placeholder"></div>
        )}
      </div>

      {/* {isLoading ? (
        <h2 className="location-text loading-text">🤔</h2>
      ) : ()} */}
      <h2 className="location-text">{locationName}</h2>
    </div>
  );
}

export function Search({ locationQuery, onChangeLocationQuery, onGetLocationData }) {
  const inputElement = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputElement.current) {
      onGetLocationData();
    } else {
      inputElement.current.focus();
    }
  });

  return (
    <div className="search">
      <button onClick={onGetLocationData}>Get</button>
      <input
        type="text"
        placeholder="Search for location..."
        value={locationQuery}
        onChange={(e) => onChangeLocationQuery(e.target.value)}
        ref={inputElement}
      />
    </div>
  );
}
