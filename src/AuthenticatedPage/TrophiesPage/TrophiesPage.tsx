import React from "react";
import { AxiosInstance } from "axios";
import { TrophiesTable } from "./DeviceStatusTable/TrophiesTable";

export const TrophiesPage = ({api}: TrophiesPageProps) => {

  const onExport = async () => {
    const response = await api.get("/trophies", { headers: { "Accept": "text/csv"} });
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);
    a.href = window.URL.createObjectURL(new Blob([response.data], { type: "text/csv" }));
    a.setAttribute("download", "trophies.csv");
    a.click();
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Trophies</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Export</h6>
        </div>
        <div className="card-body">
          <p>Export all trophies as CSV</p>
          <p><button className="btn btn-primary" onClick={onExport}>Export</button> </p>
        </div>
      </div>
      <TrophiesTable api={api}/>
    </div>
  );
};

interface TrophiesPageProps {
  api: AxiosInstance
}
