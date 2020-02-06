import React, { FormEvent, useState } from "react";
import { AxiosInstance } from "axios";
import { HttpResponse, SchemeJsonView } from "eco-rewards-hub";

export const CreateSchemeForm = ({ api, addScheme }: CreateSchemeFormProps) => {
  const [name, setName] = useState("");
  const [vacClientId, setVacClientId] = useState("0");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/scheme", { name, vacClientId: +vacClientId });

      setName("");
      setVacClientId("0");
      setMessage("Scheme created.");
      addScheme(response.data);
    }
    catch (e) {
      setMessage("Error while creating scheme.")
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Create</h6>
      </div>
      <div className="card-body">
        <form className="table-responsive" onSubmit={onSubmit} style={{ maxWidth: "450px" }}>
          <p>{message}</p>
          <table className="table table-bordered" id="dataTable">
            <thead>
            <tr>
              <th>Name</th>
              <th>VAC Client ID</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><input type="text" name="name" value={name} onChange={e => setName(e.target.value)} className="col-12"/></td>
              <td><input type="text" name="vacClientId" value={vacClientId} onChange={e => setVacClientId(e.target.value)} className="col-12"/></td>
            </tr>
            </tbody>
          </table>
          <button  style={{ width: "100px" }} type="submit" className="btn btn-primary btn-user btn-block" disabled={name.length < 3}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

interface CreateSchemeFormProps {
  api: AxiosInstance,
  addScheme: (response: HttpResponse<SchemeJsonView>) => any
}
