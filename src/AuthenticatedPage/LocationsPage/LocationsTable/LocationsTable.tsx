import React, { FormEvent, useState } from "react";
import { AxiosInstance } from "axios";
import Modal from "react-modal";
import { ServerPaginatedTable } from "../../Table/ServerPaginatedTable/ServerPaginatedTable";
import { LocationJsonView } from "../CreateLocationForm/CreateLocationForm";

Modal.setAppElement('#root');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border: 'none',
    background: 'none'
  },
  overlay: {
    zIndex: 2,
    backgroundColor: 'rgba(150,150,150, 0.65)'
  }
};

export const LocationsTable = ({ api }: LocationsTableProps) => {
  const createRow = (m: LocationJsonView): LocationRow => ({
    ...m,
    numeric_id: m.id!.substring(m.id.lastIndexOf("/") + 1),
  });

  const columns = [
    {
      name: "ID",
      selector: "numeric_id",
      sortable: true,
      width: "175px"
    },{
      name: "Name",
      selector: "name",
      sortable: true
    },{
      name: "Notes",
      selector: "notes",
      sortable: true
    }, {
      name: "URL",
      selector: "url",
      sortable: true
    }
  ];

  const [editLocation, setEditLocation] = useState<LocationRow>();
  const [message, setMessage] = useState<string>();
  const [name, setName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const closeModal = () => {
    window.location.reload();
  };

  const onEdit = (m: LocationRow) => {
    setEditLocation(m);
    setName(m.name);
    setNotes(m.notes);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!editLocation || typeof name === "undefined") {
      return;
    }

    try {
      const newProps = { name, notes,setNotes };
      await api.put(editLocation.id, newProps);

      window.location.reload();
    }
    catch (e) {
      setMessage("Error while updating.")
    }
  };

  return (
    <>
      <ServerPaginatedTable columns={columns} uri={"/locations"} api={api} editRow={onEdit} createRow={createRow} filterField={"name"} defaultSortField={'numeric_id'}/>
      <Modal
        style={customStyles}
        isOpen={!!editLocation}
        onRequestClose={closeModal}
        contentLabel="Edit Location"
      >
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Edit Location</h6>
          </div>
          <div className="card-body">
            <form className="table-responsive" onSubmit={onSubmit} style={{ maxWidth: "650px" }}>
              <p>{message}</p>
              <table className="table table-bordered" id="dataTable">
                <tbody>
                <tr>
                  <td>
                    Name
                  </td>
                  <td><input type="text" name="name" value={name} onChange={e => setName(e.target.value)} className="col-12"/></td>
                </tr>
                <tr>
                  <td>
                    Notes
                  </td>
                  <td><input type="text" name="notes" value={notes} onChange={e => setNotes(e.target.value)} className="col-12"/></td>
                </tr>
                </tbody>
              </table>
              <div className="container row pl-3 pr-0">
                <div className="col-6 p-0">
                  <input type="button" value="Cancel" style={{ width: "100px" }} className="btn btn-light btn-user btn-block" onClick={closeModal}/>
                </div>
                <div className="col-6 p-0">
                  <button style={{ width: "100px", float: 'right' }} type="submit" className="btn btn-primary btn-user btn-block">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

interface LocationsTableProps {
  api: AxiosInstance
}

interface LocationRow extends LocationJsonView {
  numeric_id: string
}
