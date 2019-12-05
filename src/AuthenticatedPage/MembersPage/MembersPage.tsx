import React, { useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import { CreateMemberForm } from "./CreateMemberForm/CreateMemberForm";
import { MembersTable } from "./MembersTable/MembersTable";
import { HttpResponse, MemberJsonView } from "eco-rewards-hub";
import { Row } from "../Table/Table";

export const MembersPage = ({api}: MembersPageProps) => {
  const [apiData, setApiData] = useState();

  useEffect(() => {
    async function fetchApiData() {
      const [members, groups] = await Promise.all([
        api.get("/members").then(r => r.data),
        api.get("/groups").then(r => r.data)
      ]);

      setApiData({ members, groups });
    }

    if (!apiData) {
      fetchApiData();
    }
  }, [api, apiData]);

  const addMembers = (response: HttpResponse<MemberJsonView>) => {
    apiData.members.data = apiData.members.data.concat(response.data);
    apiData.members.links = { ...response.links, ...apiData.members.links };
    setApiData({ ...apiData });
  };

  const removeMembers = (removed: Row[]) => {
    apiData.members.data = apiData.members.data.filter((r1: Row) => !removed.some(r2 => r1.id === r2.id));
    setApiData({ ...apiData });
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Members</h1>
      <p className="mb-4">Create and manage members.</p>
      <CreateMemberForm
        api={api}
        addMembers={addMembers}
        groups={apiData ? apiData.groups.data : []}/>
      <MembersTable
        api={api}
        removeMembers={removeMembers}
        members={apiData ? apiData.members.data : []}
        links={apiData ? apiData.members.links : {}}/>
    </div>
  );
};

interface MembersPageProps {
  api: AxiosInstance
}
