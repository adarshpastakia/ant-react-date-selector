import React, { useEffect, useState } from "react";
import { InputProps } from "antd/es/input";
import { DateValue } from "..";
import { Tabs } from "antd";
import { stylesheet } from "typestyle";
import { RdsPresets } from "./RdsPresets";
import { RdsAbsolute } from "./RdsAbsolute";
import { isDateLike } from "../utils/Predicates";
import { DateParts } from "../utils/DateParts";
import { RdsRelative } from "./RdsRelative";

interface RdsInputProps extends InputProps {
  value: DateValue;
  onDateChange: (v: DateValue) => void;
}

const css = stylesheet({
  overlay: {
    width: 550,
    minHeight: 200,
    $nest: {
      "& .ant-tabs-bar": {
        margin: 0
      }
    }
  }
});

export const RdsDropdown: React.FC<RdsInputProps> = ({ value, onDateChange }) => {
  const [activeTab, setActiveTab] = useState("quick");

  useEffect(() => {
    const [start, end] = value ? value.split("|") : ["", ""];
    if (isDateLike(start)) {
      setActiveTab("absolute");
    } else if (start !== DateParts.NOW && end !== DateParts.NOW && start !== end) {
      setActiveTab("relative");
    } else {
      setActiveTab("quick");
    }
  }, [value]);

  return (
    <Tabs className={css.overlay} activeKey={activeTab} onChange={setActiveTab}>
      <Tabs.TabPane key="quick" tab="Quick Select">
        <RdsPresets value={value} onDateChange={onDateChange} />
      </Tabs.TabPane>
      <Tabs.TabPane key="relative" tab="Relative">
        <RdsRelative value={value} onDateChange={onDateChange} />
      </Tabs.TabPane>
      <Tabs.TabPane key="absolute" tab="Absolute">
        <RdsAbsolute value={value} onDateChange={onDateChange} />
      </Tabs.TabPane>
    </Tabs>
  );
};
