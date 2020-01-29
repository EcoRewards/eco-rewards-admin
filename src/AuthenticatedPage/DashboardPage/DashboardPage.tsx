import React, { useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import "react-vis/dist/style.css";
import { Bar, BarChart, CartesianGrid, Legend, YAxis, Tooltip, XAxis } from "recharts";

export const DashboardPage = ({ api }: DashboardPageProps) => {
  const [apiData, setApiData] = useState();

  useEffect(() => {
    async function fetchApiData() {
      const response = await api.get("/scheme/6/report");

      setApiData(response.data.data);
    }

    if (!apiData) {
      fetchApiData();
    }
  }, [api, apiData]);

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Dashboard</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Overview</h6>
        </div>
        <div className="card-body">
          { apiData ? renderChart2(apiData) : <p>Loading</p> }
        </div>
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Carbon Saving</h6>
        </div>
        <div className="card-body">
          { apiData ? renderChart(apiData) : <p>Loading</p> }
        </div>
      </div>
    </div>
  );
};

function renderChart2(apiData: any[]) {
  const data = apiData.reduce((index, row) => {
    index[row.name] = index[row.name] || { name: row.name, totalCarbonSaving: 0, totalDistance: 0, totalRewardsEarned: 0 };
    index[row.name].totalCarbonSaving += row.totalCarbonSaving;
    index[row.name].totalDistance += row.totalDistance;
    index[row.name].totalRewardsEarned += row.totalRewardsEarned;

    return index;
  }, {});

  console.log(data);
  return (
    <BarChart
      width={1376}
      height={400}
      data={Object.values(data)}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar name="Carbon Saving" dataKey="totalCarbonSaving" fill="#ffc658" />
      <Bar name="Distance" dataKey="totalDistance" fill="#82ca9d" />
      <Bar name="Rewards" dataKey="totalRewardsEarned" fill="#8884d8" />
    </BarChart>
  )
}

function renderChart(apiData: any[]) {
  const colours = ["#8884d8", "#82ca9d"];
  const data = apiData.reduce((index, row) => {
    index[row.date] = index[row.date] || { date: row.date };
    index[row.date][row.name] = row.totalCarbonSaving;

    return index;
  }, {});
  const names = apiData.reduce((index, row) => {
    index[row.name] = true;

    return index;
  }, {});

  const bars = Object.keys(names).map((name, i) => <Bar dataKey={name} fill={colours[i % colours.length]} />);


  console.log(data);
  return (
    <BarChart
      width={1376}
      height={400}
      data={Object.values(data)}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      { Object.values(bars) }
    </BarChart>
  )
}

export interface DashboardPageProps {
  api: AxiosInstance
}
