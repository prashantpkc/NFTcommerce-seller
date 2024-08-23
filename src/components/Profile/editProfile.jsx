import React from "react";
import logo from "./logo.png";
const EditProfile = () => {
  return (
    <>
      <div className="border flex border-blue-700 bg-gradient-to-t from-blue-600 to-blue-900 rounded-lg h-[520px] text-white  pl-[16px] mb-3">
        <div>
          <h1 className="text-3xl pt-[150px]">Edit your profile</h1>
          <p>Edit your information?</p>
          <p className="text-2xl">in CENTUMO NFT workplace!</p>
          <h1 className="text-3xl font-bold mt-4">CENTUMO NFT</h1>
        </div>

        <div>
          <img src={logo} style={{ width: "400px", marginTop: "30px" }} />
        </div>

        <div
          className="border border-black bg-gradient-to-t from-gray-800 to-black
            text-white h-[520px] w-[450px] rounded-lg overflow-scroll pt-10 pl-10"
        >
          <h1 className="text-xl font-semibold mb-6">
            Welcome to CENTUMO NFT workplace
          </h1>
          <p className="mb-3 font-semibold">Edit your profile</p>
          <p>Full Name</p>
          <input
            type="text"
            className="w-[370px]  max-w-md text-white bg-transparent border-b border-gray-500  focus:outline-none mb-5"
          />

          <p>Phone Number</p>
          <input
            type="text"
            className="w-[370px]  max-w-md text-white bg-transparent border-b border-gray-500 focus:outline-none mb-5"
          />

          <p>Address</p>
          <input
            type="text"
            className="w-[370px]  max-w-md text-white bg-transparent border-b border-gray-500 focus:outline-none mb-5"
          />

          <p>State</p>
          <input
            type="text"
            className="w-[370px]  max-w-md text-white bg-transparent border-b border-gray-500 focus:outline-none mb-5"
          />

          <p>Country Name</p>
          <input
            type="text"
            className="w-[370px]  max-w-md text-white bg-transparent border-b border-gray-500 focus:outline-none mb-5"
          />

          <p>Pin Code</p>
          <input
            type="text"
            className="w-[370px]  max-w-md text-white bg-transparent border-b border-gray-500 focus:outline-none mb-5"
          />


          <button className="border border-blue-600 bg-blue-600 rounded-lg w-[370px] h-10 mb-4">Submit</button>
        </div>
      </div>
    </>
  );
};
export default EditProfile;
