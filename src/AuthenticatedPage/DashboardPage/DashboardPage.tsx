import React, { useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import { DashboardChart } from "./DashboardChart";
import { ReportScopeSelect } from "./ReportScopeSelect";

export const DashboardPage = ({ api }: DashboardPageProps) => {
  const [scope, setScope] = useState("/global/0/report");
  const [names, setNames] = useState();
  const [carbonSaving, setCarbonSaving] = useState();
  const [rewardPoints, setRewardPoints] = useState();
  const [distance, setDistance] = useState();
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

  useEffect(() => {
    async function fetchApiData() {
      const response = await api.get(scope);

      const carbonSaving = {} as Record<string, Record<string, number>>;
      const rewardPoints = {} as Record<string, Record<string, number>>;
      const distance = {} as Record<string, Record<string, number>>;
      const newNames = {} as Record<string, true>;

      for (const row of response.data.data) {
        carbonSaving[row.date] = carbonSaving[row.date] || { date: row.date };
        carbonSaving[row.date][row.name] = row.totalCarbonSaving;
        distance[row.date] = distance[row.date] || { date: row.date };
        distance[row.date][row.name] = row.totalDistance;
        rewardPoints[row.date] = rewardPoints[row.date] || { date: row.date };
        rewardPoints[row.date][row.name] = row.totalRewardsEarned;
        newNames[row.name] = true;
      }

      setNames(Object.keys(newNames));
      setCarbonSaving(Object.values(carbonSaving));
      setDistance(Object.values(distance));
      setRewardPoints(Object.values(rewardPoints));
    }

    if (!names) {
      fetchApiData();
    }
  }, [api, names, scope]);

  const onScopeChange = (scope: string) => {
    setScope(scope ? scope + "/report" : "/global/0/report");
    setNames(null);
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Dashboard</h1>
      <ReportScopeSelect groups={groups} links={links} onChange={onScopeChange}/>
      { !names
        ? <p>Loading</p>
        : <>
            <DashboardChart key="rewards" title="Rewards Earned" data={rewardPoints} names={names}/>
            <DashboardChart key="carbon" title="Carbon Saving" data={carbonSaving} names={names}/>
            <DashboardChart key="distance" title="Distance" data={distance} names={names}/>
          </>
      }
    </div>
  );
};

export interface DashboardPageProps {
  api: AxiosInstance
}

interface ReportRow {
  date: string,
  name: string,
  totalCarbonSaving: number,
  totalDistance: number,
  totalRewardsEarned: number
}
