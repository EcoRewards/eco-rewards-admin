import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import React from "react";

const colours = ["#4e73df", "#1cc88a", "#f6c23e", "#36b9cc",  "#e74a3b", "#858796"];

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
            : <ResponsiveContainer width="99%" height={500}>
                <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  { bars }
                </BarChart>
            </ResponsiveContainer>
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
