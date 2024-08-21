import React, { useEffect, useState } from 'react';
import SalesChart from './SalesChart';

const SalesGraph = () => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2024); // Default year

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    const lastPrevYear = previousYear - 1;
    setYears([currentYear, previousYear, lastPrevYear]);
  }, []);

  const handleChangeYear = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  return (
    <div className="w-full h-96 rounded-2xl p-4 bg-white border border-gray-300 text-black">
      <div className="flex justify-between">
        <div>
          <p className="text-lg font-semibold">Sales Overview</p>
          <p className="text-gray-500">
            <span className="text-green-500">5%</span> more in {selectedYear}
          </p>
        </div>
        <div>
          <select
            className="w-40 h-10 border border-gray-300 rounded-xl bg-white text-black"
            onChange={handleChangeYear}
            value={selectedYear}
          >
            {years.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <SalesChart year={selectedYear} />
      </div>
    </div>
  );
};

export default SalesGraph;
