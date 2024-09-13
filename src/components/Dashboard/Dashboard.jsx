import React from "react";
import { Card } from "../Card/Card";
import Layout from "../Layout/Layout";
import SalesGraph from "./SalesOverview/SalesGraph";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex flex-col flex-1 my-8">
        <Card />
      </div>
      <div>
        <SalesGraph/>
      </div>
    </Layout>
  );
};

export default Dashboard;
