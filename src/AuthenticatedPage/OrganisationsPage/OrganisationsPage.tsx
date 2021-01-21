import React, { useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import { CreateOrganisationForm } from "./CreateOrganisationForm/CreateOrganisationForm";
import { OrganisationsTable } from "./OrganisationsTable/OrganisationsTable";
import { HttpResponse, OrganisationJsonView, SchemeJsonView } from "eco-rewards-hub";
import { Row } from "../Table/Table";

export const OrganisationsPage = ({api}: OrganisationsPageProps) => {
  const [apiData, setApiData] = useState<ApiData>();

  useEffect(() => {
    async function fetchApiData() {
      const [organisations, schemes] = await Promise.all([
        api.get("/organisations").then(r => r.data),
        api.get("/schemes").then(r => r.data)
      ]);

      setApiData({ organisations, schemes });
    }

    if (!apiData) {
      fetchApiData();
    }
  }, [api, apiData]);

  const addOrganisation = (response: HttpResponse<OrganisationJsonView>) => {
    if (apiData) {
      apiData.organisations.data.push(response.data);
      apiData.organisations.links = { ...response.links, ...apiData.organisations.links };
      setApiData({ ...apiData });
    }
  };

  const removeOrganisations = (removed: Row[]) => {
    if (apiData) {
      apiData.organisations.data = apiData.organisations.data.filter(r1 => !removed.some(r2 => r1.id === r2.id));
      setApiData({ ...apiData });
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Organisations</h1>
      <p className="mb-4">Create and manage organisations.</p>
      <CreateOrganisationForm
        api={api}
        addOrganisation={addOrganisation}
        schemes={apiData ? apiData.schemes.data : []}/>
      <OrganisationsTable
        api={api}
        removeOrganisations={removeOrganisations}
        organisations={apiData ? apiData.organisations.data : []}
        links={apiData ? apiData.organisations.links : {}}/>
    </div>
  );
};

interface OrganisationsPageProps {
  api: AxiosInstance
}

interface ApiData {
  organisations: {
    data: OrganisationJsonView[],
    links: Record<string, any>
  },
  schemes: {
    data: SchemeJsonView[],
    links: Record<string, any>
  }
}
