import { GroupJsonView, OrganisationJsonView, SchemeJsonView } from "eco-rewards-hub";
import React, { useState } from "react";
import "./GroupSelect.css";

export const GroupSelect = ({ groups, links, group, setGroup }: GroupSelectProps) => {
  const [scheme, setScheme] = useState("");
  const [organisation, setOrganisation] = useState("");

  const schemes: SchemeJsonView[] = Object
    .keys(links)
    .filter(k => k.startsWith("/scheme/") && k !== "/scheme/1")
    .map(k => links[k]);

  const organisations: OrganisationJsonView[] = Object
    .keys(links)
    .filter(k => k.startsWith("/organisation/") && links[k].scheme === scheme)
    .map(k => links[k]);

  const selectableGroups: GroupJsonView[] = groups.filter(g => g.organisation === organisation);

  return (
    <div className="group-select">
      <select className="custom-select form-control form-control-sm" name="scheme" onChange={e => setScheme(e.target.value)}>
        <option value="">&lt;Select scheme&gt;</option>
        { schemes.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
      <select disabled={organisations.length === 0} className="custom-select form-control form-control-sm" name="organisation" onChange={e => setOrganisation(e.target.value)}>
        <option value="">&lt;Select organisation&gt;</option>
        { organisations.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
      </select>
      <select disabled={selectableGroups.length === 0} className="custom-select form-control form-control-sm" name="group" onChange={e => setGroup(e.target.value)}>
        <option value="">&lt;Select group&gt;</option>
        { selectableGroups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
      </select>
    </div>
  );
};

export interface GroupSelectProps {
  groups: GroupJsonView[],
  links: Record<string, any>,
  group: string,
  setGroup: (group: string) => any
}
