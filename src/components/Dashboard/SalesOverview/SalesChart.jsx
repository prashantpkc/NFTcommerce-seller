import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import moment from 'moment';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-500 text-white border rounded-2xl p-2">
        <p className="text-sm">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm">{`${entry.name} : ${entry.value}`}</p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomDot = (props) => {
  const { cx, cy, payload } = props;

  if (payload.value > 0) {
    return (
      <svg
        x={cx - 5}
        y={cy - 5}
        width={10}
        height={10}
        fill="#8884d8"
        className="block text-white"
        stroke="none"
        viewBox="0 0 1024 1024"
      >
        <circle cx={5} cy={5} r={5} fill="#82ca9d" />
      </svg>
    );
  }

  return null;
};

// Dummy data
const dummyArtData = [
  { createdAt: "2024-01-15T00:00:00Z" },
  { createdAt: "2024-02-20T00:00:00Z" },
  // Add more dummy data as needed
];

const dummyMusicData = [
  { createdAt: "2024-01-10T00:00:00Z" },
  { createdAt: "2024-03-25T00:00:00Z" },
  // Add more dummy data as needed
];

const SalesChart = ({ isDarkEnabled, year }) => {
  const [filteredData, setFilteredData] = useState([]);

  const lineColorArt = isDarkEnabled ? "#5E72E4" : "#5E72E4";
  const lineColorMusic = isDarkEnabled ? "#82ca9d" : "#82ca9d";
  const gridColor = isDarkEnabled ? "#D3D3D3" : "#e0e0e0";
  const axisColor = isDarkEnabled ? "#D3D3D3" : "#333";
  const legendTextColor = isDarkEnabled ? "#D3D3D3" : "#000";

  useEffect(() => {
    filterData();
  }, [year]);

  const filterData = () => {
    const filteredArt = dummyArtData.filter(item =>
      moment(item.createdAt).year() === year
    );

    const filteredMusic = dummyMusicData.filter(item =>
      moment(item.createdAt).year() === year
    );

    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      name: moment().month(i).format("MMM"),
      art: 0,
      music: 0,
    }));

    filteredArt.forEach(item => {
      const month = moment(item.createdAt).month();
      monthlyData[month].art += 1;
    });

    filteredMusic.forEach(item => {
      const month = moment(item.createdAt).month();
      monthlyData[month].music += 1;
    });

    setFilteredData(monthlyData);
  };

  return (
    <ResponsiveContainer width="98%" height={300}>
      <LineChart data={filteredData}>
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="4"
              floodColor={lineColorArt}
              floodOpacity="0.8"
            />
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="name" stroke={axisColor} />
        <YAxis stroke={axisColor} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: legendTextColor }} />
        <Line
          type="monotone"
          dataKey="art"
          name="Art"
          stroke={lineColorArt}
          strokeWidth={3}
          dot={<CustomDot />}
          filter="url(#shadow)"
        />
        <Line
          type="monotone"
          dataKey="music"
          name="Music"
          stroke={lineColorMusic}
          strokeWidth={3}
          dot={<CustomDot />}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
