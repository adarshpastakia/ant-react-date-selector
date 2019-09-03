import React, { RefObject, useEffect, useState } from "react";
import { InputProps } from "antd/es/input";
import { DateValue } from "..";
import { Popover, Tabs } from "antd";
import { RdsPresets } from "./RdsPresets";
import { RdsAbsolute } from "./RdsAbsolute";
import { isDateLike } from "../utils/Predicates";
import { DateParts } from "../utils/DateParts";
import { RdsRelative } from "./RdsRelative";

interface RdsInputProps extends InputProps {
  dir?: "ltr" | "rtl";
  outerRef: RefObject<Popover>;
  value: DateValue;
  onDateChange: (v: DateValue) => void;
}

export const RdsDropdown: React.FC<RdsInputProps> = ({ value, onDateChange, dir, outerRef }) => {
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
    outerRef.current && outerRef.current.forceUpdate();
  }, [value]);

  const tabChanged = (t: string) => {
    setActiveTab(t);
    outerRef.current && outerRef.current.forceUpdate();
  };

  return (
    <Tabs
      className={["ards-dropdown--overlay", dir].join(" ")}
      activeKey={activeTab}
      onChange={tabChanged}
    >
      <Tabs.TabPane key="quick" tab="Quick Select">
        <RdsPresets value={value} onDateChange={onDateChange} dir={dir} />
      </Tabs.TabPane>
      <Tabs.TabPane key="relative" tab="Relative">
        <RdsRelative value={value} onDateChange={onDateChange} dir={dir} />
      </Tabs.TabPane>
      <Tabs.TabPane key="absolute" tab="Absolute">
        <RdsAbsolute value={value} onDateChange={onDateChange} dir={dir} />
      </Tabs.TabPane>
    </Tabs>
  );
};
