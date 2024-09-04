import React, { useEffect, useState } from 'react';
import SalesChart from './SalesChart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthlySalesData } from '../../../redux/slices/cardSlice';

const SalesGraph = () => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2024); // Default year
  const dispatch = useDispatch();
  const { monthlyData, loading, error } = useSelector((state) => state.card);

  useEffect(() => {
    // Populate years for selection
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    const lastPrevYear = previousYear - 1;
    setYears([currentYear, previousYear, lastPrevYear]);
  }, []);

  useEffect(() => {
    // Fetch monthly sales data when year or month changes
    dispatch(fetchMonthlySalesData({ year: selectedYear,  }));
  }, [selectedYear, dispatch]);

  const handleChangeYear = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleChangeMonth = (event) => {
    setSelectedMonth(Number(event.target.value));
  };

  return (
    <div className="w-full h-96 rounded-2xl p-4 bg-white border border-gray-300 text-black">
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-lg font-semibold">Sales Overview</p>
          <p className="text-gray-500">
            <span className="text-green-500">5%</span> more in {selectedYear}
          </p>
        </div>
        <div>
          <select
            className="w-40 h-10 border border-gray-300 rounded-xl bg-white text-black mb-2"
            onChange={handleChangeYear}
            value={selectedYear}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
         
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <div>
        <SalesChart data={monthlyData.data} year={selectedYear} />
      </div>
    </div>
  );
};

export default SalesGraph;
