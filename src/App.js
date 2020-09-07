import React, { useEffect, useState } from "react";

import Dashboard from "./components/Dashboard";
import "./perfAnalytics";

function App() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(false);
  // Create new url and apply query
  // We can also use axios but don't necessarily
  const url = new URL(baseFetchUrl);
  const params = [["lastMinutes", 10]];
  url.search = new URLSearchParams(params).toString();

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const chartList = metrics.map((metric) => {
    return <Dashboard metric={metric} key={metric.measureName} />;
  });

  return (
    <div className="m-container">
      {loading ? <h1>Loading...</h1> : chartList}
    </div>
  );
}

export default App;
