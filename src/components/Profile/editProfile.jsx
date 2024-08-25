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
      console.log(user); // Check if user object contains email
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
  }, [user, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name}, Value: ${value}`); // Debug change
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check that all required fields are set
    const allFieldsFilled = Object.values(formData).every(field => field.trim() !== "");
    if (!allFieldsFilled) {
      toast.error("Please fill out all fields.");
      return;
    }
    dispatch(editSeller(formData));
    dispatch(getSeller())
  };  

  return (
    <div className="border flex border-blue-700 bg-gradient-to-t from-blue-600 to-blue-900 rounded-lg h-[520px] text-white pl-[16px] mb-3">
      <div>
        <h1 className="text-3xl pt-[150px]">Edit your profile</h1>
        <p>Edit your information?</p>
        <p className="text-2xl">in CENTUMO NFT workplace!</p>
        <h1 className="text-3xl font-bold mt-4">CENTUMO NFT</h1>
      </div>

      <div>
        <img src={logo} alt="Logo" style={{ width: "400px", marginTop: "30px" }} />
      </div>

      <div className="border border-black bg-gradient-to-t from-gray-800 to-black text-white h-[520px] w-[450px] rounded-lg overflow-scroll pt-10 pl-10">
        <h1 className="text-xl font-semibold mb-6">Welcome to CENTUMO NFT workplace</h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key} className="mb-5">
              <p className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
              <input
                type="text"
                name={key}
                className="w-[370px] max-w-md text-white bg-transparent border-b border-gray-500 focus:outline-none"
                value={formData[key]}
                onChange={handleChange}
              />
            </div>
          ))}
          <button type="submit" className="border border-blue-600 bg-blue-600 rounded-lg w-[370px] h-10 mb-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
