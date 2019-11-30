import React from "react";
import { AxiosInstance } from "axios";
import { SchemeJsonView } from "eco-rewards-hub";
import { toSchemeId } from "eco-rewards-hub/dist/src/scheme/Scheme";

export const SchemeRow = ({ api, scheme }: SchemeRowProps) => {
  return (
    <tr>
      <td>{toSchemeId(scheme.id!)}</td>
      <td>{scheme.name}</td>
      <td>
        <button className="btn btn-primary btn-user">
          Edit
        </button>
      </td>
    </tr>
  );
};

interface SchemeRowProps {
  api: AxiosInstance,
  scheme: SchemeJsonView
}
