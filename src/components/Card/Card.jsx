import React, { useState } from "react";

export const Card = () => {
  // Dummy data
  const dummySoltArt = [
    { price: 100, createdAt: "2024-08-21T00:00:00Z" },
    { price: 150, createdAt: "2024-08-20T00:00:00Z" }
  ];

  const dummySoltMusic = [
    { price: 200, createdAt: "2024-08-21T00:00:00Z" },
    { price: 250, createdAt: "2024-08-19T00:00:00Z" }
  ];

  // Calculate total revenue
  const total = [...dummySoltArt, ...dummySoltMusic].reduce(
    (acc, data) => acc + data.price,
    0
  );

  // Calculate today's revenue
  const todays = (() => {
    const currentDate = new Date();
    const filteredData = [...dummySoltArt, ...dummySoltMusic].filter((item) => {
      const itemDate = new Date(item.createdAt);
      return (
        itemDate.getFullYear() === currentDate.getFullYear() &&
        itemDate.getMonth() === currentDate.getMonth() &&
        itemDate.getDate() === currentDate.getDate()
      );
    });
    return filteredData.reduce((acc, data) => acc + data.price, 0);
  })();

  // Static card styling
  const cardStyle = {
    backgroundColor: "#f5f5f5", // Example background color
    border: "1px solid #ddd",    // Example border color
    color: "#333",               // Example text color
  };

  return (
    <div className="w-full flex flex-wrap justify-between gap-3">
      <div
        className="w-full sm:w-[48%] lg:w-[24%] h-28 rounded-2xl p-4"
        style={cardStyle}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Total Art</p>
            <p className="text-xl font-bold">{dummySoltArt.length}</p>
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
            <p className="text-sm font-semibold">Total Music</p>
            <p className="text-xl font-bold">{dummySoltMusic.length}</p>
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
            <p className="text-xl font-bold">₹{total}</p>
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
            <p className="text-sm font-semibold">Today&apos;s Revenue</p>
            <p className="text-xl font-bold">₹{todays}</p>
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
