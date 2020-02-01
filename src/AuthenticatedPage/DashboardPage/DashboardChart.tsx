import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import React from "react";

const colours = ["#ffc658", "#8884d8", "#82ca9d"];

export const DashboardChart = ({ title, names, data }: DashboardChartProps) => {
  const bars = names.map((name, i) => <Bar key={i} dataKey={name} fill={colours[i % colours.length]} />);

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">{ title }</h6>
      </div>
      <div className="card-body">
        {
          !data || data.length === 0
            ? <p>No data.</p>
            : <BarChart
                width={1376}
                height={400}
                data={data}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                { bars }
              </BarChart>
        }
      </div>
    </div>

  )
};

export interface DashboardChartProps {
  title: string,
  names: string[],
  data: any[]
}
