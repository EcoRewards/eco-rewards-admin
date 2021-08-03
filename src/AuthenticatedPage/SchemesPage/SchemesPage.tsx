import React, { useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import { CreateSchemeForm } from "./CreateSchemeForm/CreateSchemeForm";
import { SchemesTable } from "./SchemesTable/SchemesTable";
import { HttpResponse, SchemeJsonView } from "eco-rewards-hub";
import { Row } from "../Table/ClientPaginatedTable/ClientPaginatedTable";

export const SchemesPage = ({api}: SchemesPageProps) => {
  const [schemes, setSchemes] = useState<SchemeJsonView[]>();
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
    if (typeof schemes !== "undefined") {
      schemes.push(response.data);
      setSchemes(schemes);
      setLinks({ ...response.links, ...links});
    }
  };

  const removeSchemes = (removed: Row[]) => {
    if (typeof schemes !== "undefined") {
      setSchemes(schemes.filter(s1 => !removed.some(s2 => s1.id === s2.id)));
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Schemes</h1>
      <p className="mb-4">Create and manage schemes.</p>
      <CreateSchemeForm api={api} addScheme={addScheme}/>
      <SchemesTable api={api} schemes={schemes || []} removeSchemes={removeSchemes}/>
    </div>
  );
};

interface SchemesPageProps {
  api: AxiosInstance
}
