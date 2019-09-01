import React, { useEffect, useState } from "react";
import { Input, InputNumber, Select } from "antd";
import { DateUtil, DateValue } from "..";

export const RdsRelativeInput: React.FC<{
  value: DateValue;
  onDateChange: (value: DateValue) => void;
}> = ({ value, onDateChange }) => {
  const [prefix, setPrefix] = useState();
  const [duration, setDuration] = useState();
  const [period, setPeriod] = useState();

  const refPrefix = React.createRef<Select>();
  const refDuration = React.createRef<InputNumber>();
  const refPeriod = React.createRef<Select>();

  useEffect(() => {
    if (!(!period && !duration && !prefix)) {
      if (!duration) {
        setDuration(1);
      } else if (!period) {
        setPeriod("$hour");
      } else if (!prefix) {
        setPrefix("last");
      } else {
        onDateChange(`${period}${prefix === "last" ? "-" : "+"}${duration}`);
      }
    }
  }, [period, duration, prefix]);

  useEffect(() => {
    const parts = DateUtil.parts(value);
    if (parts && parts.diff) {
      const { part, diff } = parts;
      const duration = parseInt(diff, 10);
      setPeriod(part);
      setPrefix(duration < 0 ? "last" : "next");
      setDuration(Math.abs(duration));
    }
  }, [value]);

  return (
    <>
      <Select onChange={e => setPrefix(e)} value={prefix} ref={refPrefix} style={{ width: 120 }}>
        <Select.Option value="last">Last</Select.Option>
        <Select.Option value="next">Next</Select.Option>
      </Select>
      <InputNumber
        min={1}
        onChange={setDuration}
        value={duration}
        ref={refDuration}
        style={{ width: 80 }}
      />
      <Select onChange={e => setPeriod(e)} value={period} ref={refPeriod} style={{ width: 120 }}>
        <Select.Option value="$minute">Minute</Select.Option>
        <Select.Option value="$hour">Hour</Select.Option>
        <Select.Option value="$day">Day</Select.Option>
        <Select.Option value="$week">Week</Select.Option>
        <Select.Option value="$month">Month</Select.Option>
        <Select.Option value="$quarter">Quarter</Select.Option>
        <Select.Option value="$year">Year</Select.Option>
      </Select>
    </>
  );
};
