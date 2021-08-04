import React, { useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import { CreateGroupForm } from "./CreateGroupForm/CreateGroupForm";
import { GroupsTable } from "./GroupsTable/GroupsTable";
import { OrganisationJsonView } from "eco-rewards-hub";

export const GroupsPage = ({api}: GroupsPageProps) => {
  const [organisations, setOrganisations] = useState<OrganisationJsonView[]>();

  useEffect(() => {
    async function fetchApiData() {
      const organisations = await api.get("/organisations").then(r => r.data.data);

      setOrganisations(organisations);
    }

    if (!organisations) {
      fetchApiData();
    }
  }, [api, organisations]);

  const addGroup = () => {
    window.location.reload();
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Groups</h1>
      <p className="mb-4">Create and manage groups.</p>
      <CreateGroupForm
        api={api}
        addGroup={addGroup}
        organisations={organisations ? organisations : []}/>
      <GroupsTable api={api}/>
    </div>
  );
};

interface GroupsPageProps {
  api: AxiosInstance
}
