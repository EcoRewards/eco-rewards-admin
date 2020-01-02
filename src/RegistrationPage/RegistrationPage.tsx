import React, { FormEvent, useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import { TransportModeList } from "../TransportModeList/TransportModeList";
import { GroupJsonView } from "eco-rewards-hub";
import "./RegistrationPage.css";

export const RegistrationPage = ({ api }: RegistrationPageProps) => {
  const [success, setSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [smartcard, setSmartcard] = useState("");
  const [defaultTransportMode, setDefaultTransportMode] = useState("");
  const [defaultDistance, setDefaultDistance] = useState(1.0);
  const [group, setGroup] = useState("");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function fetchGroups() {
      const response = await api.get("/groups");

      setGroups(response.data.data);
    }

    if (groups.length === 0) {
      fetchGroups();
    }
  }, [api, groups]);

  const register = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/member", { smartcard, defaultTransportMode, defaultDistance, group });
      setSuccess(true);
    }
    catch (err) {
      setRegistrationError("Unable to register, please try again.");
    }
  };

  const canSubmit = smartcard.length >= 10 && defaultTransportMode !== "" && defaultDistance > 0 && group !== "";
  const form = () => {
    return (
      <>
        <div className="text-center">
          <h1 className="h4 text-gray-900 mb-4">Register</h1>
        </div>
        <form className="user">
          <div className="form-group">
            <input type="text" className="form-control form-control-user" id="exampleInputSmartcard"
                   aria-describedby="smartcardHelp" placeholder="Enter Smartcard number..." required
                   onChange={e => setSmartcard(e.target.value)}
            />
          </div>
          <div className="form-group">
            <TransportModeList defaultTransportMode={defaultTransportMode} setDefaultTransportMode={setDefaultTransportMode} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control form-control-user" id="exampleInputDistance"
                   aria-describedby="distanceHelp" placeholder="Enter distance in miles... " required
                   onChange={e => setDefaultDistance(+e.target.value)}
            />
          </div>
          <div className="form-group">
            <select className="custom-select form-control form-control-sm" name="group" onChange={e => setGroup(e.target.value)}>
              <option value="">&lt;Select group&gt;</option>
              { groups.map((s: GroupJsonView) => <option value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-user btn-block" onClick={register} disabled={!canSubmit}>
            Register
          </button>
        </form>
        { registrationError && (<hr />) }
        {registrationError}
      </>
    );
  };

  const successPage = () => {
    return (
      <>
        <div className="text-center">
          <h1 className="h4 text-gray-900 mb-4">Success</h1>
        </div>
        <p>
          Thank you.
        </p>
        <p>
          Your smartcard has been registered. Using your smartcard on public transport will now add points and carbon savings to your account.
        </p>
        <br/>
      </>
    );
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    { success ? successPage() : form() }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RegistrationPageProps {
  api: AxiosInstance
}
