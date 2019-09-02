import React, { useEffect, useState } from "react";
import { Button, Divider, Input } from "antd";
import { DateUtil, DateValue } from "..";
import { RdsRelativeInput } from "./RdsRelativeInput";
import { DateParts } from "../utils/DateParts";

const Presets: { [key: string]: string } = {
  dayThis: "$day",
  weekThis: "$week",
  monthThis: "$month",
  quarterThis: "$quarter",
  yearThis: "$year",
  dayLast: "$day-1",
  weekLast: "$week-1",
  monthLast: "$month-1",
  quarterLast: "$quarter-1",
  yearLast: "$year-1"
};

export const RdsPresets: React.FC<{
  value: DateValue;
  onDateChange: (value: DateValue) => void;
}> = ({ value, onDateChange }) => {
  const selectPreset = (preset: any) => {
    onDateChange(`${preset}|${preset}`);
  };

  const selectRelative = () => {
    if (relDate) {
      onDateChange(
        relDate.includes("+") ? `${DateParts.NOW}|${relDate}` : `${relDate}|${DateParts.NOW}`
      );
    }
  };

  const [relDate, setRelDate] = useState<DateValue>(undefined);
  useEffect(() => {
    const [start, end] = value ? value.split("|") : [undefined, undefined];
    setRelDate(end === DateParts.NOW ? start : start === DateParts.NOW ? end : undefined);
  }, [value]);

  return (
    <div style={{ padding: 16 }}>
      <div className="ards-label--section">Quick Select</div>
      <Input.Group compact>
        <RdsRelativeInput value={relDate} onDateChange={setRelDate} />
        <Button type="primary" onClick={selectRelative} style={{ width: 80, padding: 0 }}>
          Apply
        </Button>
      </Input.Group>
      <Divider type="horizontal" />
      <div className="ards-label--section">Presets</div>
      <div>
        {Object.keys(Presets).map(key => (
          <div className="ards-quick--link" key={key}>
            <a onClick={() => selectPreset(Presets[key])}>{DateUtil.label(Presets[key])}</a>
          </div>
        ))}
      </div>
    </div>
  );
};
