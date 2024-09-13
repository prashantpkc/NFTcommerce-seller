import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeller, uploadProfilePic, uploadIdCard } from "../../redux/slices/authSlice";
import { toast } from "react-hot-toast";

const ViewProfile = () => {
  const dispatch = useDispatch();

  const {
    user,
    uploadStatus: { profilePic: profilePicStatus, idCard: idCardStatus },
    error: authError,
  } = useSelector((state) => state.auth);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadType, setUploadType] = useState(null); // "profilePic" or "idCard"
  const [profilePicPreview, setProfilePicPreview] = useState(user?.profile_pic);
  const [idCardPreview, setIdCardPreview] = useState(user?.idCard);
  const fileInputProfilePicRef = useRef(null);
  const fileInputIdCardRef = useRef(null);

  useEffect(() => {
    dispatch(getSeller());
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      toast.error(authError.message || "An error occurred");
    }
  }, [authError]);

  useEffect(() => {
    setProfilePicPreview(user?.profile_pic);
    setIdCardPreview(user?.idCard);
  }, [user]);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (uploadType === "profilePic") {
      const objectUrl = URL.createObjectURL(file);
      setProfilePicPreview(objectUrl);
    } else if (uploadType === "idCard") {
      const objectUrl = URL.createObjectURL(file);
      setIdCardPreview(objectUrl);
    }
  };

  const handleImageClick = (type) => {
    setUploadType(type);
    if (type === "profilePic") {
      fileInputProfilePicRef.current?.click();
    } else if (type === "idCard") {
      fileInputIdCardRef.current?.click();
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadType) return;

    const formData = new FormData();
    if (uploadType === "profilePic") {
      formData.append("profile_pic", selectedFile);
      await dispatch(uploadProfilePic(formData));
    } else if (uploadType === "idCard") {
      formData.append("idCard", selectedFile);
      await dispatch(uploadIdCard(formData));
    }

    if (uploadType === "profilePic" && profilePicStatus === "succeeded") {
      toast.success("Profile picture updated successfully!");
      dispatch(getSeller()); // Refetch seller data after successful upload
    } else if (uploadType === "profilePic" && profilePicStatus === "failed") {
      toast.error("Failed to update profile picture.");
    }

    if (uploadType === "idCard" && idCardStatus === "succeeded") {
      toast.success("ID card updated successfully!");
      dispatch(getSeller()); // Refetch seller data after successful upload
    } else if (uploadType === "idCard" && idCardStatus === "failed") {
      toast.error("Failed to update ID card.");
    }

    // Reset selected file and upload type after upload
    setSelectedFile(null);
    setUploadType(null);
  };

  return (
    <div className="flex flex-col lg:flex-row text-white gap-6 lg:gap-8">
      {/* First Card */}
      <div className="border bg-[#fff] rounded-2xl p-6 lg:w-[580px] w-full">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Column - Profile Picture */}
          <div className="w-full lg:w-1/2 flex flex-col items-center mb-6 lg:mb-0">
            <h2 className="text-lg font-semibold mb-4 text-[#131069]">Edit Profile Picture</h2>
            <div className="w-32 h-32 mb-4 relative">
              <img
                src={profilePicPreview}
                alt="Profile"
                className="w-full h-full rounded-full object-cover cursor-pointer"
                onClick={() => handleImageClick("profilePic")}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputProfilePicRef}
                style={{ display: "none" }}
                onChange={handleFileInputChange}
              />
            </div>
            <button
              onClick={handleUpload}
              className="px-12 py-1 bg-blue-600 text-white rounded shadow-lg"
            >
              Upload
            </button>
          </div>

          {/* Vertical Divider */}
          <div className="w-full lg:w-px lg:h-auto bg-white lg:mx-8 mb-6 lg:mb-0"></div>

          {/* Right Column - ID Card */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4 text-[#131069]">Edit ID Card</h2>
            <div className="w-48 h-32 mb-4 relative">
              <img
                src={idCardPreview}
                alt="ID Card"
                className="w-full h-full object-cover rounded-md cursor-pointer"
                onClick={() => handleImageClick("idCard")}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputIdCardRef}
                style={{ display: "none" }}
                onChange={handleFileInputChange}
              />
            </div>
            <button
              onClick={handleUpload}
              className="px-12 py-1 bg-blue-600 text-white rounded shadow-lg"
            >
              Upload
            </button>
          </div>
        </div>
      </div>

      {/* Second Card */}
      <div className="border bg-[#fff] p-6 lg:w-[580px] rounded-2xl w-full">
        <h1 className="text-lg font-semibold text-[#131069]">Seller Full Details</h1>
        <hr className="mt-3 mb-6" />

        <div className="flex justify-between items-baseline">
          <div>
            <p className="mb-2 text-[#131069] ">Full Name</p>
            <p className="mb-2 text-[#131069]">Email</p>
            <p className="mb-2 text-[#131069]">Phone</p>
            <p className="mb-2 text-[#131069]">Address</p>
            <p className="mb-2 text-[#131069]">Country</p>
            <p className="mb-2 text-[#131069]">Pin Code</p>
          </div>
          <div className="lg:ml-[200px] mt-4 lg:mt-0">
            <p className="mb-2 text-[#131069]">{user?.name}</p>
            <p className="mb-2 text-[#131069]">{user?.email}</p>
            <p className="mb-2 text-[#131069]">{user?.phone}</p>
            <p className="mb-2 text-[#131069]">{user?.address}</p>
            <p className="mb-2 text-[#131069]">{user?.country}</p>
            <p className="mb-2 text-[#131069]">{user?.postalCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
