import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Line } from "react-chartjs-2";

const Dashboard = ({ metric }) => {
  const [timestamps, setTimestampList] = useState([]);
  const [measures, setMeasureValueList] = useState([]);
  useEffect(() => {
    const { timestampList, measureValueList } = metric.measureData.reduce(
      (acc, curr) => {
        acc.timestampList.push(curr.timestamp);
        acc.measureValueList.push(curr.measureValue);

        return acc;
      },
      { timestampList: [], measureValueList: [] }
    );
    setTimestampList(timestampList);
    setMeasureValueList(measureValueList);
  }, []);

  const data = {
    // labels = last 30 min
    labels: timestamps.map((t) => new Date(t).toLocaleTimeString("tr-TR")),

    // label, data
    datasets: [
      {
        label: metric.measureName,
        data: measures,
        backgroundColor: "transparent",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="m-container__dashboard">
      <Line data={data} options={{}} />
      {/* <h1>Hello World</h1> */}
    </div>
  );
};

Dashboard.propTypes = {
  metric: PropTypes.array.isRequired,
};

export default Dashboard;
