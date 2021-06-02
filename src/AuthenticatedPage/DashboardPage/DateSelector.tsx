import React from "react";
import { LocalDate } from "@js-joda/core";

export const DateSelector = ({ onChange }: DateSelectorProps) => {
  const today = LocalDate.now();
  const dates: Record<string, [LocalDate, LocalDate]> = {
    "Last 7 days": [today.minusDays(7), today],
    "Last 14 days": [today.minusDays(14), today],
    "Last 30 days": [today.minusDays(30), today],
    "This month": [today.withDayOfMonth(1), today]
  };

  for (let i = 1; i <= 6; i++) {
    const month = today.minusMonths(i);
    dates[month.month().name()] = [month.withDayOfMonth(1), month.plusMonths(1).withDayOfMonth(1).minusDays(1)]
  }

  return (
    <select className="custom-select form-control form-control-sm" onChange={e => onChange(e.target.value)}>
      { Object.entries(dates).map(([month, [from, to]]) => <option key={month} value={from.toJSON() + "," + to.toJSON()}>{ month.charAt(0) + month.slice(1).toLowerCase() }</option>)}
    </select>
  );
};

export interface DateSelectorProps {
  onChange: (dates: string) => any
}
