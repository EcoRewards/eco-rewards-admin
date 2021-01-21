import React, { useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import { CreateGroupForm } from "./CreateGroupForm/CreateGroupForm";
import { GroupsTable } from "./GroupsTable/GroupsTable";
import { HttpResponse, GroupJsonView, OrganisationJsonView } from "eco-rewards-hub";
import { Row } from "../Table/Table";

export const GroupsPage = ({api}: GroupsPageProps) => {
  const [apiData, setApiData] = useState<ApiData>();

  useEffect(() => {
    async function fetchApiData() {
      const [groups, organisations] = await Promise.all([
        api.get("/groups").then(r => r.data),
        api.get("/organisations").then(r => r.data)
      ]);

      setApiData({ groups, organisations });
    }

    if (!apiData) {
      fetchApiData();
    }
  }, [api, apiData]);

  const addGroup = (response: HttpResponse<GroupJsonView>) => {
    if (apiData) {
      apiData.groups.data.push(response.data);
      apiData.groups.links = { ...response.links, ...apiData.groups.links };
      setApiData({ ...apiData });
    }
  };

  const removeGroups = (removed: Row[]) => {
    if (apiData) {
      apiData.groups.data = apiData.groups.data.filter(r1 => !removed.some(r2 => r1.id === r2.id));
      setApiData({ ...apiData });
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Groups</h1>
      <p className="mb-4">Create and manage groups.</p>
      <CreateGroupForm
        api={api}
        addGroup={addGroup}
        organisations={apiData ? apiData.organisations.data : []}/>
      <GroupsTable
        api={api}
        removeGroups={removeGroups}
        groups={apiData ? apiData.groups.data : []}
        links={apiData ? apiData.groups.links : {}}/>
    </div>
  );
};

interface GroupsPageProps {
  api: AxiosInstance
}

interface ApiData {
  groups: {
    data: GroupJsonView[],
    links: Record<string, any>
  },
  organisations: {
    data: OrganisationJsonView[]
  }
}
