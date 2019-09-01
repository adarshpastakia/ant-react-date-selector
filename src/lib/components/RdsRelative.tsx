import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { DateUtil, DateValue } from "..";
import { stylesheet } from "typestyle";
import { RdsRelativeInput } from "./RdsRelativeInput";
import moment from "moment";

const css = stylesheet({
  label: {
    fontWeight: 500,
    fontSize: ".8em",
    fontVariant: "small-caps"
  },
  error: {
    margin: "8px 0",
    color: "red",
    opacity: 0.5,
    padding: "8px 0 0"
  },
  toolbar: {
    padding: "8px 16px",
    textAlign: "right"
  }
});

export const RdsRelative: React.FC<{
  value: DateValue;
  onDateChange: (value: DateValue) => void;
}> = ({ value, onDateChange }) => {
  const [isErrored, setErrored] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  useEffect(() => {
    const [start, end] = value ? value.split("|") : ["", ""];
    setStart(start);
    setEnd(end);
  }, [value]);

  const onApply = () => {
    if (start && end) {
      const dtStart = DateUtil.parse(start);
      const dtEnd = DateUtil.parse(end);
      if (moment(dtStart!.toString()).isAfter(moment(dtEnd!.toString()))) {
        setErrored(true);
      } else {
        onDateChange(`${start}|${end}`);
      }
    }
  };

  return (
    <div>
      <div style={{ padding: 16 }}>
        <div className={css.label}>From</div>
        <Input.Group compact>
          <RdsRelativeInput value={start} onDateChange={setStart} />
        </Input.Group>
        <br />
        <div className={css.label}>To</div>
        <Input.Group compact>
          <RdsRelativeInput value={end} onDateChange={setEnd} />
        </Input.Group>
        {isErrored && <div className={css.error}>Invalid date ranges</div>}
      </div>
      <div className={css.toolbar}>
        <Button type="primary" onClick={onApply} size="small">
          Apply
        </Button>
      </div>
    </div>
  );
};
