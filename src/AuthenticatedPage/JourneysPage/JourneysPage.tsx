import React, { useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import { CreateJourneyForm } from "./CreateJourneyForm/CreateJourneyForm";
import { JourneysTable } from "./JourneysTable/JourneysTable";

export const JourneysPage = ({api}: JourneysPageProps) => {
  const [apiData, setApiData] = useState();

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

  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Journeys</h1>
      <p className="mb-4">View and upload member journeys.</p>
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
