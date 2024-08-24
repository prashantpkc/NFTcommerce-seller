import React from "react";
import Layout from "../Layout/Layout";
import EditProfile from "./editProfile";
import ViewProfile from "./viewProfile";

const Profile = () => {
  return (
    <>
      <Layout>
        <div className="mt-[106px]">
            <EditProfile/>
            <ViewProfile/>
        </div>
      </Layout>
    </>
  );
};

export default Profile;

