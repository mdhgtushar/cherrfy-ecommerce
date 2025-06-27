import React, { useEffect, useState } from 'react';

const CurrencyTax = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'a614e63aba104d0a867f27c69ff68ac4';
  const ttl = 86400 * 1000; // 24 hours in ms
  const cacheKey = 'currency_tax_data';

  const countryCurrencyMap = {
    US: 'USD', CA: 'CAD', GB: 'GBP', AU: 'AUD', DE: 'EUR',
    FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR', PL: 'PLN',
    SE: 'SEK', NO: 'NOK', FI: 'EUR', DK: 'DKK', IE: 'EUR',
    PT: 'EUR', BE: 'EUR', CH: 'CHF', AT: 'EUR', CZ: 'CZK',
    SK: 'EUR', HU: 'HUF', RO: 'RON', BG: 'BGN', GR: 'EUR',
    SI: 'EUR', HR: 'EUR', EE: 'EUR', LV: 'EUR', LT: 'EUR',
    LU: 'EUR', MT: 'EUR', CY: 'EUR', NZ: 'NZD', AE: 'AED',
    IL: 'ILS', TR: 'TRY', MX: 'MXN', BR: 'BRL', AR: 'ARS',
    ZA: 'ZAR', BD: 'BDT'
  };

  useEffect(() => {
    const fetchData = async () => {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < ttl) {
          setData(parsed);
          return;
        }
      }

      try {
        const res = await fetch(`https://api.currencyfreaks.com/latest?apikey=${apiKey}`);
        const json = await res.json();

        if (!json.rates) throw new Error("Invalid response from CurrencyFreaks");

        const filtered = {};
        for (const [country, currency] of Object.entries(countryCurrencyMap)) {
          if (json.rates[currency]) {
            filtered[country] = {
              currency,
              rate: parseFloat(json.rates[currency])
            };
          }
        }

        const finalData = {
          source: 'live',
          updated_at: new Date().toISOString(),
          rates: filtered,
          timestamp: Date.now()
        };

        localStorage.setItem(cacheKey, JSON.stringify(finalData));
        setData(finalData);
      } catch (err) {
        setError('Failed to fetch currency data.');
      }
    };

    fetchData();
  }, []);

  if (error) return <pre>{JSON.stringify({ error }, null, 2)}</pre>;
  if (!data) return <pre>Loading...</pre>;

  return (
    <pre>{JSON.stringify({
      source: 'cache',
      updated_at: data.updated_at,
      rates: data.rates
    }, null, 2)}</pre>
  );
};

export default CurrencyTax;
