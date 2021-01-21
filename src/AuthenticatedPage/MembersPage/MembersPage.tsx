import React, { useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import { CreateMemberForm } from "./CreateMemberForm/CreateMemberForm";
import { MembersTable } from "./MembersTable/MembersTable";
import { GroupJsonView, HttpResponse, MemberJsonView } from "eco-rewards-hub";
import { Row } from "../Table/Table";

export const MembersPage = ({api}: MembersPageProps) => {
  const [apiData, setApiData] = useState<ApiData>();

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
    if (apiData) {
      apiData.members.data = apiData.members.data.concat(response.data);
      apiData.members.links = { ...response.links, ...apiData.members.links };
      setApiData({ ...apiData });
    }
  };

  const removeMembers = (removed: Row[]) => {
    if (apiData) {
      apiData.members.data = apiData.members.data.filter(r1 => !removed.some(r2 => r1.id === r2.id));
      setApiData({ ...apiData });
    }
  };

  const onExportMembers = async () => {
    const response = await api.get("/members", { headers: { "Accept": "text/csv"} });
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);
    a.href = window.URL.createObjectURL(new Blob([response.data], { type: "text/csv" }));
    a.setAttribute("download", "members.csv");
    a.click();
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Members</h1>
      <p className="mb-4">Create and manage members.</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Export</h6>
        </div>
        <div className="card-body">
          <p>Export all members as CSV</p>
          <p><button className="btn btn-primary" onClick={onExportMembers}>Export</button> </p>
        </div>
      </div>
      <CreateMemberForm
        api={api}
        addMembers={addMembers}
        groups={apiData ? apiData.groups.data : []}/>
      <MembersTable
        api={api}
        removeMembers={removeMembers}
        groups={apiData ? apiData.groups.data : []}
        members={apiData ? apiData.members.data : []}
        links={apiData ? apiData.members.links : {}}/>
    </div>
  );
};

interface MembersPageProps {
  api: AxiosInstance
}

interface ApiData {
  members: {
    data: MemberJsonView[],
    links: Record<string, any>
  },
  groups: {
    data: GroupJsonView[],
    links: Record<string, any>
  }
}
