import React from "react";
import { AxiosInstance } from "axios";
import { CreateLocationForm } from "./CreateLocationForm/CreateLocationForm";
import { LocationsTable } from "./LocationsTable/LocationsTable";

export const LocationsPage = ({api}: LocationsPageProps) => {

  const addLocations = () => {
    window.location.reload();
  };

  // const onExportLocations = async () => {
  //   const response = await api.get("/members", { headers: { "Accept": "text/csv"} });
  //   const a = document.createElement("a");
  //   a.style.display = "none";
  //   document.body.appendChild(a);
  //   a.href = window.URL.createObjectURL(new Blob([response.data], { type: "text/csv" }));
  //   a.setAttribute("download", "members.csv");
  //   a.click();
  //   window.URL.revokeObjectURL(a.href);
  //   document.body.removeChild(a);
  // };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Locations</h1>
      <p className="mb-4">Create and manage locations.</p>
      {/*<div className="card shadow mb-4">*/}
      {/*  <div className="card-header py-3">*/}
      {/*    <h6 className="m-0 font-weight-bold text-primary">Export</h6>*/}
      {/*  </div>*/}
      {/*  <div className="card-body">*/}
      {/*    <p>Export all members as CSV</p>*/}
      {/*    <p><button className="btn btn-primary" onClick={onExportLocations}>Export</button> </p>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <CreateLocationForm api={api} addLocations={addLocations}/>
      <LocationsTable api={api}/>
    </div>
  );
};

interface LocationsPageProps {
  api: AxiosInstance
}
