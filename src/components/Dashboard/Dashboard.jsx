import React from "react";
import { Card } from "../Card/Card";
import Layout from "../Layout/Layout";
import SalesGraph from "./SalesOverview/SalesGraph";

const Dashboard = () => {
  return (
    <Layout>
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 p-4 mt-24">
        <Card />
      </div>

      <div>
        <SalesGraph/>
      </div>

    </Layout>
  );
};

export default Dashboard;
