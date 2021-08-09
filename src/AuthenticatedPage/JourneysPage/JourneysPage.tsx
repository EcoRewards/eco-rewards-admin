import React, { useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import { CreateJourneyForm } from "./CreateJourneyForm/CreateJourneyForm";
import { JourneysTable } from "./JourneysTable/JourneysTable";
import { JourneyJsonView } from "eco-rewards-hub";

export const JourneysPage = ({api}: JourneysPageProps) => {
  const [apiData, setApiData] = useState<ApiData>();

  useEffect(() => {
    async function fetchApiData() {
      const journeys = await api.get("/journeys").then(r => r.data);

      setApiData({ journeys });
    }

    if (!apiData) {
      fetchApiData();
    }
  }, [api, apiData]);

  const addJourneys = () => {
    setApiData(undefined);
  };

  const onExportJourneys = async () => {
    const response = await api.get("/journeys", { headers: { "Accept": "text/csv"} });
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);
    a.href = window.URL.createObjectURL(new Blob([response.data], { type: "text/csv" }));
    a.setAttribute("download", "journeys.csv");
    a.click();
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Journeys</h1>
      <p className="mb-4">View, upload and export member journeys.</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Export</h6>
        </div>
        <div className="card-body">
          <p>Export all member journeys as CSV</p>
          <p><button className="btn btn-primary" onClick={onExportJourneys}>Export</button> </p>
        </div>
      </div>
      <CreateJourneyForm
        api={api}
        onJourneysUploaded={addJourneys}/>
      <JourneysTable
        api={api}
        journeys={apiData ? apiData.journeys.data : []}/>
    </div>
  );
};

interface JourneysPageProps {
  api: AxiosInstance
}

interface ApiData {
  journeys: {
    data: JourneyJsonView[]
  }
}
