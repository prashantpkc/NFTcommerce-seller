import React from "react";
import Layout from "../Layout/Layout";
import EditProfile from "./editProfile";
import ViewProfile from "./viewProfile";
import { BackIcon } from "../../assets/icon/Icons";
import { useNavigate } from "react-router-dom";
import { useThemeColors } from "../utils/useThemeColor";
import { useSelector } from "react-redux";


const Profile = () => {
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const navigate = useNavigate();
  const back = () => {
    navigate("/dashboard");
  };
  return (
    <>
      <Layout>
        <div className="mt-4">
          <div className="flex justify-between mb-4">
            <div className="flex justify-start gap-3 items-center">
              <div
                onClick={back}
                className={`w-12 h-12  bg-[${useThemeColors(isDarkEnabled).cardBg}]  rounded-full flex justify-center items-center cursor-pointer`}
              >
                <BackIcon color={`${useThemeColors(isDarkEnabled).text}`} width="24" height="24" />
              </div>
              <h1 className="text-xl md:text-3xl font-extrabold text-center text-[#fff]">
                Profile
              </h1>
            </div>
          </div>
          <EditProfile />
          <ViewProfile />
        </div>
      </Layout>
    </>
  );
};

export default Profile;
