import React from "react";
import { DateUtil } from "../lib";

const tests = [
  "$now",
  "$day+1",
  "$minute-45",
  "$hour+3",
  "$month-1",
  "$day-1|$now",
  "$week|$week",
  "$decade|$month",
  "$decade-1|$decade",
  "2019-01-01T00:00:00.000Z",
  "2019-01-01T00:00:00.000Z|2019-01-31T00:00:00.000Z"
];

export const Examples = () => (
  <>
    <div className="x-section">Examples</div>
    <table className="x-table">
      <thead>
        <tr>
          <th>Query</th>
          <th>Display</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {tests.map((d, i) => (
          <tr key={i}>
            <td>{d}</td>
            <td>{DateUtil.label(d)!.toString()}</td>
            <td>{DateUtil.parse(d)!.toString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);
