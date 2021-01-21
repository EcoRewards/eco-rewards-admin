import React, { useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import { DashboardChart } from "./DashboardChart";
import { ReportScopeSelect } from "./ReportScopeSelect";
import { DateSelector } from "./DateSelector";

export const DashboardPage = ({ api }: DashboardPageProps) => {
  const [scope, setScope] = useState("/global/0/report");
  const [names, setNames] = useState<string[]>();
  const [carbonSaving, setCarbonSaving] = useState<Record<string, number>[]>([]);
  const [rewardPoints, setRewardPoints] = useState<Record<string, number>[]>([]);
  const [distance, setDistance] = useState<Record<string, number>[]>([]);
  const [groups, setGroups] = useState([]);
  const [links, setLinks] = useState({});
  const [dates, setDates] = useState<string>("");

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
      const dateRange = dates ? "?from=" + dates.split(",").join("&to=") : "";
      const response = await api.get(scope + dateRange);

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
  }, [api, names, scope, dates]);

  const onScopeChange = (scope: string) => {
    setScope(scope ? scope + "/report" : "/global/0/report");
    setNames(undefined);
  };

  const onDateChange = (dates: string) => {
    setDates(dates);
    setNames(undefined);
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Dashboard</h1>
      <div className="row">
        <div className="col-9">
          <ReportScopeSelect groups={groups} links={links} onChange={onScopeChange}/>
        </div>
        <div className="col-3">
          <DateSelector onChange={onDateChange}/>
        </div>
      </div>
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
