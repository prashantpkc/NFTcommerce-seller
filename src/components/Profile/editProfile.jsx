import React, { useState, useEffect } from "react";
import logo from "./logo.png";
import { useSelector, useDispatch } from "react-redux";
import { editSeller, getSeller } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",    
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        postalCode: user.postalCode || "",
        country: user.country || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allFieldsFilled = Object.values(formData).every(field => field.trim() !== "");
    if (!allFieldsFilled) {
      toast.error("Please fill out all fields.");
      return;
    }
    dispatch(editSeller(formData));
    dispatch(getSeller());
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between border border-blue-700 bg-gradient-to-t from-blue-600 to-blue-900 rounded-lg p-4 md:h-[520px] text-white mb-3">
      <div className="md:w-1/2 lg:w-1/3 text-center md:text-left mb-6 md:mb-0">
        <h1 className="text-3xl pt-6 md:pt-[150px]">Edit your profile</h1>
        <p>Edit your information?</p>
        <p className="text-2xl">in CENTUMO NFT workplace!</p>
        <h1 className="text-3xl font-bold mt-4">CENTUMO NFT</h1>
      </div>

      <div className="hidden md:block">
        <img src={logo} alt="Logo" className="w-[200px] md:w-[400px] mt-4 md:mt-[30px]" />
      </div>

      <div className="md:w-1/2 lg:w-1/3 bg-gradient-to-t from-gray-800 to-black text-white rounded-lg overflow-y-scroll p-6 h-full">
        <h1 className="text-xl font-semibold mb-6 text-center">Welcome to CENTUMO NFT workplace</h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key} className="mb-5">
              <p className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
              <input
                type="text"
                name={key}
                className="w-full md:w-[370px] bg-transparent border-b border-gray-500 focus:outline-none text-white"
                value={formData[key]}
                onChange={handleChange}
              />
            </div>
          ))}
          <button type="submit" className="border border-blue-600 bg-blue-600 rounded-lg w-full md:w-[370px] h-10 mb-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
