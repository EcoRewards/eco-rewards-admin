import React, { useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import { CreateMemberForm } from "./CreateMemberForm/CreateMemberForm";
import { MembersTable } from "./MembersTable/MembersTable";
import { GroupJsonView } from "eco-rewards-hub";
import { UpdateMembersForm } from "./UpdateMembersForm/UpdateMembersForm";

export const MembersPage = ({api}: MembersPageProps) => {
  const [groups, setGroups] = useState<GroupData>();

  useEffect(() => {
    async function fetchApiData() {
      const groups = await api.get("/groups").then(r => r.data);

      setGroups(groups);
    }

    if (!groups) {
      fetchApiData();
    }
  }, [api, groups]);

  const addMembers = () => {
    window.location.reload();
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
      <CreateMemberForm api={api} addMembers={addMembers} groups={groups ? groups.data : []}/>
      <MembersTable api={api} groups={groups ? groups.data : []}/>
      <UpdateMembersForm api={api} groups={groups ? groups.data : []}/>
    </div>
  );
};

interface MembersPageProps {
  api: AxiosInstance
}

interface GroupData {
  data: GroupJsonView[],
  links: Record<string, any>
}
