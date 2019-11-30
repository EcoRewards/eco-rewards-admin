import React, { useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import { CreateSchemeForm } from "./CreateSchemeForm/CreateSchemeForm";
import { SchemesTable } from "./SchemesTable/SchemesTable";
import { HttpResponse, SchemeJsonView } from "eco-rewards-hub";

export const SchemesPage = ({api}: SchemesPageProps) => {
  const [schemes, setSchemes] = useState();
  const [links, setLinks] = useState({});

  useEffect(() => {
    async function fetchSchemes() {
      const response = await api.get("/schemes");

      setSchemes(response.data.data);
      setLinks(response.data.links);
    }

    if (!schemes) {
      fetchSchemes();
    }
  }, [api, schemes]);

  const addScheme = (response: HttpResponse<SchemeJsonView>) => {
    schemes.push(response.data);
    setSchemes(schemes);
    setLinks({ ...response.links, ...links});
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Schemes</h1>
      <p className="mb-4">Create and manage schemes.</p>
      <CreateSchemeForm api={api} addScheme={addScheme}/>
      <SchemesTable api={api} schemes={schemes || []}/>
    </div>
  );
};

interface SchemesPageProps {
  api: AxiosInstance
}
