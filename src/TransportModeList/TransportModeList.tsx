import React from "react";

export const TransportModeList = ({ defaultTransportMode, setDefaultTransportMode }: TransportModeListProps) => {
  const modes = [
    "Car share",
    "Large car",
    "Medium car",
    "Small car",
    "Electric car",
    "Taxi",
    "Park and ride",
    "Tram",
    "Bus",
    "Train",
    "Cycling",
    "Walk",
    "Wheeling",
    "Work from home"
  ];

  return (
    <select className="custom-select custom-select-sm form-control form-control-sm"
            name="defaultTransportMode"
            defaultValue={defaultTransportMode}
            onChange={e => setDefaultTransportMode(e.target.value)}>
      <option value="">Select green transport mode</option>
      { modes.map((m, i) => <option key={i} value={m.toLowerCase()}>{m}</option>)}
    </select>
  );
};

export interface TransportModeListProps {
  defaultTransportMode: string,
  setDefaultTransportMode: (mode: string) => any
}
