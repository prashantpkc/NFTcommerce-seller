import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerCardSummary } from "../../redux/slices/cardSlice";

export const Card = () => {
  const dispatch = useDispatch();
  const { summaryData, loading, error } = useSelector((state) => state.card);

  useEffect(() => {
    dispatch(fetchSellerCardSummary());
  }, [dispatch]);

  const totalSoldItems = summaryData?.data?.totalSoldItems || 0;
  const totalRevenue = summaryData?.data?.totalRevenue || 0;
  const todayRevenue = summaryData?.data?.todayRevenue || 0;
  const totalBuyers = summaryData?.data?.totalBuyers || 0;

  // Static card styling
  const cardStyle = {
    backgroundColor: "#fff", // Example background color
    border: "1px solid #ddd",    // Example border color
    color: "#333",               // Example text color
  };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full flex flex-wrap justify-between gap-3">
      <div
        className="w-full sm:w-[48%] lg:w-[24%] h-28 rounded-2xl p-4"
        style={cardStyle}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Total Sold Items</p>
            <p className="text-xl font-bold">{totalSoldItems}</p>
          </div>
        </div>
        <div className="flex">
          <p className="font-semibold text-[#23e751]">5%</p>&nbsp;
          <p>since last year</p>
        </div>
      </div>

      <div
        className="w-full sm:w-[48%] lg:w-[24%] h-28 rounded-2xl p-4"
        style={cardStyle}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Total Buyers</p>
            <p className="text-xl font-bold">{totalBuyers}</p>
          </div>
        </div>
        <div className="flex">
          <p className="font-semibold text-[#23e751]">5%</p>&nbsp;
          <p>since last year</p>
        </div>
      </div>

      <div
        className="w-full sm:w-[48%] lg:w-[24%] h-28 rounded-2xl p-4"
        style={cardStyle}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Total Revenue</p>
            <p className="text-xl font-bold">₹{totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex">
          <p className="font-semibold text-[#23e751]">5%</p>&nbsp;
          <p>since last year</p>
        </div>
      </div>

      <div
        className="w-full sm:w-[48%] lg:w-[24%] h-28 rounded-2xl p-4"
        style={cardStyle}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Today's Revenue</p>
            <p className="text-xl font-bold">₹{todayRevenue.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex">
          <p className="font-semibold text-[#23e751]">5%</p>&nbsp;
          <p>since last year</p>
        </div>
      </div>
    </div>
  );
};
