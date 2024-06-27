const currencySigns = ["$", "€", "£", "¥", "₣"];

export function CurrencyArea({ currency, isLocationSet }) {
  if (currency.noCurrency)
    return (
      <div className="currency-area area-styling">
        <h3>Currency exchange rates</h3>
        <p className="no-content loading-indicator">
          Something went wrong with getting currency exchange rates for this location.
        </p>
      </div>
    );
  let baseCurrency, exchangeRates, mainWorldCurrencies;
  if (currency) {
    baseCurrency = Object.keys(currency).at(0);
    exchangeRates = currency[baseCurrency];
    mainWorldCurrencies = Object.keys(exchangeRates);
  }

  return (
    <div className="currency-area area-styling">
      <h3>Currency exchange rates</h3>

      {isLocationSet ? (
        <ul className="currency-list">
          {mainWorldCurrencies?.map((curr, i) => {
            return (
              <CurrencyRate
                baseCurrency={baseCurrency}
                worldCurrency={curr}
                exchangeRate={exchangeRates[curr]}
                currencySign={currencySigns.at(i)}
                key={curr}
              />
            );
          })}
        </ul>
      ) : (
        <p className="no-content">
          To get currency exchange rates for your destination, start entering a location name in the
          search field, and when you see the right one - press "Get" button or "Enter" key
        </p>
      )}
    </div>
  );
}
function CurrencyRate({ baseCurrency, worldCurrency, exchangeRate, currencySign }) {
  return (
    <li>
      <p className="world-currency">
        <span>100</span> <span>{worldCurrency} </span> <span>{currencySign}</span>
      </p>

      <p className="base-currency">
        = {(100 / exchangeRate).toFixed(2)} {baseCurrency}
      </p>
    </li>
  );
}
