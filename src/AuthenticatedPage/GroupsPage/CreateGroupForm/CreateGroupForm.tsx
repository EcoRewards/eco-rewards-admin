import React, { FormEvent, useState } from "react";
import { AxiosInstance } from "axios";
import { HttpResponse, GroupJsonView, OrganisationJsonView } from "eco-rewards-hub";

export const CreateGroupForm = ({ api, addGroup, organisations }: CreateGroupFormProps) => {
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/group", { name, organisation });

      setName("");
      setMessage("Group created.");
      addGroup(response.data);
    }
    catch (e) {
      setMessage("Error while creating group.")
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Create</h6>
      </div>
      <div className="card-body">
        <form className="table-responsive" onSubmit={onSubmit} style={{ maxWidth: "400px" }}>
          <p>{message}</p>
          <table className="table table-bordered" id="dataTable">
            <thead>
            <tr>
              <th>Name</th>
              <th>Organisation</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><input type="text" name="name" value={name} onChange={e => setName(e.target.value)} className="col-12"/></td>
              <td>
                <select name="organisation" onChange={e => setOrganisation(e.target.value)}>
                  <option value="">&lt;Select organisation&gt;</option>
                  { organisations.map(s => <OrganisationOption key={s.id} organisation={s} />)}
                </select>
              </td>
            </tr>
            </tbody>
          </table>
          <button style={{ width: "100px" }} type="submit" className="btn btn-primary btn-user btn-block" disabled={name.length < 3 || organisation === ""}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

const OrganisationOption = ({ organisation }: { organisation: OrganisationJsonView }) => {
  return (
    <option value={organisation.id}>{organisation.name}</option>
  );
};

interface CreateGroupFormProps {
  api: AxiosInstance,
  addGroup: (response: HttpResponse<GroupJsonView>) => any,
  organisations: OrganisationJsonView[]
}
