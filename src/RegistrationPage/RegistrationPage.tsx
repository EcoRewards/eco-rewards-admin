import React, { FormEvent, useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import { TransportModeList } from "../TransportModeList/TransportModeList";
import "./RegistrationPage.css";
import { GroupSelect } from "./GroupSelect/GroupSelect";

export const RegistrationPage = ({ api }: RegistrationPageProps) => {
  const [success, setSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [smartcard, setSmartcard] = useState("");
  const [defaultTransportMode, setDefaultTransportMode] = useState("");
  const [defaultDistance, setDefaultDistance] = useState(1.0);
  const [group, setGroup] = useState("");
  const [groups, setGroups] = useState([]);
  const [links, setLinks] = useState({});

  useEffect(() => {
    async function fetchGroups() {
      const response = await api.get("/groups");

      setGroups(response.data.data);
      setLinks(response.data.links);
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

  const smartcardNumberValid = smartcard.length === 16 || smartcard.length === 18;
  const canSubmit = smartcardNumberValid && defaultTransportMode !== "" && defaultDistance > 0 && group !== "";
  const form = () => {
    return (
      <>
        <div className="text-center">
          <h1 className="h4 text-gray-900 mb-4">Register</h1>
        </div>
        <form className="user">
          <div className="form-group">
            <input type="text" className="form-control form-control-user" id="exampleInputSmartcard"
                   pattern="^[0-9]*$"
                   minLength={16}
                   maxLength={18}
                   aria-describedby="smartcardHelp" placeholder="Enter Smartcard number" required
                   onChange={e => setSmartcard(e.target.value)}
            />
          </div>
          <div className="form-group">
            <TransportModeList defaultTransportMode={defaultTransportMode} setDefaultTransportMode={setDefaultTransportMode} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control form-control-user" id="exampleInputDistance"
                   aria-describedby="distanceHelp" placeholder="Enter normal distance in miles" required
                   onChange={e => setDefaultDistance(+e.target.value)}
            />
          </div>
          <div className="form-group">
            <GroupSelect group={group} setGroup={setGroup} groups={groups} links={links} />
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
          <h1 className="h4 text-gray-900 mb-4">SUCCESS - Your card has been registered!</h1>
        </div>
        <p>
          Thank you.
        </p>
        <p>
          Using your smartcard to report green travel choices will now add points and carbon savings to your account. For more information and to access Eco Rewards, go to <a href="ecorewards.org.uk and">ecorewards.org.uk</a> create your personal account.
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
