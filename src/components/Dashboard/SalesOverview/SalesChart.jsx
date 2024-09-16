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
import { useThemeColors } from '../../utils/useThemeColor';
import { useSelector } from 'react-redux';

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

const CustomDot = ({ cx, cy, payload }) => {
  if (payload.value > 0) {
    return (
      <svg
        x={cx - 5}
        y={cy - 5}
        width={10}
        height={10}
        fill="#8884d8"
        stroke="none"
        viewBox="0 0 1024 1024"
      >
        <circle cx={5} cy={5} r={5} fill="#82ca9d" />
      </svg>
    );
  }
  return null;
};

const SalesChart = ({ data, year }) => {
  const [filteredData, setFilteredData] = useState([]);
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const lineColorItems = "#5E72E4";
  const lineColorRevenue = "#82ca9d";
  const gridColor = "#e0e0e0";
  const axisColor = isDarkEnabled?"#fff":"#333";
  const legendTextColor = "#000";

  useEffect(() => {
    filterData();
  }, [data, year]);

  const filterData = () => {
    if (typeof data !== 'object' || data === null) {
      console.error('Expected data to be an object but got:', data);
      return;
    }

    // Map month names to indices
    const monthMap = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
    };

    // Initialize monthly data array
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      name: moment().month(i).format("MMM"),
      items: 0,
      revenue: 0,
    }));

    // Update monthly data based on the provided data object
    Object.keys(data).forEach(monthKey => {
      const monthIndex = monthMap[monthKey.toLowerCase()];
      if (monthIndex !== undefined) {
        monthlyData[monthIndex].items = data[monthKey].totalSoldItems || 0;
        monthlyData[monthIndex].revenue = data[monthKey].totalRevenue || 0;
      }
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
              floodColor={lineColorItems}
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
          dataKey="items"
          name="Items Sold"
          stroke={lineColorItems}
          strokeWidth={3}
          dot={<CustomDot />}
          filter="url(#shadow)"
        />
        <Line
          type="monotone"
          dataKey="revenue"
          name="Revenue"
          stroke={lineColorRevenue}
          strokeWidth={3}
          dot={<CustomDot />}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
