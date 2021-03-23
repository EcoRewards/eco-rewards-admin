import React, { FormEvent, useState } from "react";
import { AxiosInstance } from "axios";
import { GroupJsonView } from "eco-rewards-hub";
import { TransportModeList } from "../../../TransportModeList/TransportModeList";

export const UpdateMembersForm = ({ api, groups }: UpdateMembersFormProps) => {
  const [startId, setStartId] = useState("");
  const [endId, setEndId] = useState("");
  const [group, setGroup] = useState("");
  const [defaultTransportMode, setDefaultTransportMode] = useState("");
  const [defaultDistance, setDefaultDistance] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        startId: startId,
        endId: endId,
        group: group === "" ? undefined : group,
        defaultTransportMode: defaultTransportMode === "" ? undefined : defaultTransportMode,
        defaultDistance: defaultDistance === "" ? undefined : +defaultDistance,
      };

      await api.patch("/members", data);

      window.location.reload();
    }
    catch (e) {
      alert("Error while creating members.");
    }
  };

  const canSubmit = startId.length > 8 && endId.length > 8 && startId < endId && (!!group || defaultTransportMode || defaultDistance);

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Create</h6>
      </div>
      <div className="card-body">
        <form className="table-responsive" onSubmit={onSubmit} style={{ maxWidth: "1000px" }}>
          <table className="table table-bordered" id="dataTable">
            <thead>
            <tr>
              <th>Start ID</th>
              <th>End ID</th>
              <th>Group</th>
              <th>Default Mode</th>
              <th>Default Distance</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><input type="text" name="startId" value={startId} onChange={e => setStartId(e.target.value)}/></td>
              <td><input type="text" name="endId" value={endId} onChange={e => setEndId(e.target.value)}/></td>
              <td>
                <select className="custom-select custom-select-sm form-control form-control-sm" name="group" onChange={e => setGroup(e.target.value)}>
                  <option value="">&lt;Select group&gt;</option>
                  { groups.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </td>
              <td>
                <TransportModeList defaultTransportMode={defaultTransportMode} setDefaultTransportMode={setDefaultTransportMode} />
              </td>
              <td><input type="text" name="defaultDistance" value={defaultDistance} onChange={e => setDefaultDistance(e.target.value)} className="col-12"/></td>
            </tr>
            </tbody>
          </table>
          <button style={{ width: "100px" }} type="submit" className="btn btn-primary btn-user btn-block" disabled={!canSubmit}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

interface UpdateMembersFormProps {
  api: AxiosInstance,
  groups: GroupJsonView[]
}
