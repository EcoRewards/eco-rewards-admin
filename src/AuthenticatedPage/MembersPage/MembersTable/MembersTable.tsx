import React, { FormEvent } from "react";
import { Row, Table } from "../../Table/Table";
import { AxiosInstance } from "axios";
import { GroupJsonView, MemberJsonView } from "eco-rewards-hub";
import Modal from "react-modal";
import { TransportModeList } from "../../../TransportModeList/TransportModeList";

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

export const MembersTable = ({ api, members, links, removeMembers, groups }: MembersTableProps) => {
  const rows: MemberRow[] = members.map(m => ({
    id: m.id!,
    numeric_id: m.id!.substr(8),
    name: links[m.group].name,
    group: m.group,
    defaultTransportMode: m.defaultTransportMode,
    defaultDistance: m.defaultDistance + " miles",
    previousTransportMode: m.previousTransportMode,
    totalMiles: m.totalMiles + " miles",
    carbonSaving: m.carbonSaving + "kg",
    rewards: m.rewards,
    organisation: links[links[m.group].organisation].name,
    scheme: links[links[links[m.group].organisation].scheme].name
  }));

  const columns = [{
    name: "ID",
    selector: "numeric_id",
    sortable: true,
    width: "175px"
  },{
    name: "Scheme",
    selector: "scheme",
    sortable: true
  },{
    name: "Organisation",
    selector: "organisation",
    sortable: true
  },{
    name: "Group",
    selector: "name",
    sortable: true
  },{
    name: "Default Mode",
    selector: "defaultTransportMode",
    sortable: false,
    width: "140px"
  },{
    name: "Previous Mode",
    selector: "previousTransportMode",
    sortable: false,
    width: "140px"
  },{
    name: "Default Distance",
    selector: "defaultDistance",
    sortable: true,
    width: "130px"
  },{
    name: "Rewards",
    selector: "rewards",
    sortable: true,
    width: "90px"
  },{
    name: "Carbon Saving",
    selector: "carbonSaving",
    sortable: true,
    width: "130px"
  },{
    name: "Total Miles",
    selector: "totalMiles",
    sortable: true,
    width: "130px"
  }];

  const [editMember, setEditMember] = React.useState();
  const [message, setMessage] = React.useState();
  const [defaultTransportMode, setDefaultTransportMode] = React.useState();
  const [defaultDistance, setDefaultDistance] = React.useState();
  const [group, setGroup] = React.useState();
  const closeModal = () => {
    window.location.reload();
  };
  const onEdit = (m: MemberRow) => {
    setEditMember(m);
    setDefaultDistance(+m.defaultDistance.replace(" miles", ""));
    setDefaultTransportMode(m.defaultTransportMode);
    setGroup(m.group);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await api.put(editMember.id, { group, defaultTransportMode, defaultDistance: +defaultDistance });

      setMessage("Member updated.");
    }
    catch (e) {
      setMessage("Error while updating.")
    }
  };

  return (
    <>
      <Table columns={columns} rows={rows} api={api} removeRows={removeMembers} editRow={onEdit}/>
      <Modal
        style={customStyles}
        isOpen={!!editMember}
        onRequestClose={closeModal}
        contentLabel="Edit Member"
      >
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Edit Member</h6>
          </div>
          <div className="card-body">
            <form className="table-responsive" onSubmit={onSubmit} style={{ maxWidth: "650px" }}>
              <p>{message}</p>
              <table className="table table-bordered" id="dataTable">
                <tbody>
                <tr>
                  <td>
                    Group
                  </td>
                  <td>
                    <select className="custom-select custom-select-sm form-control form-control-sm" name="group" onChange={e => setGroup(e.target.value)} defaultValue={group}>
                      { groups.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    Default Transport Mode
                  </td>
                  <td>
                    <TransportModeList defaultTransportMode={defaultTransportMode} setDefaultTransportMode={setDefaultTransportMode} />
                  </td>
                </tr>
                <tr>
                  <td>
                    Default Distance
                  </td>
                  <td><input type="text" name="defaultDistance" value={defaultDistance} onChange={e => setDefaultDistance(e.target.value)} className="col-12"/></td>
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

interface MembersTableProps {
  api: AxiosInstance,
  members: MemberJsonView[],
  links: Record<string, any>,
  groups: GroupJsonView[],
  removeMembers: (members: Row[]) => any
}

interface MemberRow {
  id: string,
  numeric_id: string,
  name: string,
  group: string,
  defaultTransportMode: string,
  defaultDistance: string,
  previousTransportMode: string,
  carbonSaving: string,
  rewards: number,
  organisation: string,
  scheme: string,
}
