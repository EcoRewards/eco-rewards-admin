import React, { FormEvent, useState } from "react";
import { AxiosInstance } from "axios";
import { HttpResponse, MemberJsonView, GroupJsonView } from "eco-rewards-hub";
import { TransportModeList } from "../../../TransportModeList/TransportModeList";

export const CreateMemberForm = ({ api, addMembers, groups }: CreateMemberFormProps) => {
  const [group, setGroup] = useState("");
  const [defaultTransportMode, setDefaultTransportMode] = useState("");
  const [defaultDistance, setDefaultDistance] = useState("0.00");
  const [quantity, setQuantity] = useState("10");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/members", { group, defaultTransportMode, defaultDistance: +defaultDistance, quantity: +quantity });

      setDefaultDistance("0.00");
      setMessage(quantity + " new members created.");
      setQuantity("10");
      addMembers(response.data);
    }
    catch (e) {
      setMessage("Error while creating members.")
    }
  };

  const canSubmit = group.length > 2 && +quantity > 0;

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Create</h6>
      </div>
      <div className="card-body">
        <form className="table-responsive" onSubmit={onSubmit} style={{ maxWidth: "650px" }}>
          <p>{message}</p>
          <table className="table table-bordered" id="dataTable">
            <thead>
            <tr>
              <th>Group</th>
              <th>Default Mode</th>
              <th>Default Distance</th>
              <th>Quantity</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <select name="group" onChange={e => setGroup(e.target.value)}>
                  <option value="">&lt;Select group&gt;</option>
                  { groups.map(s => <option value={s.id}>{s.name}</option>)}
                </select>
              </td>
              <td>
                <TransportModeList defaultTransportMode={defaultTransportMode} setDefaultTransportMode={setDefaultTransportMode} />
              </td>
              <td><input type="text" name="defaultDistance" value={defaultDistance} onChange={e => setDefaultDistance(e.target.value)} className="col-12"/></td>
              <td><input type="text" name="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} className="col-12"/></td>
            </tr>
            </tbody>
          </table>
          <button style={{ width: "100px" }} type="submit" className="btn btn-primary btn-user btn-block" disabled={!canSubmit}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

interface CreateMemberFormProps {
  api: AxiosInstance,
  addMembers: (response: HttpResponse<MemberJsonView>) => any,
  groups: GroupJsonView[]
}
