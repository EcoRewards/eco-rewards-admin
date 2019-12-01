import React, { FormEvent, useState } from "react";
import { AxiosInstance } from "axios";
import { HttpResponse, OrganisationJsonView, SchemeJsonView } from "eco-rewards-hub";

export const CreateOrganisationForm = ({ api, addOrganisation, schemes }: CreateOrganisationFormProps) => {
  const [name, setName] = useState("");
  const [scheme, setScheme] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/organisation", { name, scheme });

      setName("");
      setMessage("Organisation created.");
      addOrganisation(response.data);
    }
    catch (e) {
      setMessage("Error while creating organisation.")
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Create</h6>
      </div>
      <div className="card-body">
        <form className="table-responsive col-4" onSubmit={onSubmit}>
          <p>{message}</p>
          <table className="table table-bordered" id="dataTable">
            <thead>
            <tr>
              <th>Name</th>
              <th>Scheme</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><input type="text" name="name" value={name} onChange={e => setName(e.target.value)} className="col-12"/></td>
              <td>
                <select name="scheme" onChange={e => setScheme(e.target.value)}>
                  <option value="">&lt;Select scheme&gt;</option>
                  { schemes.map(s => <SchemeOption key={s.id} scheme={s} />)}
                </select>
              </td>
            </tr>
            </tbody>
          </table>
          <button type="submit" className="btn btn-primary btn-user btn-block col-2" disabled={name.length < 3 || scheme === ""}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

const SchemeOption = ({ scheme }: { scheme: SchemeJsonView }) => {
  return (
    <option value={scheme.id}>{scheme.name}</option>
  );
};

interface CreateOrganisationFormProps {
  api: AxiosInstance,
  addOrganisation: (response: HttpResponse<OrganisationJsonView>) => any,
  schemes: SchemeJsonView[]
}
