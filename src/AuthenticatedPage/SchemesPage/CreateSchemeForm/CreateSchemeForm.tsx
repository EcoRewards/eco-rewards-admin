import React, { FormEvent, useState } from "react";
import { AxiosInstance } from "axios";
import { HttpResponse, SchemeJsonView } from "eco-rewards-hub";

export const CreateSchemeForm = ({ api, addScheme }: CreateSchemeFormProps) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/scheme", { name });

      setName("");
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
        <form className="table-responsive col-2" onSubmit={onSubmit}>
          <p>{message}</p>
          <table className="table table-bordered" id="dataTable">
            <thead>
            <tr>
              <th>Name</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><input type="text" name="name" value={name} onChange={e => setName(e.target.value)} className="col-12"/></td>
            </tr>
            </tbody>
          </table>
          <button type="submit" className="btn btn-primary btn-user btn-block col-6" disabled={name.length < 3}>
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
