import React, { FormEvent, useState } from "react";
import { AxiosInstance } from "axios";
import { HttpResponse } from "eco-rewards-hub";

export const CreateLocationForm = ({ api, addLocations }: CreateLocationFormProps) => {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/locations", { name, notes });

      setName("");
      setMessage("Location created.");
      setNotes("");
      addLocations(response.data);
    }
    catch (e) {
      setMessage("Error while creating members.")
    }
  };

  const canSubmit = name.length > 2;

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
              <th>Name</th>
              <th>Notes</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><input type="text" name="name" value={name} onChange={e => setName(e.target.value)} className="col-12"/></td>
              <td><input type="text" name="notes" value={notes} onChange={e => setNotes(e.target.value)} className="col-12"/></td>
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

interface CreateLocationFormProps {
  api: AxiosInstance,
  addLocations: (response: HttpResponse<LocationJsonView>) => any
}

export interface LocationJsonView {
  id: string,
  name: string,
  notes: string,
  url: string
}
