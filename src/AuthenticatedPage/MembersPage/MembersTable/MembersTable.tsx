import React, { FormEvent, useState } from "react";
import { AxiosInstance } from "axios";
import { GroupJsonView, MemberJsonView } from "eco-rewards-hub";
import Modal from "react-modal";
import { TransportModeList } from "../../../TransportModeList/TransportModeList";
import { ServerPaginatedTable } from "../../Table/ServerPaginatedTable/ServerPaginatedTable";

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

export const MembersTable = ({ api, groups }: MembersTableProps) => {
  const createRow = (m: MemberJsonView, links: Record<string, any>): MemberRow => ({
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
  });

  const columns = [
    {
      name: "ID",
      selector: (row: any) => row.numeric_id,
      sortable: true,
      width: "175px"
    },{
      name: "Scheme",
      selector: (row: any) => row.scheme,
      sortable: true
    },{
      name: "Organisation",
      selector: (row: any) => row.organisation,
      sortable: true
    },{
      name: "Group",
      selector: (row: any) => row.name,
      sortable: true
    },{
      name: "Default Mode",
      selector: (row: any) => row.defaultTransportMode,
      sortable: false,
      width: "140px"
    },{
      name: "Previous Mode",
      selector: (row: any) => row.previousTransportMode,
      sortable: false,
      width: "140px"
    },{
      name: "Default Distance",
      selector: (row: any) => row.defaultDistance,
      sortable: true,
      width: "130px"
    },{
      name: "Rewards",
      selector: (row: any) => row.rewards,
      sortable: true,
      width: "90px"
    },{
      name: "Carbon Saving",
      selector: (row: any) => row.carbonSaving,
      sortable: true,
      width: "130px"
    },{
      name: "Total Miles",
      selector: (row: any) => row.totalMiles,
      sortable: true,
      width: "130px"
    }
  ];

  const [editMember, setEditMember] = useState<MemberRow>();
  const [message, setMessage] = useState<string>();
  const [defaultTransportMode, setDefaultTransportMode] = useState<string>("");
  const [previousTransportMode, setPreviousTransportMode] = useState<string>("");
  const [defaultDistance, setDefaultDistance] = useState<string>("0");
  const [carbonSaving, setCarbonSaving] = useState<string>("0");
  const [rewards, setRewards] = useState<string>("0");
  const [totalMiles, setTotalMiles] = useState<string>("0");
  const [group, setGroup] = useState<string>();
  const closeModal = () => {
    window.location.reload();
  };
  const onEdit = (m: MemberRow) => {
    console.log("ON EDIT");
    setEditMember(m);
    setDefaultDistance(m.defaultDistance.replace(" miles", ""));
    setDefaultTransportMode(m.defaultTransportMode);
    setPreviousTransportMode(m.previousTransportMode);
    setCarbonSaving(m.carbonSaving.replace("kg", ""));
    setRewards(m.rewards + "");
    setTotalMiles(m.totalMiles.replace(" miles", ""));
    setGroup(m.group);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!editMember || typeof defaultDistance === "undefined") {
      return;
    }

    try {
      const newProps = {
        group: group,
        defaultTransportMode: defaultTransportMode,
        previousTransportMode: previousTransportMode,
        defaultDistance: +defaultDistance,
        totalMiles: +totalMiles,
        rewards: +rewards,
        carbonSaving: +carbonSaving
      };
      await api.put(editMember.id, newProps);

      window.location.reload();
    }
    catch (e) {
      setMessage("Error while updating.")
    }
  };

  return (
    <>
      <ServerPaginatedTable columns={columns} uri={"/members"} api={api} editRow={onEdit} createRow={createRow} filterField={"smartcard"}/>
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
                    Previous Transport Mode
                  </td>
                  <td>
                    <TransportModeList defaultTransportMode={previousTransportMode} setDefaultTransportMode={setPreviousTransportMode} />
                  </td>
                </tr>
                <tr>
                  <td>
                    Default Distance
                  </td>
                  <td><input type="text" name="defaultDistance" value={defaultDistance} onChange={e => setDefaultDistance(e.target.value)} className="col-12"/></td>
                </tr>
                <tr>
                  <td>
                    Rewards
                  </td>
                  <td><input type="text" name="rewards" value={rewards} onChange={e => setRewards(e.target.value)} className="col-12"/></td>
                </tr>
                <tr>
                  <td>
                    Carbon Saving
                  </td>
                  <td><input type="text" name="carbonSaving" value={carbonSaving} onChange={e => setCarbonSaving(e.target.value)} className="col-12"/></td>
                </tr>
                <tr>
                  <td>
                    Total Miles
                  </td>
                  <td><input type="text" name="totalMiles" value={totalMiles} onChange={e => setTotalMiles(e.target.value)} className="col-12"/></td>
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
  groups: GroupJsonView[]
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
  totalMiles: string
}
