import React, { useEffect, useState } from "react";
import { Button, Divider, Input, Select } from "antd";
import { DateUtil, DateValue } from "..";
import { stylesheet } from "typestyle";
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

const css = stylesheet({
  label: {
    fontWeight: 500,
    fontSize: ".8em",
    fontVariant: "small-caps"
  }
});

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
      <div className={css.label}>Quick Select</div>
      <Input.Group compact>
        <RdsRelativeInput value={relDate} onDateChange={setRelDate} />
        <Button type="primary" onClick={selectRelative} style={{ width: 80, padding: 0 }}>
          Apply
        </Button>
      </Input.Group>
      <Divider type="horizontal" />
      <div className={css.label}>Presets</div>
      <div>
        {Object.keys(Presets).map(key => (
          <div style={{ width: 120, display: "inline-block", fontSize: ".8em" }} key={key}>
            <a onClick={() => selectPreset(Presets[key])}>{DateUtil.label(Presets[key])}</a>
          </div>
        ))}
      </div>
    </div>
  );
};
