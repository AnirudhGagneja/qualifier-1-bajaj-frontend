import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [inputData, setInputData] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload
    const payload = {
      data: inputData.split(",").map((item) => item.trim()),
    };

    try {
      // Make the POST request
      const res = await axios.post("http://localhost:3000/bfhl", payload);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data : "An error occurred");
      setResponse(null);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>BFHL Frontend</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter data (comma-separated):
          <input
            type="text"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="e.g., 2, 4, 5, 92"
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
        <button type="submit" style={{ marginLeft: "10px", padding: "5px 10px" }}>
          Submit
        </button>
      </form>

      {response && (
        <div style={{ marginTop: "20px" }}>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <h2>Error:</h2>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;