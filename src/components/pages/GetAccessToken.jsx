import React, { useState } from 'react';
import axios from 'axios';

const GetAccessToken = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleRequestToken = async () => {
    const url = 'https://api-sg.aliexpress.com/rest/auth/token/security/create';

    const data = { };

    try {
      const res = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResponse(res.data);
      console.log(res.data)
    } catch (err) {
      setError(err.response ? err.response.data : 'An error occurred');
    }
  };

  return (
    <div>
      <h1>Request AliExpress Auth Token</h1>
      <button onClick={handleRequestToken}>Request Token</button>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div>
          <h2>Error:</h2>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default GetAccessToken;
