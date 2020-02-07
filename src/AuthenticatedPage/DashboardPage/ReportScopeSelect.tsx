import { GroupJsonView, OrganisationJsonView, SchemeJsonView } from "eco-rewards-hub";
import React, { Dispatch, useState } from "react";

export const ReportScopeSelect = ({ groups, links, onChange }: ReportScopeSelectProps) => {
  const [scheme, setScheme] = useState("");

  const schemes: SchemeJsonView[] = Object
    .keys(links)
    .filter(k => k.startsWith("/scheme/") && k !== "/scheme/1")
    .map(k => links[k]);

  const organisations: OrganisationJsonView[] = Object
    .keys(links)
    .filter(k => k.startsWith("/organisation/") && links[k].scheme === scheme)
    .map(k => links[k]);

  const bubbleChange = (setter: Dispatch<string>, value: string) => {
    setter(value);
    onChange(value);
  };

  return (
    <div className="group-select">
      <select className="col-3 custom-select form-control form-control-sm mr-3" name="scheme" onChange={e => bubbleChange(setScheme, e.target.value)}>
        <option value="">All schemes</option>
        { schemes.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
      <select disabled={organisations.length === 0} className="col-3 custom-select form-control form-control-sm" name="organisation" onChange={e => onChange(e.target.value || scheme)}>
        <option value="">All organisations</option>
        { organisations.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
      </select>
    </div>
  );
};

export interface ReportScopeSelectProps {
  groups: GroupJsonView[],
  links: Record<string, any>,
  onChange: (selected: string) => any
}
